import React, { Component } from 'react';
import Navbar from "../components/partials/Navbar";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import {editCustomer} from "../requests/authRequests";
import {authenticationService} from "../_services";
import {Link} from "react-router-dom";
import {message} from "antd";
import SelectAvatarModal from "../components/partials/SelectAvatarModal";
import {sectionBG} from "../config/jqueryCode";
import sectionBgImage from "../images/section.jpg";

class Profile extends Component {

    state = {
        ogAvatar: "",
        ogUsername: "",
        username: "",
        avatar: "",
        isSaved: false,
        avatarModelVisible: false,
        counter: 0
    }

    componentWillMount() {
        sectionBG();

        const currentUser = authenticationService.currentUserValue

        if (!currentUser) {
            return;
        }
        
        const currentUserItem = currentUser.customerItem;

        const {username, avatar} = currentUserItem;

        this.setState({
            ogAvatar: avatar,
            ogUsername: username,
            username,
            avatar
        })
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value,
            counter: this.state.counter + 1
        }, () => {
            if (this.state.counter === 1) {
                return message.info("Remember to save your changes");
            }
        })
    }

    changeModalVisible = () => {
        this.setState({
            avatarModelVisible: !this.state.avatarModelVisible
        })
    }

    onSave = async () => {
        try {
            const {username, avatar} = this.state;
            const currentUser = authenticationService.currentUserValue
            const currentUserItem = currentUser.customerItem;
            const {email, validated} = currentUserItem;
            const data = await editCustomer({
                email,
                username,
                avatar,
                validated
            });
        } catch (error) {
            
        }
    }

    render() {
        const {onChange, onSave, changeModalVisible} = this;
        const {username, avatar, avatarModelVisible} = this.state;

        const currentUser = authenticationService.currentUserValue

        if (!currentUser) {
            return;
        }
        
        const currentUserItem = currentUser.customerItem;
        const {email} = currentUserItem;

        return (
            <motion.div
                style={pageStyle}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                <>
                    <Helmet>
                        <title>{`Let's Flix | Profile`}</title>
                        <meta name="description" content="Helmet application" />
                    </Helmet>

                    <Navbar/>

                    <SelectAvatarModal visible={avatarModelVisible} changeModalVisible={changeModalVisible} onChange={onChange}/>

                    <section className="profile-page section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="profile__avatar col-lg-4 col-md-4" onClick={changeModalVisible}>
                                    <div className="profile-avatar__image">
                                        <img src={avatar} alt="Avatar" className="img-fluid"/>

                                        <div className="profile__avatar--hover">
                                            <i class="fas fa-pen"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile__info col-lg-8 col-md-8">
                                    <div className="profile-info__item ">
                                        <h5>Username:</h5>
                                        <input className="form__input" name="username" id="username" value={username} onChange={(e) => onChange("username", e.target.value)}/>
                                    </div>
                                    <div className="profile-info__item">
                                        <h5>Email:</h5>
                                        <p>{email}</p>
                                    </div>
                                    <div className="profile-info__item profile-info__item--footer">
                                        <div className="row">
                                            <Link to="/change-password" className="section__btn col-6">
                                                Change Password
                                            </Link>
                                            <button className="section__btn col-6" onClick={onSave}>
                                                Save
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="profile__footer">
                                <div className="profile-footer__item">
                                    <Link to="/logout" className="section__btn red">
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            </motion.div>
        )
    }
}

export default Profile;
