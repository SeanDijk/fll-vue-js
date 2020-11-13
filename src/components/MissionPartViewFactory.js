import CheckBoxMissionPart from "./mission/parts/CheckboxMissionPart";
import MultipleChoiceMissionPart from "./mission/parts/MultipleChoiceMissionPart";
import SliderMissionPart from "./mission/parts/SilderMissionPart";
import ExtraPointsForEachMissionWithPointsMissionPart
    from "./mission/parts/special/ExtraPointsForEachMissionWithPointsMissionPart";
import Vue from 'vue'



class MissionPartViewFactory {
    constructor() {
        this.classMap = {
            'CheckBox': Vue.extend(CheckBoxMissionPart),
            'MultipleChoice': Vue.extend(MultipleChoiceMissionPart),
            'Slider': Vue.extend(SliderMissionPart),
            'ExtraPointsForEachMissionWithPoints': Vue.extend(ExtraPointsForEachMissionWithPointsMissionPart)
        };
    }

    createMissionPartView = function (missionPartData, onScoreChanged) {
        let ComponentClass = this.classMap[missionPartData.type+""];
        if (ComponentClass === undefined){
            console.error("MissionPart {} not found", missionPartData.type)
            return null;
        }

        let instance = new ComponentClass({
            propsData: {missionPartJson: missionPartData}
        });
        instance.$on('score-changed', (previousScore, newScore) => {
            onScoreChanged(previousScore, newScore);
        });
        instance.$mount();
        return instance;
    }
}
export default MissionPartViewFactory;