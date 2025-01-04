import { observable, action } from "mobx";
import { Node } from "../types/Node";

export class ParameterStore {
  static readonly maxCourierCount = 10;

  @observable accessor courierCount: number = 2;

  @observable accessor nodes: Node[] = [];

  @observable accessor magazine: Node = new Node(0, 0);

  @observable accessor beePopulationCount: number = 100;

  @observable accessor maximumCycleNumber: number = 4000;

  @observable accessor algorithmPatience: number = 50;

  @observable accessor employedBeeRatio: number = 0.5;

  @observable accessor maximumCourierDistance: number = 200;

  @observable accessor showModal: boolean = false;

  @observable accessor shownModal : "" | "solution" | "data" | "optimization" = "";

  @action setMaximumCourierDistance(distance: number) {
    this.maximumCourierDistance = distance;
  }

  @action setShowModal(show: boolean) {
    this.showModal = show;
  }

  @action chooseSolutionModal() {
    this.shownModal = "solution";
  }

  @action chooseOptimizationModal() {
    this.shownModal = "optimization";
  }

  @action chooseDataModal() {
    this.shownModal = "data";
  }

  @action setCourierCount(count: number) {
    this.courierCount = count;
  }

  @action setNodes(nodes: Node[]) {
    this.nodes = nodes;
  }

  @action setMagazine(magazine: Node) {
    this.magazine = magazine;
  }

  @action setBeePopulationCount(count: number) {
    this.beePopulationCount = count;
  }

  @action setMaximumCycleNumber(number: number) {
    this.maximumCycleNumber = number;
  }

  @action setAlgorithmPatience(patience: number) {
    this.algorithmPatience = patience;
  }

  @action setEmployedBeeRatio(ratio: number) {
    this.employedBeeRatio = ratio;
  }
}
