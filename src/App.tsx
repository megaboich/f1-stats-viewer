import * as React from "react";
import { F1DataService } from "services/f1-data.service";
import { IF1RaceInfo, IF1SeasonInfo } from "services/models";
import { ProgressComponentComponent } from "ui/generic/progress.component";
import { RacesGridComponent } from "ui/races-grid.component";
import { SeasonsGridComponent } from "ui/seasons-grid.component";

interface IAppState {
  seasons?: IF1SeasonInfo[];
  races?: IF1RaceInfo[];
  selectedSeason?: IF1SeasonInfo;
}

export class App extends React.Component<{}, IAppState> {
  private dataService = new F1DataService();

  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    await this.loadSeasons();
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
            <div className="columns">
              <div className="column is-one-third">
                {this.state.seasons ? (
                  <SeasonsGridComponent
                    seasons={this.state.seasons}
                    selectedSeason={this.state.selectedSeason}
                    onSelectionChange={season =>
                      this.handleSeasonSelection(season)
                    }
                  />
                ) : (
                  <ProgressComponentComponent />
                )}
              </div>
              <div className="column">
                {this.state.selectedSeason ? (
                  this.state.races ? (
                    <RacesGridComponent
                      races={this.state.races}
                      highlightDriverId={
                        this.state.selectedSeason.winnerDriverId
                      }
                    />
                  ) : (
                    <ProgressComponentComponent />
                  )
                ) : (
                  <p />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private async loadSeasons() {
    const seasons = await this.dataService.getSeasons({
      maxYear: 2015,
      minYear: 2000
    });
    this.setState({ seasons });
  }

  private async loadRaces(seasonYear: number) {
    const races = await this.dataService.getRaces({ seasonYear });
    this.setState({ races });
  }

  private async handleSeasonSelection(season: IF1SeasonInfo) {
    this.setState({ selectedSeason: season });
    await this.loadRaces(season.year);
  }
}
