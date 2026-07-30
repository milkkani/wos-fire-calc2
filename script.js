const BUILDINGS = {
  furnace: {
    name: "大溶鉱炉",
    type: "furnace",
    rule: "目標Lvの1つ下まで大使館が必要"
  },

  embassy: {
    name: "大使館",
    type: "embassy",
    rule: "大溶鉱炉と同じLvまで育成可能"
  },

  command: {
    name: "司令部",
    type: "command",
    rule: "大溶鉱炉と同じLvまで育成可能"
  },

  infirmary: {
    name: "軍医所",
    type: "command",
    rule: "大溶鉱炉と同じLvまで育成可能"
  },

  infantry: {
    name: "盾兵舎",
    type: "barracks",
    rule: "大溶鉱炉と同じLvまで育成可能"
  },

  lancer: {
    name: "槍兵舎",
    type: "barracks",
    rule: "大溶鉱炉と同じLvまで育成可能"
  },

  marksman: {
    name: "弓兵舎",
    type: "barracks",
    rule: "大溶鉱炉と同じLvまで育成可能"
  },

  academy: {
    name: "戦争学園",
    type: "academy",
    rule: "火晶Lv2以降・大溶鉱炉と同じLvまで"
  }
};


/*
  各配列は、その段階へ進む際の費用。

  火晶Lv1〜5：
  各レベル5段階。

  火晶Lv6〜10：
  ★1〜4は同じ費用、★5のみ別費用。
*/

