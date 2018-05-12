import { IF1RaceInfo, IF1SeasonInfo } from "./models";

const APIRoot = "https://ergast.com/api/f1/";

export class F1DataService {
  public async getSeasons(options: {
    minYear: number;
    maxYear: number;
  }): Promise<IF1SeasonInfo[]> {
    const response = await fetch(
      APIRoot + "driverStandings/1.json?limit=1000000"
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

  public async getRaces(options: {
    seasonYear: number;
  }): Promise<IF1RaceInfo[]> {
    const response = await fetch(
      APIRoot + `${options.seasonYear}/results/1.json?limit=1000000`
    );
    if (response.ok) {
      const rawJson = await response.json();
      if (
        !rawJson.MRData ||
        !rawJson.MRData.RaceTable ||
        !rawJson.MRData.RaceTable.Races ||
        !rawJson.MRData.RaceTable.Races.length
      ) {
        throw new Error("Invalid JSON data received from server");
      }

      const allRawRecords = rawJson.MRData.RaceTable.Races as any[];
      const allRaces = allRawRecords.map(record => this.dtoToRaceInfo(record));
      return allRaces;
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
    const driverDetails = this.getDriverDetailsFromDto(
      dto.DriverStandings[0].Driver
    );
    return {
      winnerDriverFullName: driverDetails.fullName,
      winnerDriverId: driverDetails.id,
      year: parseInt(dto.season, 10)
    };
  }

  private dtoToRaceInfo(dto: any): IF1RaceInfo {
    if (
      !dto ||
      !dto.raceName ||
      !dto.date ||
      !dto.Results ||
      !dto.Results.length
    ) {
      throw new Error("Invalid JSON data received from server");
    }
    const driverDetails = this.getDriverDetailsFromDto(dto.Results[0].Driver);
    return {
      date: dto.date,
      raceName: dto.raceName,
      winnerDriverFullName: driverDetails.fullName,
      winnerDriverId: driverDetails.id
    };
  }

  private getDriverDetailsFromDto(
    driverInfoDto: any
  ): { fullName: string; id: string } {
    if (
      !driverInfoDto ||
      !driverInfoDto.givenName ||
      !driverInfoDto.familyName
    ) {
      throw new Error("Invalid JSON data received from server");
    }
    return {
      fullName: driverInfoDto.givenName + " " + driverInfoDto.familyName,
      id: driverInfoDto.driverId
    };
  }
}
