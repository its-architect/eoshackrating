#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <vector>
#include <cmath>

class rating_contract : public eosio::contract {
    public:
        rating_contract(account_name self):eosio::contract(self), ratings(_self, _self) {}

        void dummy() {};

        // @abi action
        void sum(std::vector<uint64_t> numbers);

        // @abi action
        void calculate(uint64_t hubstaff_id, std::vector<uint64_t> activities, std::vector<int64_t> randoms);

        // @abi action
        void erase(uint64_t hubstaff_id);

    private:
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

double calc_sum(std::vector<double> a)
{
    double sum = 0;
    for (auto x: a) {
        sum += x;
    }
    return sum;
}

double calc_mean(std::vector<double> a)
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

double calc_var(std::vector<double> a, double mean)
{
    double sum = 0;
    for (auto y: a) {
        sum += sqr(y - mean);
    }
    return sum / a.size();
}

double calculate_rating(std::vector<double> y, std::vector<double> z)
{
    double my = calc_mean(y);
    double vary = calc_var(y, my);
    eosio_assert(vary != 0, "");

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

    return std::abs(corr) * (calc_sum(y) / (600 * y.size()));
}

uint64_t iround(double x) {
    return static_cast<uint64_t>(std::round(x));
}

void rating_contract::calculate(
                                uint64_t hubstaff_id,
                                std::vector<uint64_t> activities,
                                std::vector<int64_t>  randoms
) {
    eosio::require_auth(_self);

    auto rating = ratings.find(hubstaff_id);

    eosio_assert(activities.size() > 0, "Activities count must be more than zero");
    eosio_assert(activities.size() == randoms.size(), "Randoms count must be equal to activities count");

    std::vector<double> y(activities.size());
    std::vector<double> z(randoms.size());
    for (size_t i = 0; i < activities.size(); i++) {
        y[i] = static_cast<double>(activities[i]);
        z[i] = static_cast<double>(randoms[i]) / 10000;
    }

    auto now = current_time();
    double score = iround(calculate_rating(y, z) * 100);

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

EOSIO_ABI( rating_contract, (dummy)(sum)(calculate)(erase) )