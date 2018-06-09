#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <vector>
#include <cmath>

class rating_contract : public eosio::contract {
    public:
        rating_contract(account_name self):eosio::contract(self), ratings(_self, _self), lfsr(_self, _self) {}

        void dummy() { getNormalDistributedNumbers(100); };

        // @abi action
        void init(uint32_t lfsr_state);

        // @abi action
        void sum(std::vector<uint64_t> numbers);

        // @abi action
        void calculate(uint64_t hubstaff_id, std::vector<uint64_t> activities);

        // @abi action
        void erase(uint64_t hubstaff_id);

    private:
        double calculate_rating(const std::vector<double>& y);
        std::vector<double> getNormalDistributedNumbers(size_t count);

        // @abi table lfsr i64
        struct lfsr_record {
            uint64_t id;
            uint32_t state;

            uint64_t primary_key() const { return id; }

            EOSLIB_SERIALIZE(struct lfsr_record, (id)(state))
        };

        typedef eosio::multi_index<N(lfsr), lfsr_record> lfsr_table;
        lfsr_table lfsr;

        // @abi table ratings i64
        struct rating {
            uint64_t hubstaff_id;
            uint64_t rating;
            uint64_t updated_at;

            uint64_t primary_key() const { return hubstaff_id; }

            EOSLIB_SERIALIZE(struct rating, (hubstaff_id)(rating)(updated_at))
        };

        typedef eosio::multi_index<N(ratings), rating> rating_table;
        rating_table ratings;
};

void rating_contract::sum(std::vector<uint64_t> numbers)
{
    double sum = 0;
    for (auto n: numbers) {
        sum += n;
    }
    eosio::print(sum);
}

void rating_contract::init(uint32_t lfsr_state)
{
    eosio::require_auth(_self);

    auto reg = lfsr.find(0);

    if (reg == lfsr.end()) {
        lfsr.emplace(_self, [&](auto& reg_new) {
            reg_new.id    = 0;
            reg_new.state = lfsr_state;
        });
    } else {
        lfsr.modify(reg, _self, [&](auto& reg_mod) {
            reg_mod.id    = 0;
            reg_mod.state = lfsr_state;
        });
    }
}

double calc_sum(const std::vector<double>& a)
{
    double sum = 0;
    for (auto x: a) {
        sum += x;
    }
    return sum;
}

double calc_mean(const std::vector<double>& a)
{
    double sum = 0;
    for (auto x: a) {
        sum += x;
    }
    return sum / a.size();
}

inline double sqr(double a)
{
    return a * a;
}

double calc_var(const std::vector<double>& a, double mean)
{
    double sum = 0;
    for (auto y: a) {
        sum += sqr(y - mean);
    }
    return sum / a.size();
}

double rating_contract::calculate_rating(const std::vector<double>& y)
{
    double my = calc_mean(y);
    double vary = calc_var(y, my);
    eosio_assert(vary != 0, "");

    std::vector<double> z = getNormalDistributedNumbers(y.size());

    std::vector<double> k(z);
    for (size_t i = 0; i < k.size(); i++) {
        k[i] = my + std::sqrt(vary) * z[i];
    }

    double mk = calc_mean(k);
    double vark = calc_var(k, mk);
    eosio_assert(vark != 0, "Math error");

    // Можно оптимизировать
    std::vector<double> a(z);
    for (size_t i = 0; i < a.size(); i++) {
        a[i] = y[i] * k[i];
    }

    double ma = calc_mean(a);
    double vara = calc_var(a, ma);
    eosio_assert(vara != 0, "Math error");

    double corr = 0;
    for (size_t i = 0; i < a.size(); i++) {
        corr += (k[i] - ma) * (a[i] - ma);
    }

    corr /= a.size() * std::sqrt(vark) * std::sqrt(vara);

    // return std::abs(corr);
    return std::abs(corr) * (calc_sum(y) / (600 * y.size()));
}

uint64_t iround(double x) {
    return static_cast<uint64_t>(std::round(x));
}

void rating_contract::calculate(
                                uint64_t hubstaff_id,
                                std::vector<uint64_t> activities
) {
    eosio::require_auth(_self);

    eosio_assert(lfsr.find(0) != lfsr.end(), "Contract is not initialized");
    eosio_assert(activities.size() > 0, "Activities count must be more than zero");

    std::vector<double> y(activities.size());
    for (size_t i = 0; i < activities.size(); i++) {
        y[i] = static_cast<double>(activities[i]);
    }

    auto now = current_time();
    double score = iround(calculate_rating(y) * 100);

    auto rating = ratings.find(hubstaff_id);

    if (rating == ratings.end()) {
        ratings.emplace(_self, [&](auto& rating) {
            rating.hubstaff_id = hubstaff_id;
            rating.rating      = score;
            rating.updated_at  = now;
        });
    } else {
        ratings.modify(rating, _self, [&](auto& rating) {
            rating.rating      = score;
            rating.updated_at  = now;
        });
    }
}

void rating_contract::erase(uint64_t hubstaff_id)
{
    eosio::require_auth(_self);
    auto rating = ratings.find(hubstaff_id);
    eosio_assert(rating != ratings.end(), "Rating for this user does not exist");
    ratings.erase(rating);
}

inline double erfc(double x)
{
    double z = std::abs(x);
    double t = 1 / (1 + z / 2.0);
    double r = t * std::exp(-z * z - 1.26551223 + t * (1.00002368 +
                t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
                t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
                t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? r : 2 - r;
};

inline double ierfc(double x)
{
    if (x >= 2) { return -100; }
    if (x <= 0) { return 100; }

    double xx = (x < 1) ? x : 2 - x;
    double t = std::sqrt(-2 * std::log(xx / 2));

    double r = -0.70711 * ((2.30753 + t * 0.27061) /
                (1 + t * (0.99229 + t * 0.04481)) - t);

    for (size_t j = 0; j < 2; j++) {
        double err = erfc(r) - xx;
        r += err / (1.12837916709551257 * std::exp(-(r * r)) - r * err);
    }

    return (x < 1) ? r : -r;
};

inline double generateNormalNumber(uint32_t y)
{
    double x = y / 4294967295.0;
    return -std::sqrt(2) * ierfc(2 * x);
}

std::vector<double> rating_contract::getNormalDistributedNumbers(size_t count)
{
    std::vector<double> numbers(count);

    auto lfsr_record = lfsr.get(0);
    uint32_t state = lfsr_record.state;

    for (size_t i = 0; i < count; i++) {
        uint32_t bit = ((state >> 0) ^ (state >> 17) ^ (state >> 23) ^ (state >> 25)
                        ^ (state >> 28) ^ (state >> 29)) & 1;
        state = (state >> 1) | (bit << 31);

        numbers[i] = state;

        // eosio::print(generateNormalNumber(state), ",");
    }
    

    lfsr.modify(lfsr_record, _self, [&](auto& reg_new) {
        reg_new.state = state;
    });

    return numbers;
}

EOSIO_ABI( rating_contract, (dummy)(init)(sum)(calculate)(erase) )