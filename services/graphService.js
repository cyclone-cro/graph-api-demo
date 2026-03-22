function isInactive(user) {
    const days =
        (new Date() - new Date(user.lastActivityDateTime)) / (1000 * 60 * 60 * 24);

    return days > 30;
}

function generateStats(users) {
    let active = 0;
    let inactive = 0;

    users.forEach(u => {
        if (isInactive(u)) inactive++;
        else active++;
    });

    return {
        total: users.length,
        active,
        inactive
    };
}

module.exports = { isInactive, generateStats };