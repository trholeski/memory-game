import React from 'react';
import { Card } from '../card/index.js';
import './style.css';

const images = [
    "https://i.ytimg.com/vi/mdK6LVDI3kg/hqdefault.jpg", 
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixel.nymag.com%2Fimgs%2Fdaily%2Fvulture%2F2014%2F12%2F17%2F17-rachel-green-jewish.w700.h700.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixel.nymag.com%2Fimgs%2Ffashion%2Fdaily%2F2018%2F10%2F24%2F24-ross-friends.w700.h700.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Feverypassingcar.files.wordpress.com%2F2013%2F07%2Fjoeystoner2.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpmctvline2.files.wordpress.com%2F2017%2F05%2Ffriends-chandler-video.jpg%3Fw%3D620&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.popsugar-assets.com%2Ffiles%2Fthumbor%2FlDX13-7pZK4eUJfV4PJP36KwEAI%2Ffit-in%2F550x550%2Ffilters%3Aformat_auto-!!-%3Astrip_icc-!!-%2F2017%2F07%2F25%2F859%2Fn%2F1922398%2F1bb1be5259779df9303e84.02388163_edit_img_image_43785815_1500923262%2Fi%2FPhoebe-Buffay-Quotes-From-Friends.jpg&f=1&nofb=1",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/friends-gunther-2-1509051916.jpg?crop=1.00xw:0.667xh;0,0.0624xh&resize=480:*",
    "https://i0.wp.com/metro.co.uk/wp-content/uploads/2016/08/ad_217191589.jpg?quality=90&strip=all&zoom=1&resize=644%2C399&ssl=1",
    "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/p-Friends-Paul-Rudd.jpg",
    "https://i.pinimg.com/474x/21/60/91/216091889b8ca605625809b64c99d790--giovanni-nuest-jr.jpg",
    "https://akns-images.eonline.com/eol_images/Entire_Site/2014727/rs_560x415-140827103626-1024.Friends-Central-Perk.jl.082714.jpg?fit=inside|900:auto&output-quality=90",
    "https://vignette.wikia.nocookie.net/friends/images/5/5a/Alice_Knight.png/revision/latest?cb=20161208193916"
]

export class CardGrid extends React.Component {
    state = {
        score: 0,
        topScore: 0,
        won: false,
        lost: false,
        cardImages: images.map(imageString => ({ img: imageString, visited: false }))
    }

    constructor(props) {
        super(props);
    }

    resetGame() {
        this.setState({
            score: 0,
            won: false,
            lost: false,
            cardImages: images.map(imageString => ({ img: imageString, visited: false }))
        })
    }

    shuffleCards(image) {
        if (this.state.won || this.state.lost) {
            this.resetGame();
        }
        // get a copy of the card images array from the state
        let cardArray = this.state.cardImages;
        // find the card image you clicked on in the array
        let cardClickedIndex = cardArray.findIndex(c => c.img == image);
        // check if this card has been visited
        // if it has been visited, update users score to 0
        if (cardArray[cardClickedIndex].visited) {
            // set the card array so that all cards are reset to "not yet visited"
            cardArray = cardArray.map(c => ({
                img: c.img,
                visited: false
            }));
            // reset score to 0
            this.setState({
                score: 0
            });
        }
        else {
            cardArray[cardClickedIndex].visited = true;
            this.setState((prevState) => ({ 
                score: prevState.score + 1
            }));
        }

        this.setState((prevState) => ({
            topScore: prevState.topScore < prevState.score ? prevState.topScore + 1 : prevState.topScore
        }));

        const shuffledCardArray = cardArray.sort(() => Math.random() - 0.5);
        this.setState((prevState) => ({ 
            cardImages: shuffledCardArray,
            won: prevState.score == 12,
            lost: prevState.score == 0
        }));
    }

    render() {
        return (
        <>
            <div>{`Score: ${this.state.score} | Top Score: ${this.state.topScore}`}</div>
            { this.state.won && <div>Congratulations, you won! Click on any image to restart.</div> }
            { this.state.lost && <div>Wow, what a loser... Click on any image to restart.</div> }
            <div className="wrapper">
                { this.state.cardImages.map((card, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card
                                img={card.img}
                                onClick={() => this.shuffleCards(card.img)}
                            />
                        </React.Fragment>
                    )
                })}
            </div>
        </>
        );
      }
}