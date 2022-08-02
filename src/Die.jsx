import React from "react"

export default function Die(props) {
    const styles = {
      backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    function dots(count) {
      switch (count) {
          case 1:
            return <span className="dot"></span>
            break;
          case 2:
            return (
              <>
                <span className="dot"></span>
                <span className="dot"></span>
              </>
            )
            break;
          case 3:
            return (
              <>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </>
            )
            break;
          case 4:
            return (
              <>
                <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                </div>
                <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                </div>
              </>
            )
            break;
          case 5:
            return (
              <>
                <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                </div>
                
                <div className="column">
                <span className="dot"></span>
                </div>
                
                <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                </div>
              </>
            )
            break;
          case 6:
            return (
              <>
                <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                </div>
                <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                    <span className="dot"></span>
                </div>
              </>
            )
            break;

          default:
            break;
      }
    }
    function dotsClass(count) {
      let result = ''
      switch (count) {
        case 1:
          result = 'first-face'
          break;
        case 2:
          result = 'second-face'
          break;
        case 3:
          result = 'third-face'
          break;
        case 4:
          result = 'fourth-face'
          break;
        case 5:
          result = 'fifth-face'
          break;
        case 6:
          result = 'sixth-face'
          break;

        default:
          break;
      }
      return result
    }
    return (
      <div 
        className={`die-face ${dotsClass(props.value)}`}
        style={styles}
        onClick={props.holdDice}
      >
        {dots(props.value)}
      </div>
    )
}