import {ImageWrapper} from "@/models/ImageWrapper";

export class ChallengeModel {
    constructor() {
        this.id = "";
        this.name = {};
        this.logo = new ImageWrapper();
        this.missions = []
    }
}