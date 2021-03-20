import React from "react";
import "./App.css";
import logo from "./logo.svg";

const url = "https://api.mocki.io/v1/08a80028";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      activePageIndex: -1,
    };
  }

  componentDidMount() {
    fetch(url)
      .then((response) => {
        // response.status >= 200 && response.status < 300
        if (response.ok) {
          return response.json();
        } else {
          throw "Invalid data";
        }
      })
      .then((data) => {
        return data.pages;
      })
      .then((pages) => {
        this.setState({ pages: pages, activePageIndex: 0 });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ pages: [], activePageIndex: -1 });
      });
  }

  selectedPage(index) {
    this.setState({ activePageIndex: index });
  }

  render() {
    let activePage;
    const appStyle = {};
    if (
      this.state.activePageIndex >= 0 &&
      this.state.activePageIndex < this.state.pages.length
    ) {
      activePage = this.state.pages[this.state.activePageIndex];
      appStyle.backgroundImage = `url(/backgrounds/${activePage.blocks[0].background})`;
      appStyle.backgroundSize = "cover";
    }

    return (
      <div className="d-flex w-100 h-100 mx-auto flex-column" style={appStyle}>
        <header className="mb-auto">
          <nav className="navbar navbar-dark">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img src={logo} alt="logo"></img>
              </a>
              <div className="d-flex">
                <button className="btn btn-outline-light">Contact Us</button>
              </div>
            </div>
            <div className="container mt-2">
              <ul className="navbar-nav flex-column">
                {this.state.pages.map((page, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <a
                        className={
                          "nav-link p-0 " +
                          (this.state.activePageIndex === index ? "active" : "")
                        }
                        aria-current={
                          this.state.activePageIndex === index ? "page" : ""
                        }
                        href="#"
                        onClick={() => {
                          this.selectedPage(index);
                        }}
                      >
                        {page.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </header>
        <main>
          {activePage && (
            <section className="container">
              <div className="row">
                <div className="col-md">
                  <p className="headline my-2">
                    {activePage.blocks[0].headline}
                  </p>
                </div>
                <div className="col-md">
                  <p className="subhead my-2">{activePage.blocks[0].subhead}</p>
                </div>
              </div>
            </section>
          )}
        </main>
        <footer className="mt-auto">
          {activePage && (
            <div className="container bg-white p-md-5">
              <div className="row align-items-center">
                <div className="col">
                  <p className="cta my-2">{activePage.blocks[0].cta}</p>
                </div>
                <div className="col-lg-4">
                  <p className="ctalink my-2">
                    LET'S TALK.
                    <span className="footer-arrow">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </footer>
      </div>
    );
  }
}

export default App;
