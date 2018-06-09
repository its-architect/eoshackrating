const eosjs = require('eosjs');

const eos = new eosjs({keyProvider: ['5JmfV1RsfUzWNxD8vwP3eD2pq38FvhXBZP32bjNv6XXXzdebXci'] });

async function main() {
    const rating = await eos.contract("rating");

    // Обновляем рейтинг
    const hubstaff_id = 10;
    const activities = [];
    const randoms = [];
    await rating.calculate({
        hubstaff_id: hubstaff_id,
        activities: activities,
        randoms: randoms
    }, {
        authorization: 'rating'
    });

    console.log("Calculated!");

    // Вытаскиваем рейтинг одного пользователя
    const data = await eos.getTableRows({json: true, code: 'rating', scope: 'rating', table: 'ratings', 'lowerBound': 0});

    console.log(data.rows[0]);
}

main().catch(e => {
    console.error("FATAL", e);
})