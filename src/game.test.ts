import { describe, it, expect } from "vitest";
import { PlayWW1Model } from "./screens/PlayScreen/PlayWW1/PlayWW1Model.ts";
import { PlayWW2Model } from "./screens/PlayScreen/PlayWW2/PlayWW2Model.ts";

describe("game", () => {
  it("Play WW1 hint lists should have equal lengths", () => {
    let model = new PlayWW1Model();
    expect(model.factHints.length).toStrictEqual(model.flagImages.length);
  });

  it("Play WW2 hint lists should have equal lengths", () => {
    let model = new PlayWW2Model();
    expect(model.factHints.length).toStrictEqual(model.flagImages.length);
  });

  it("Make guess in play mode with empty string", () => {
    let playmodel1 = new PlayWW1Model();
    let playmodel2 = new PlayWW2Model();
    expect(playmodel1.stage).toStrictEqual(1);
    expect(playmodel2.stage).toStrictEqual(1);
    playmodel1.makeGuess("");
    playmodel2.makeGuess("");
    expect(playmodel1.stage).toStrictEqual(1);
    expect(playmodel2.stage).toStrictEqual(1);
  });

  it("Play mode should be in end stage at game start", () => {
    let playmodel1 = new PlayWW1Model();
    let playmodel2 = new PlayWW2Model();
    expect(playmodel1.stage).toStrictEqual(1);
    expect(playmodel2.stage).toStrictEqual(1);
    expect(playmodel1.isEndStage()).toStrictEqual(false);
    expect(playmodel2.isEndStage()).toStrictEqual(false);
  });
});
