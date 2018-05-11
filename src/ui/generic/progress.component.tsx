import * as React from "react";

export interface IProgressComponentProps {
  value?: number;
}

export class ProgressComponentComponent extends React.Component<
  IProgressComponentProps,
  {}
> {
  public render() {
    return (
      <>
        <br />
        <br />
        <br />
        <p>Loading...</p>
        <br />
        <progress
          className="progress is-primary"
          value={this.props.value || 65}
          max="100"
        />
      </>
    );
  }
}
