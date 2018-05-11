import * as React from "react";
import { IF1SeasonInfo } from "services/models";

export interface ISeasonsViewProps {
  seasons: IF1SeasonInfo[];
  selectedSeason?: IF1SeasonInfo;
  onSelectionChange(season: IF1SeasonInfo): void;
}
export class SeasonsGridComponent extends React.Component<
  ISeasonsViewProps,
  {}
> {
  public render() {
    return (
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Season</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {this.props.seasons.map(season => (
            <tr
              key={season.year}
              className={
                this.props.selectedSeason === season ? "is-selected" : ""
              }
              onClick={() => this.props.onSelectionChange(season)}
            >
              <td>
                <a href="javascript:void(0)">{season.year}</a>
              </td>
              <td>
                <a href="javascript:void(0)">{season.winnerDriverFullName}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
