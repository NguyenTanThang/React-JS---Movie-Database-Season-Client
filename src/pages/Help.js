import React, { Component } from 'react';
import PageTitle from "../components/partials/PageTitle";
import Navbar from "../components/partials/Navbar";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

const helpBreadcumbs = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/help",
        text: "Help"
    }
]

export default class Help extends Component {
    render() {
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
                    <title>{`Let's Flix | Help`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div>
                <PageTitle title="Help" breadcumbs={helpBreadcumbs}/>

	<section className="section">
    <div className="container">
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="faq">
                    <h3 className="faq__title">Why is a Video is not loading?</h3>
                    <p className="faq__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                    <p className="faq__text">Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">Why {"isn't"} there a HD version of this video?</h3>
                    <p className="faq__text">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">Why is the sound distorted?</h3>
                    <p className="faq__text">Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">Why is the Video stuttering, buffering or randomly stopping?</h3>
                    <p className="faq__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which {"don't"} look even slightly believable.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">When I change the quality of a video, nothing happens.</h3>
                    <p className="faq__text">If you are going to use a passage of Lorem Ipsum, you need to be sure there {"isn't"} anything embarrassing hidden in the middle of text.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">Terms of Use</h3>
                    <p className="faq__text">Morbi congue risus turpis, quis sollicitudin nibh lobortis rutrum. Nulla egestas semper lorem et varius. Nullam id condimentum lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse porttitor ante in erat tristique, ut blandit elit gravida.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">Privacy Policy</h3>
                    <p className="faq__text">Vestibulum tempus quam est. In id aliquam ex, at facilisis eros. Morbi ut laoreet sapien. Etiam at sem et nisl vehicula malesuada vulputate rhoncus sapien. Phasellus et odio vel risus mattis pharetra. Vestibulum tempus sed quam eget eleifend. Vivamus facilisis nunc ut felis faucibus, sed auctor diam fermentum. Fusce at hendrerit libero. Donec bibendum arcu dui, non molestie dui laoreet sollicitudin. Donec tincidunt erat lacinia libero porttitor, at malesuada nunc pretium.</p>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="faq">
                    <h3 className="faq__title">Why {"isn't"} the video starting at the beginning?</h3>
                    <p className="faq__text">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">How do I make the Video go Fullscreen?</h3>
                    <p className="faq__text">It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">What Browsers are supported?</h3>
                    <p className="faq__text">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">How do you handle my privacy?</h3>
                    <p className="faq__text">Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">How can I contact you?</h3>
                    <p class="faq__text">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">Security</h3>
                    <p className="faq__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu auctor massa. Duis at dolor non ante cursus pellentesque vitae ullamcorper orci. Nam augue lorem, suscipit nec suscipit at, cursus aliquet arcu. Proin ornare faucibus dapibus. Nunc porta porttitor metus, nec lobortis lectus porttitor a. Aenean mollis malesuada porta.</p>
                </div>

                <div className="faq">
                    <h3 className="faq__title">Lorem Ipsum</h3>
                    <p className="faq__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu auctor massa. Duis at dolor non ante cursus pellentesque vitae ullamcorper orci. Nam augue lorem, suscipit nec suscipit at, cursus aliquet arcu. Proin ornare faucibus dapibus. Nunc porta porttitor metus, nec lobortis lectus porttitor a. Aenean mollis malesuada porta.</p>
                </div>
            </div>
        </div>
    </div>
</section>
            </div>
            </>
            </motion.div>
        )
    }
}
