import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'

class About extends Component {
  state = {
    instructions: [],
    faqData: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getFAQS()
  }

  getFAQS = async () => {
    this.setState({
      isLoading: true,
    })
    const faqUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(faqUrl)
    const data = await response.json()
    console.log(data)
    const {faq} = data
    const {factoids} = data
    this.setState({
      isLoading: false,
      faqData: faq,
      instructions: factoids,
    })
  }

  render() {
    const {faqData, isLoading, instructions} = this.state
    // console.log(faqData)
    return (
      <div className="bg-about">
        <Header />
        {isLoading && (
          <div className="loader-container">
            <Loader type="Oval" color="#00BFFF" height={50} width={50} />
          </div>
        )}
        {!isLoading && (
          <div className="about-container">
            <h1 className="about-head">About</h1>
            <p className="about-last-update">Last update on March 28th 2021</p>
            <p className="about-vaccine">
              COVID-19 vaccines be read for distribution
            </p>
            <ul className="about-q-and-a">
              {faqData.map(faq => (
                <li key={faq.qno}>
                  <p className="about-question">{faq.question}</p>
                  <p className="about-answer">{faq.answer}</p>
                </li>
              ))}
            </ul>
            <h1 className="about-head">Instructions</h1>
            <ul className="about-instruction-container">
              {instructions.map(instruction => (
                <li key={instructions.id}>
                  <p className="about-instruction">{instruction.banner}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default About

/*  testid="aboutRouteLoader" for loader div */
