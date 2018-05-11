import * as flagIcon from "open-iconic/svg/flag.svg";
import * as React from "react";
import { IF1RaceInfo } from "services/models";

export interface IRacesViewProps {
  races: IF1RaceInfo[];
  highlightDriverId: string;
}
export class RacesGridComponent extends React.Component<IRacesViewProps, {}> {
  public render() {
    return (
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Race place</th>
            <th>Date of race</th>
            <th />
            <th>Race winner</th>
          </tr>
        </thead>
        <tbody>
          {this.props.races.map(race => (
            <tr key={race.date}>
              <td>{race.raceName}</td>
              <td>{race.date}</td>
              <td>
                {race.winnerDriverId === this.props.highlightDriverId ? (
                  <img src={flagIcon} alt="icon name" />
                ) : (
                  ""
                )}
              </td>
              <td>{race.winnerDriverFullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
