import * as React from "react";

import { F1DataService } from "services/f1-data.service";
import { IF1SeasonInfo } from "services/models";

interface IAppState {
  f1Data?: IF1SeasonInfo[];
  selectedSeason?: IF1SeasonInfo;
}

export class App extends React.Component<{}, IAppState> {
  private dataService = new F1DataService();

  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    const data = await this.dataService.getSeasons({
      maxYear: 2015,
      minYear: 2000
    });
    this.setState({ f1Data: data });
  }

  public render() {
    return (
      <div className="App">
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item">Formula one statistics viewer</div>
          </div>
        </nav>
        <div className="section">
          <div className="container">
            {this.state.f1Data && (
              <table className="table is-hoverable">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.f1Data.map(rec => (
                    <tr
                      key={rec.year}
                      className={
                        this.state.selectedSeason === rec ? "is-selected" : ""
                      }
                      onClick={this.handleSeasonSelection(rec)}
                    >
                      <td>{rec.year}</td>
                      <td>{rec.winner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }

  private handleSeasonSelection(season: IF1SeasonInfo) {
    return () => this.setState({ selectedSeason: season });
  }
}
