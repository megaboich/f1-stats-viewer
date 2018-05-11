import { IF1SeasonInfo } from "./models";

export class F1DataService {
  public async getSeasons(options: {
    minYear: number;
    maxYear: number;
  }): Promise<IF1SeasonInfo[]> {
    const response = await fetch(
      "http://ergast.com/api/f1/driverStandings/1.json?limit=1000000"
    );
    if (response.ok) {
      const rawJson = await response.json();
      if (
        !rawJson.MRData ||
        !rawJson.MRData.StandingsTable ||
        !rawJson.MRData.StandingsTable.StandingsLists ||
        !rawJson.MRData.StandingsTable.StandingsLists.length
      ) {
        throw new Error("Invalid JSON data received from server");
      }

      const allRawRecords = rawJson.MRData.StandingsTable
        .StandingsLists as any[];
      const allSeasons = allRawRecords.map(record =>
        this.dtoToSeasonInfo(record)
      );
      return allSeasons.filter(
        s => s.year >= options.minYear && s.year <= options.maxYear
      );
    }
    throw new Error("Error occured during retrieving data from server");
  }

  private dtoToSeasonInfo(dto: any): IF1SeasonInfo {
    if (
      !dto ||
      !dto.season ||
      !dto.DriverStandings ||
      !dto.DriverStandings.length
    ) {
      throw new Error("Invalid JSON data received from server");
    }
    const driverInfo = dto.DriverStandings[0].Driver;
    if (!driverInfo || !driverInfo.givenName || !driverInfo.familyName) {
      throw new Error("Invalid JSON data received from server");
    }
    const fullName = driverInfo.givenName + " " + driverInfo.familyName;
    return {
      winner: fullName,
      year: parseInt(dto.season, 10)
    };
  }
}
