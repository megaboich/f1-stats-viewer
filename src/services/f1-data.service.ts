import { IF1DataRecord } from "model/f1-data-record";

export class F1DataService {
  public async getData(): Promise<IF1DataRecord[]> {
    const fake: IF1DataRecord[] = [
      { name: "Michael", date: "2005" },
      { name: "Michael 2", date: "2002" }
    ];
    return fake;
  }
}
