<template>
  <div>
    <h1>Saved Challenges</h1>

    <div v-if="scoresheetMap">
      <details v-for="(scoresheets, key) in scoresheetMap" :key="key">
        <summary>{{ scoresheets[0].challenge.name | localeString }}</summary>

        <div class="mdc-data-table">
          <div class="mdc-data-table__table-container">
            <table class="mdc-data-table__table">
              <thead>
              <tr class="mdc-data-table__header-row">
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Naam</th>
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Score</th>
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Opgeslagen om</th>
              </tr>
              </thead>
              <tbody class="mdc-data-table__content">
              <tr v-for="scoresheet in scoresheets" v-bind:key="scoresheet.id"
                  v-on:click="openSheet(scoresheet)"
                  class="mdc-data-table__row">
                <td class="mdc-data-table__cell">{{ scoresheet.name }}</td>
                <td class="mdc-data-table__cell">{{ scoresheet.totalScore }}</td>
                <td class="mdc-data-table__cell">{{ scoresheet.savedAt }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

      </details>
      <div class="mdc-data-table">
        <div class="mdc-data-table__table-container">
          <table class="mdc-data-table__table" aria-label="Dessert calories">
            <thead>
            <tr class="mdc-data-table__header-row">
              <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
                <div class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
                  <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Toggle all rows"/>
                  <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                      <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                  </div>
                  <div class="mdc-checkbox__ripple"></div>
                </div>
              </th>
              <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Signal name</th>
              <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Status</th>
              <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Severity</th>
              <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Stage</th>
              <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Time</th>
              <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Roles</th>
            </tr>
            </thead>
            <tbody class="mdc-data-table__content">
            <tr data-row-id="u0" class="mdc-data-table__row">
              <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                <div class="mdc-checkbox mdc-data-table__row-checkbox">
                  <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u0"/>
                  <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                      <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                  </div>
                  <div class="mdc-checkbox__ripple"></div>
                </div>
              </td>
              <th class="mdc-data-table__cell" scope="row" id="u0">Arcus watch slowdown</th>
              <td class="mdc-data-table__cell">Online</td>
              <td class="mdc-data-table__cell">Medium</td>
              <td class="mdc-data-table__cell">Triaged</td>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
              <td class="mdc-data-table__cell">Allison Brie</td>
            </tr>
            <tr data-row-id="u1" class="mdc-data-table__row mdc-data-table__row--selected" aria-selected="true">
              <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                <div class="mdc-checkbox mdc-data-table__row-checkbox mdc-checkbox--selected">
                  <input type="checkbox" class="mdc-checkbox__native-control" checked aria-labelledby="u1"/>
                  <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                      <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                  </div>
                  <div class="mdc-checkbox__ripple"></div>
                </div>
              </td>
              <th class="mdc-data-table__cell" scope="row" id="u1">monarch: prod shared ares-managed-features-provider-heavy</th>
              <td class="mdc-data-table__cell">Offline</td>
              <td class="mdc-data-table__cell">Huge</td>
              <td class="mdc-data-table__cell">Triaged</td>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
              <td class="mdc-data-table__cell">Brie Larson</td>
            </tr>
            <tr data-row-id="u2" class="mdc-data-table__row mdc-data-table__row--selected" aria-selected="true">
              <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                <div class="mdc-checkbox mdc-data-table__row-checkbox mdc-checkbox--selected">
                  <input type="checkbox" class="mdc-checkbox__native-control" checked aria-labelledby="u2"/>
                  <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                      <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                  </div>
                  <div class="mdc-checkbox__ripple"></div>
                </div>
              </td>
              <th class="mdc-data-table__cell" scope="row" id="u2">monarch: prod shared ares-managed-features-provider-heavy</th>
              <td class="mdc-data-table__cell">Online</td>
              <td class="mdc-data-table__cell">Minor</td>
              <td class="mdc-data-table__cell">Not triaged</td>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
              <td class="mdc-data-table__cell">Jeremy Lake</td>
            </tr>
            <tr data-row-id="u3" class="mdc-data-table__row">
              <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                <div class="mdc-checkbox mdc-data-table__row-checkbox">
                  <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u3"/>
                  <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                      <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                  </div>
                  <div class="mdc-checkbox__ripple"></div>
                </div>
              </td>
              <th class="mdc-data-table__cell" scope="row" id="u3">Arcus watch slowdown</th>
              <td class="mdc-data-table__cell">Online</td>
              <td class="mdc-data-table__cell">Negligible</td>
              <td class="mdc-data-table__cell">Triaged</td>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
              <td class="mdc-data-table__cell">Angelina Cheng</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
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
import {MDCDataTable} from '@material/data-table';

export default {
  name: "SavedChallenges",
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
    // eslint-disable-next-line no-unused-vars
    const foos = [].map.call(document.querySelectorAll('.mdc-data-table'), function(el) {
      return new MDCDataTable(el);
    });
    console.log(document.querySelectorAll('details'))
    console.log(document.querySelectorAll('.mdc-data-table'))
  },
  methods: {
    openSheet(sheet) {
      log.debug("Opening sheet with id: ", sheet.id)
    },
    deleteSheets(sheets) {
      log.debug("Deleting sheets with ids: ", sheets.map(sheet => sheet.id))
    }
  }
}
</script>

<style scoped>

</style>