const COST_TABLE = {
  furnace: {
    1: {
      normal: { crystal: 132, refined: 0 },
      final:  { crystal: 132, refined: 0 }
    },

    2: {
      normal: { crystal: 158, refined: 0 },
      final:  { crystal: 158, refined: 0 }
    },

    3: {
      normal: { crystal: 238, refined: 0 },
      final:  { crystal: 238, refined: 0 }
    },

    4: {
      normal: { crystal: 280, refined: 0 },
      final:  { crystal: 280, refined: 0 }
    },

    5: {
      normal: { crystal: 335, refined: 0 },
      final:  { crystal: 335, refined: 0 }
    },

    6: {
      normal: { crystal: 200, refined: 10 },
      final:  { crystal: 100, refined: 20 }
    },

    7: {
      normal: { crystal: 240, refined: 15 },
      final:  { crystal: 120, refined: 30 }
    },

    8: {
      normal: { crystal: 240, refined: 20 },
      final:  { crystal: 120, refined: 40 }
    },

    9: {
      normal: { crystal: 280, refined: 30 },
      final:  { crystal: 140, refined: 60 }
    },

    10: {
      normal: { crystal: 350, refined: 70 },
      final:  { crystal: 175, refined: 140 }
    }
  },

  embassy: {
    1: {
      normal: { crystal: 33, refined: 0 },
      final:  { crystal: 33, refined: 0 }
    },

    2: {
      normal: { crystal: 39, refined: 0 },
      final:  { crystal: 39, refined: 0 }
    },

    3: {
      normal: { crystal: 59, refined: 0 },
      final:  { crystal: 59, refined: 0 }
    },

    4: {
      normal: { crystal: 70, refined: 0 },
      final:  { crystal: 70, refined: 0 }
    },

    5: {
      normal: { crystal: 83, refined: 0 },
      final:  { crystal: 83, refined: 0 }
    },

    6: {
      normal: { crystal: 50, refined: 2 },
      final:  { crystal: 25, refined: 5 }
    },

    7: {
      normal: { crystal: 60, refined: 3 },
      final:  { crystal: 30, refined: 7 }
    },

    8: {
      normal: { crystal: 60, refined: 5 },
      final:  { crystal: 30, refined: 10 }
    },

    9: {
      normal: { crystal: 70, refined: 7 },
      final:  { crystal: 35, refined: 15 }
    },

    10: {
      normal: { crystal: 87, refined: 17 },
      final:  { crystal: 43, refined: 35 }
    }
  },

  command: {
    1: {
      normal: { crystal: 26, refined: 0 },
      final:  { crystal: 26, refined: 0 }
    },

    2: {
      normal: { crystal: 31, refined: 0 },
      final:  { crystal: 31, refined: 0 }
    },

    3: {
      normal: { crystal: 47, refined: 0 },
      final:  { crystal: 47, refined: 0 }
    },

    4: {
      normal: { crystal: 56, refined: 0 },
      final:  { crystal: 56, refined: 0 }
    },

    5: {
      normal: { crystal: 67, refined: 0 },
      final:  { crystal: 67, refined: 0 }
    },

    6: {
      normal: { crystal: 40, refined: 2 },
      final:  { crystal: 20, refined: 4 }
    },

    7: {
      normal: { crystal: 48, refined: 3 },
      final:  { crystal: 24, refined: 7 }
    },

    8: {
      normal: { crystal: 48, refined: 4 },
      final:  { crystal: 24, refined: 8 }
    },

    9: {
      normal: { crystal: 56, refined: 6 },
      final:  { crystal: 28, refined: 12 }
    },

    10: {
      normal: { crystal: 70, refined: 14 },
      final:  { crystal: 35, refined: 28 }
    }
  },

  barracks: {
    1: {
      normal: { crystal: 59, refined: 0 },
      final:  { crystal: 59, refined: 0 }
    },

    2: {
      normal: { crystal: 71, refined: 0 },
      final:  { crystal: 71, refined: 0 }
    },

    3: {
      normal: { crystal: 107, refined: 0 },
      final:  { crystal: 107, refined: 0 }
    },

    4: {
      normal: { crystal: 126, refined: 0 },
      final:  { crystal: 126, refined: 0 }
    },

    5: {
      normal: { crystal: 150, refined: 0 },
      final:  { crystal: 150, refined: 0 }
    },

    6: {
      normal: { crystal: 90, refined: 4 },
      final:  { crystal: 45, refined: 9 }
    },

    7: {
      normal: { crystal: 108, refined: 6 },
      final:  { crystal: 54, refined: 13 }
    },

    8: {
      normal: { crystal: 108, refined: 9 },
      final:  { crystal: 54, refined: 18 }
    },

    9: {
      normal: { crystal: 126, refined: 13 },
      final:  { crystal: 63, refined: 27 }
    },

    10: {
      normal: { crystal: 157, refined: 31 },
      final:  { crystal: 78, refined: 63 }
    }
  },

  academy: {
    1: null,

    2: {
      normal: { crystal: 71, refined: 0 },
      final:  { crystal: 71, refined: 0 }
    },

    3: {
      normal: { crystal: 107, refined: 0 },
      final:  { crystal: 107, refined: 0 }
    },

    4: {
      normal: { crystal: 126, refined: 0 },
      final:  { crystal: 126, refined: 0 }
    },

    5: {
      normal: { crystal: 150, refined: 0 },
      final:  { crystal: 150, refined: 0 }
    },

    6: {
      normal: { crystal: 90, refined: 4 },
      final:  { crystal: 45, refined: 9 }
    },

    7: {
      normal: { crystal: 108, refined: 6 },
      final:  { crystal: 54, refined: 13 }
    },

    8: {
      normal: { crystal: 108, refined: 9 },
      final:  { crystal: 54, refined: 18 }
    },

    9: {
      normal: { crystal: 126, refined: 13 },
      final:  { crystal: 63, refined: 27 }
    },

    10: {
      normal: { crystal: 157, refined: 31 },
      final:  { crystal: 78, refined: 63 }
    }
  }
};


function buildProgressSteps(type) {
  const steps = [];

  /*
    index 0は火晶育成開始前。
  */
  steps.push({
    level: 0,
    stage: 0,
    label: "火晶未着手",
    crystal: 0,
    refined: 0
  });

  for (let level = 1; level <= 10; level++) {
    const levelCosts = COST_TABLE[type][level];

    if (!levelCosts) {
      continue;
    }

    for (let stage = 1; stage <= 5; stage++) {
      const isFinal = stage === 5;
      const cost = isFinal
        ? levelCosts.final
        : levelCosts.normal;

      let label;

      if (level <= 5) {
        label = `火晶Lv${level} ${stage}/5`;
      } else {
        label = `火晶Lv${level} ★${stage}`;
      }

      steps.push({
        level,
        stage,
        label,
        crystal: cost.crystal,
        refined: cost.refined
      });
    }
  }

  return steps;
}


