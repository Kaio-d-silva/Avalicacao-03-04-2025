const contenType = (req, res, next) => {
    res.type('json');
    next();
};

module.exports = contenType;