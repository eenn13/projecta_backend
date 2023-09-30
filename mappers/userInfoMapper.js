const mapper = (userInfo) => {
    return {
        id : userInfo.id,
        username: userInfo.username,
        email: userInfo.email,
        balance: userInfo.balance,
        updatedAt: userInfo.updatedAt,
        createdAt: userInfo.createdAt,
    }
};

module.exports = mapper;