const PROGRESS_STEPS = {
  furnace: buildProgressSteps("furnace"),
  embassy: buildProgressSteps("embassy"),
  command: buildProgressSteps("command"),
  barracks: buildProgressSteps("barracks"),
  academy: buildProgressSteps("academy")
};


function createInitialState() {
  const state = {};

  Object.keys(BUILDINGS).forEach(function (buildingId) {
    state[buildingId] = {
      selected: false,
      current: 0,
      target: 0
    };
  });

  return state;
}


function loadState() {
  try {
    const saved =
      localStorage.getItem("wosFireBuildingCalculator");

    if (!saved) {
      return createInitialState();
    }

    const parsed = JSON.parse(saved);
    const initial = createInitialState();

    Object.keys(initial).forEach(function (buildingId) {
      if (parsed[buildingId]) {
        initial[buildingId] = {
          ...initial[buildingId],
          ...parsed[buildingId]
        };
      }
    });

    return initial;
  } catch (error) {
    return createInitialState();
  }
}


let state = loadState();


function saveState() {
  localStorage.setItem(
    "wosFireBuildingCalculator",
    JSON.stringify(state)
  );
}


function formatNumber(value) {
  return value.toLocaleString("ja-JP");
}


function getSteps(buildingId) {
  return PROGRESS_STEPS[
    BUILDINGS[buildingId].type
  ];
}


function getCompletedLevel(
  buildingId,
  progressIndex
) {
  const steps = getSteps(buildingId);
  const step = steps[progressIndex];

  if (!step) {
    return 0;
  }

  /*
    第5段階・★5まで到達している場合のみ、
    その火晶レベルを完成扱いにする。
  */
  return step.stage === 5
    ? step.level
    : Math.max(0, step.level - 1);
}


function findCompletedLevelIndex(
  buildingId,
  requiredLevel
) {
  if (requiredLevel <= 0) {
    return 0;
  }

  const steps = getSteps(buildingId);

  let resultIndex = 0;

  steps.forEach(function (step, index) {
    if (
      step.level === requiredLevel &&
      step.stage === 5
    ) {
      resultIndex = index;
    }
  });

  return resultIndex;
}


function calculateCostBetween(
  buildingId,
  currentIndex,
  targetIndex
) {
  const steps = getSteps(buildingId);

  let crystal = 0;
  let refined = 0;

  if (targetIndex <= currentIndex) {
    return { crystal, refined };
  }

  for (
    let index = currentIndex + 1;
    index <= targetIndex;
    index++
  ) {
    crystal += steps[index].crystal;
    refined += steps[index].refined;
  }

  return { crystal, refined };
}


