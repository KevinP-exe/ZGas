const logoutController = {};

logoutController.logout = async(req, res)=> {
    res.clearCookie("authToken")

    return res.json({message: "Sesion cerrada"})
}

export default logoutController;