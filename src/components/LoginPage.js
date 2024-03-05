function LoginPage({fn}){
    return (
        <div className="login">
            <form className="login-field" onSubmit={fn}>
                <div>
                    <input placeholder="Enter your user name" className="login_input"/>
                </div>
                <div>
                    <input placeholder="Enter your password" type="password" className="login_input"/>
                </div>
                <div className="submit_div">
                    <button type="submit" className="submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default LoginPage