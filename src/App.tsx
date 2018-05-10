import * as React from "react";

import { IF1DataRecord } from "model/f1-data-record";
import { F1DataService } from "services/f1-data.service";

interface IAppState {
  f1Data?: IF1DataRecord[];
}

export class App extends React.Component<{}, IAppState> {
  private dataService = new F1DataService();

  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    const data = await this.dataService.getData();
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
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.f1Data.map(rec => (
                    <tr key={rec.name}>
                      <td>{rec.name}</td>
                      <td>{rec.date}</td>
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
}
