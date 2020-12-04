<template>
  <div>
    <h1>Saved Challenges</h1>

    <div v-if="filteredMap.length !== 0">
      <details v-for="(scoresheets, key) in filteredMap" :key="key">
        <summary class="scoresheets-summary">
          <img class="challenge-logo" :src="getImage(scoresheets[0].challenge)" :alt="scoresheets[0].challenge.logo.description">
          <h1>{{ scoresheets[0].challenge.name | localeString }}</h1>
          <span class="flex-filler"></span>
          <img class="btn-icon" src="@/assets/icons/expand_more-24px.svg"/>
        </summary>
        <data-table :ref="key">
          <template v-slot:thead>
            <tr class="mdc-data-table__header-row">
              <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader"
                  scope="col">
                <div class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
                  <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Toggle all rows"/>
                  <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                      <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                  </div>
                  <div class="mdc-checkbox__ripple"></div>
                </div>
              </th>

              <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Naam</th>
              <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Score</th>
              <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Opgeslagen om</th>
              <th class="mdc-data-table__header-cell" role="columnheader" scope="col"></th>
            </tr>
          </template>
          <template v-slot:tbody>
            <tr v-for="scoresheet in scoresheets" v-bind:key="scoresheet.id"
                v-on:click="openSheet(scoresheet)"
                :data-row-id="scoresheet.id"
                class="mdc-data-table__row">
              <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                <div class="mdc-checkbox mdc-data-table__row-checkbox">
                  <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u0"/>
                  <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                      <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                  </div>
                  <div class="mdc-checkbox__ripple"></div>
                </div>
              </td>
              <td class="mdc-data-table__cell">{{ scoresheet.name }}</td>
              <td class="mdc-data-table__cell">{{ scoresheet.totalScore }}</td>
              <td class="mdc-data-table__cell">{{ scoresheet.savedAt }}</td>
              <td class="mdc-data-table__cell">
                <router-link :to="`/saved-scoresheets/${scoresheet.id}`">
                  <img class="btn-icon" src="@/assets/icons/open_in_new-24px.svg"/>
                </router-link>
              </td>
            </tr>
          </template>
          <template v-slot:default>
            <button @click="deleteSelectedFrom(key)">Delete selected</button>
          </template>
        </data-table>
      </details>
    </div>
    <div v-else>
      Geen opgeslagen scoreformulieren gevonden
    </div>

  </div>
</template>

<script>
import scoresheetService from "@/services/scoresheetService";
import {groupBy} from "@/util/collections";
import {log} from "@/main";
import DataTable from "@/components/util/DataTable";
import {getImageSrc} from "@/services/imageRetriever";

export default {
  name: "SavedChallenges",
  components: {DataTable},
  data: function () {
    return {
      scoresheetMap: []
    }
  },
  mounted() {
    scoresheetService.getAllScoresheets()
        .then(value => {
          this.scoresheetMap = groupBy(value, (sheet) => {
            return sheet.challenge.id
          })
        })
  },
  methods: {
    getImage(challenge) {
      return getImageSrc(true, challenge.id, challenge?.logo?.path)
    },
    openSheet(sheet) {
      log.debug("Opening sheet with id: ", sheet.id)
    },
    deleteSelectedFrom(key) {
      let ids = this.$refs[key][0].table.getSelectedRowIds()

      log.debug("Deleting sheets with ids: ", ids)
      // Remove the values from the database
      scoresheetService.deleteScoresheetForIds(ids)
          .then(value => {
                log.debug("Deleted scoresheets for ids: ", ids, value);
                // Remove the values from the gui
                this.scoresheetMap[key] = this.scoresheetMap[key]
                    .filter(scoresheet => !ids.includes(scoresheet.id + ""));
                // Reload the datatable in the next tick, so that the gui is updated first.
                this.$nextTick((function () {
                  this.$refs[key][0]?.reload()
                }));
              }
          );
    },
  }
  ,
  computed: {
    // Get a filtered variant of the map, where all the values with a length of 0 are removed
    filteredMap: function () {
      return Object.fromEntries(
          Object.entries(this.scoresheetMap)
              .filter(([, value]) => value.length !== 0))
    }
  }
}
</script>

<style scoped>

.scoresheets-summary {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

details > summary::-webkit-details-marker {
  display: none;
}


.challenge-logo {
  box-sizing: border-box;
  padding: 8px;
  height: 100px;
  width: 100px;
}

.mdc-data-table__header-cell {
  font-weight: bold;
}
</style>