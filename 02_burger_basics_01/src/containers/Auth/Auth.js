import React, { Component } from 'react'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from './Auth.module.scss'
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Mail Address"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: true,

    }

    
    inputChangedHandler = (event, controlName) => {
        // console.log("inputChangedHandler - ", controlName)
        // console.log("inputChangedHandler - ", this.state.controls[controlName])

        const updateControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            })
        })



        this.setState({ controls: updateControls })

    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.authRedirectPath !== "/")
            this.props.onSetRedirectPath()
    }

    render() {
        const formElementArray = []
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))

        if (this.props.loading) form = <Spinner />
        const errrorMsg = (!this.props.error) ? null : (<p>{this.props.error.message}</p>)


        const authRedirect = this.props.isAuthenticate ? <Redirect to={this.props.authRedirectPath} /> : null


        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errrorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">
                        SUBMIT
                    </Button>
                </form>
                <Button type="button" btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
                </Button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticate: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirecPath())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)