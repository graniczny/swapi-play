import React, { useEffect } from 'react';
import anime from 'animejs';
import propTypes from 'prop-types';

import Reverse from './Reverse';
import Front from './Front';

const GameCard = ({ stats, onFinishRound, killRound, onRoundKilled, left }) => {
  const cardRef = React.createRef();
  const factor = left ? 1 : -1;

  useEffect(() => {
    if (stats) {
      anime({
        targets: cardRef.current,
        translateX: (window.outerWidth / 4 - 30) * factor,
        scale: 1.2,
        rotate: factor + 'turn',
        complete: () => {
          cardRef.current.classList.add('flipped');
          setTimeout(() => {
            if (stats.win === 'draw') {
              anime({
                targets: cardRef.current,
                scale: 0.7,
                translateX: window.outerWidth / 5 * factor,
                complete: () => {
                  onFinishRound();
                }
              })
            } else if (stats.win) {
              anime({
                targets: cardRef.current,
                translateX: (window.outerWidth / 4 + 180) * factor,
                begin: () => {
                  cardRef.current.classList.add('winner');
                },
                complete: () => {
                  onFinishRound();
                }
              })
            } else {
              anime({
                targets: cardRef.current,
                scale: 0.7,
                translateX: window.outerWidth / 5 * factor,
                complete: () => {
                  onFinishRound();
                }
              })
            }
          }, 800)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (killRound) {
      if (stats.win === 'draw') {
        anime({
          targets: cardRef.current,
          translateX: window.outerWidth / 4 * factor * -1,
          complete: () => {
            onRoundKilled();
          }
        })
      } else if (stats.win) {
        anime({
          targets: cardRef.current,
          translateY: window.outerHeight * -1,
          translateX: window.outerWidth / 6 * factor,
          duration: 1000,
          complete: () => {
            onRoundKilled();
          }
        })
      } else {
        anime({
          targets: cardRef.current,
          translateY: window.outerHeight,
          duration: 1000,
          complete: () => {
            onRoundKilled();
          }
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [killRound])

  return (
    <div
      className="gamecard"
      ref={cardRef}
    >
      {!stats ?
        <Reverse /> :
        <div className="flip-card">
          <div className="flip-front">
            <Reverse />
          </div>
          <div className="flip-back">
            <Front
              stats={stats}
            />
          </div>
        </div>
      }
    </div>
  )
}

GameCard.propTypes = {
  stats: propTypes.object,
  onFinishRound: propTypes.func,
  killRound: propTypes.bool,
  onRoundKilled: propTypes.func,
  left: propTypes.bool,
}

export default GameCard;