/*
  選択された目標に必要な前提施設を反映する。

  大溶鉱炉：
  完成目標Lvの1つ下まで大使館が必要。

  その他：
  完成目標Lvと同じ大溶鉱炉Lvが必要。
*/
function resolveRequiredTargets() {
  const requiredTargets = {};

  Object.keys(BUILDINGS).forEach(function (buildingId) {
    requiredTargets[buildingId] =
      state[buildingId].current;
  });

  Object.keys(BUILDINGS).forEach(function (buildingId) {
    if (!state[buildingId].selected) {
      return;
    }

    requiredTargets[buildingId] =
      Math.max(
        requiredTargets[buildingId],
        state[buildingId].target
      );
  });

  let changed = true;
  let safety = 0;

  while (changed && safety < 20) {
    changed = false;
    safety++;

    /*
      大溶鉱炉の最終目標Lvを取得。
    */
    const furnaceTargetLevel =
      getCompletedLevel(
        "furnace",
        requiredTargets.furnace
      );

    /*
      大溶鉱炉以外の施設が要求する
      大溶鉱炉レベルを確認する。
    */
    Object.keys(BUILDINGS).forEach(
      function (buildingId) {
        if (buildingId === "furnace") {
          return;
        }

        const buildingTargetLevel =
          getCompletedLevel(
            buildingId,
            requiredTargets[buildingId]
          );

        if (buildingTargetLevel <= furnaceTargetLevel) {
          return;
        }

        const requiredFurnaceIndex =
          findCompletedLevelIndex(
            "furnace",
            buildingTargetLevel
          );

        if (
          requiredFurnaceIndex >
          requiredTargets.furnace
        ) {
          requiredTargets.furnace =
            requiredFurnaceIndex;

          changed = true;
        }
      }
    );

    /*
      大溶鉱炉を上げるために必要な
      大使館レベルを追加する。
    */
    const updatedFurnaceLevel =
      getCompletedLevel(
        "furnace",
        requiredTargets.furnace
      );

    const requiredEmbassyLevel =
      Math.max(0, updatedFurnaceLevel - 1);

    const requiredEmbassyIndex =
      findCompletedLevelIndex(
        "embassy",
        requiredEmbassyLevel
      );

    if (
      requiredEmbassyIndex >
      requiredTargets.embassy
    ) {
      requiredTargets.embassy =
        requiredEmbassyIndex;

      changed = true;
    }
  }

  return requiredTargets;
}


function renderBuildingList() {
  const container =
    document.getElementById("buildingList");

  container.innerHTML = "";

  const requiredTargets =
    resolveRequiredTargets();

  Object.keys(BUILDINGS).forEach(
    function (buildingId) {
      const building = BUILDINGS[buildingId];
      const buildingState = state[buildingId];
      const steps = getSteps(buildingId);

      const card =
        document.createElement("article");

      card.className = "building-card";

      if (buildingState.selected) {
        card.classList.add("selected");
      }

      const header =
        document.createElement("div");

      header.className = "building-header";

      const checkbox =
        document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.className = "building-check";
      checkbox.checked = buildingState.selected;

      checkbox.addEventListener(
        "change",
        function () {
          state[buildingId].selected =
            checkbox.checked;

          saveState();
          render();
        }
      );

      const information =
        document.createElement("div");

      information.className =
        "building-information";

      information.innerHTML = `
        <div class="building-name">
          ${building.name}
        </div>

        <div class="building-rule">
          ${building.rule}
        </div>
      `;

      header.appendChild(checkbox);
      header.appendChild(information);

      const controls =
        document.createElement("div");

      controls.className =
        "building-controls";

      const currentBox =
        createSelectBox(
          "現在",
          steps,
          buildingState.current,
          function (newValue) {
            state[buildingId].current =
              newValue;

            if (
              state[buildingId].target <
              newValue
            ) {
              state[buildingId].target =
                newValue;
            }

            saveState();
            render();
          }
        );

      const arrow =
        document.createElement("div");

      arrow.className = "arrow";
      arrow.textContent = "→";

      const targetBox =
        createSelectBox(
          "目標",
          steps,
          buildingState.target,
          function (newValue) {
            state[buildingId].target =
              Math.max(
                newValue,
                state[buildingId].current
              );

            saveState();
            render();
          }
        );

      controls.appendChild(currentBox);
      controls.appendChild(arrow);
      controls.appendChild(targetBox);

      const directCost =
        calculateCostBetween(
          buildingId,
          buildingState.current,
          requiredTargets[buildingId]
        );

      const costBox =
        document.createElement("div");

      costBox.className = "building-cost";

      costBox.innerHTML = `
        <span>
          計算対象：
          <strong>
            ${steps[buildingState.current].label}
            →
            ${steps[requiredTargets[buildingId]].label}
          </strong>
        </span>

        <span>
          火晶 ${formatNumber(directCost.crystal)}
          ／
          精錬 ${formatNumber(directCost.refined)}
        </span>
      `;

      card.appendChild(header);
      card.appendChild(controls);

      if (
        !buildingState.selected &&
        requiredTargets[buildingId] >
        buildingState.current
      ) {
        const badge =
          document.createElement("div");

        badge.className = "auto-badge";
        badge.textContent =
          "前提施設として自動追加";

        card.appendChild(badge);
      }

      card.appendChild(costBox);
      container.appendChild(card);
    }
  );
}


function createSelectBox(
  labelText,
  steps,
  selectedValue,
  changeHandler
) {
  const box =
    document.createElement("div");

  box.className = "select-box";

  const label =
    document.createElement("label");

  label.textContent = labelText;

  const select =
    document.createElement("select");

  steps.forEach(function (step, index) {
    const option =
      document.createElement("option");

    option.value = index;
    option.textContent = step.label;
    option.selected = index === selectedValue;

    select.appendChild(option);
  });

  select.addEventListener(
    "change",
    function () {
      changeHandler(Number(select.value));
    }
  );

  box.appendChild(label);
  box.appendChild(select);

  return box;
}


function renderSummary() {
  const requiredTargets =
    resolveRequiredTargets();

  let totalCrystal = 0;
  let totalRefined = 0;
  let selectedCount = 0;
  let autoAddedCount = 0;

  const routeList =
    document.getElementById("routeList");

  routeList.innerHTML = "";

  Object.keys(BUILDINGS).forEach(
    function (buildingId) {
      if (state[buildingId].selected) {
        selectedCount++;
      }

      const current =
        state[buildingId].current;

      const requiredTarget =
        requiredTargets[buildingId];

      if (requiredTarget <= current) {
        return;
      }

      const cost =
        calculateCostBetween(
          buildingId,
          current,
          requiredTarget
        );

      totalCrystal += cost.crystal;
      totalRefined += cost.refined;

      if (!state[buildingId].selected) {
        autoAddedCount++;
      }

      const steps = getSteps(buildingId);

      const item =
        document.createElement("div");

      item.className = "route-item";

      item.innerHTML = `
        <span>
          ${BUILDINGS[buildingId].name}
          ${
            state[buildingId].selected
              ? ""
              : "（前提）"
          }
        </span>

        <span>
          ${steps[current].label}
          →
          ${steps[requiredTarget].label}
        </span>
      `;

      routeList.appendChild(item);
    }
  );

  document.getElementById(
    "selectedCount"
  ).textContent =
    `${selectedCount}施設選択中`;

  document.getElementById(
    "totalCrystal"
  ).textContent =
    formatNumber(totalCrystal);

  document.getElementById(
    "totalRefined"
  ).textContent =
    formatNumber(totalRefined);

  const note =
    document.getElementById(
      "calculationNote"
    );

  if (selectedCount === 0) {
    note.textContent =
      "施設を選択してください";
  } else if (autoAddedCount > 0) {
    note.textContent =
      `前提施設 ${autoAddedCount}件を自動追加しています`;
  } else {
    note.textContent =
      "選択した施設のみで条件を満たしています";
  }

  if (!routeList.children.length) {
    const empty =
      document.createElement("div");

    empty.className = "route-empty";
    empty.textContent =
      selectedCount === 0
        ? "施設を選択すると表示されます"
        : "追加で必要な育成はありません";

    routeList.appendChild(empty);
  }
}


function render() {
  renderBuildingList();
  renderSummary();
  saveState();
}


document
  .getElementById("selectAllButton")
  .addEventListener(
    "click",
    function () {
      Object.keys(BUILDINGS).forEach(
        function (buildingId) {
          state[buildingId].selected = true;
        }
      );

      render();
    }
  );


document
  .getElementById("clearAllButton")
  .addEventListener(
    "click",
    function () {
      Object.keys(BUILDINGS).forEach(
        function (buildingId) {
          state[buildingId].selected = false;
        }
      );

      render();
    }
  );


document
  .getElementById("resetButton")
  .addEventListener(
    "click",
    function () {
      state = createInitialState();
      saveState();
      render();
    }
  );


render();
