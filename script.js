(() => {
  "use strict";

  const BUILDINGS = [
    ["furnace", "大溶鉱炉", "Lv30から火晶Lv10まで"],
    ["embassy", "大使館", "Lv30から火晶Lv10まで"],
    ["command", "司令部", "Lv30から火晶Lv10まで"],
    ["infirmary", "軍医所", "Lv30から火晶Lv10まで"],
    ["infantry", "盾兵舎", "Lv30から火晶Lv10まで"],
    ["lancer", "槍兵舎", "Lv30から火晶Lv10まで"],
    ["marksman", "弓兵舎", "Lv30から火晶Lv10まで"],
    ["academy", "戦争学園", "火晶Lv1から火晶Lv10まで"]
  ];

  const same = crystal =>
    Array.from({ length: 5 }, () => [crystal, 0]);

  const split = (
    crystal,
    refined,
    lastCrystal,
    lastRefined
  ) => [
    [crystal, refined],
    [crystal, refined],
    [crystal, refined],
    [crystal, refined],
    [lastCrystal, lastRefined]
  ];

  const COSTS = {
    furnace: {
      1: same(132),
      2: same(158),
      3: same(238),
      4: same(280),
      5: same(335),
      6: split(200, 10, 100, 20),
      7: split(240, 15, 120, 30),
      8: split(240, 20, 120, 40),
      9: split(280, 30, 140, 60),
      10: split(350, 70, 175, 140)
    },

    embassy: {
      1: same(33),
      2: same(39),
      3: same(59),
      4: same(70),
      5: same(83),
      6: split(50, 2, 25, 5),
      7: split(60, 3, 30, 7),
      8: split(60, 5, 30, 10),
      9: split(70, 7, 35, 15),
      10: split(87, 17, 43, 35)
    },

    command: {
      1: same(26),
      2: same(31),
      3: same(47),
      4: same(56),
      5: same(67),
      6: split(40, 2, 20, 4),
      7: split(48, 3, 24, 7),
      8: split(48, 4, 24, 8),
      9: split(56, 6, 28, 12),
      10: split(70, 14, 35, 28)
    },

    infantry: {
      1: same(59),
      2: same(71),
      3: same(107),
      4: same(126),
      5: same(150),
      6: split(90, 4, 45, 9),
      7: split(108, 6, 54, 13),
      8: split(108, 9, 54, 18),
      9: split(126, 13, 63, 27),
      10: split(157, 31, 78, 63)
    },

    academy: {
      2: same(71),
      3: same(107),
      4: same(126),
      5: same(150),
      6: split(90, 4, 45, 9),
      7: split(108, 6, 54, 13),
      8: split(108, 9, 54, 18),
      9: split(126, 13, 63, 27),
      10: split(157, 31, 78, 63)
    }
  };

  COSTS.infirmary = COSTS.command;
  COSTS.lancer = COSTS.infantry;
  COSTS.marksman = COSTS.infantry;

  const TROOP_RESOURCE_COSTS = {
    1: [23000000, 23000000, 4700000, 1100000, 90720],
    2: [25000000, 25000000, 5000000, 1200000, 116640],
    3: [27000000, 27000000, 5500000, 1300000, 142560],
    4: [28000000, 28000000, 5700000, 1400000, 155520],
    5: [29000000, 29000000, 5900000, 1400000, 181440],
    6: [33000000, 33000000, 6700000, 1600000, 194400],
    7: [38000000, 38000000, 7600000, 1900000, 233280],
    8: [46000000, 46000000, 9300000, 2300000, 259200],
    9: [50000000, 50000000, 10000000, 2500000, 168480],
    10: [59000000, 59000000, 11000000, 2900000, 259200]
  };

  const RESOURCE_COSTS = {
    furnace: {
      1: [67000000, 67000000, 13000000, 3300000, 604800],
      2: [72000000, 72000000, 14000000, 3600000, 777600],
      3: [79000000, 79000000, 15000000, 3900000, 950400],
      4: [82000000, 82000000, 16000000, 4100000, 1036800],
      5: [84000000, 84000000, 16000000, 4200000, 1209600],
      6: [96000000, 96000000, 19000000, 4800000, 1296000],
      7: [100000000, 100000000, 21000000, 5400000, 1555200],
      8: [130000000, 130000000, 26000000, 6600000, 1728000],
      9: [140000000, 140000000, 29000000, 7200000, 1123200],
      10: [160000000, 160000000, 33000000, 8400000, 1728000]
    },

    embassy: {
      1: [13000000, 13000000, 2700000, 670000, 399120],
      2: [14000000, 14000000, 2900000, 720000, 513180],
      3: [15000000, 15000000, 3100000, 790000, 627240],
      4: [16000000, 16000000, 3200000, 820000, 684240],
      5: [16000000, 16000000, 3300000, 840000, 798300],
      6: [19000000, 19000000, 3800000, 960000, 855360],
      7: [21000000, 21000000, 4300000, 1000000, 1026420],
      8: [26000000, 26000000, 5300000, 1300000, 1140480],
      9: [29000000, 29000000, 5800000, 1400000, 741300],
      10: [33000000, 33000000, 6700000, 1600000, 1140480]
    },

    command: {
      1: [20000000, 20000000, 4000000, 1000000, 72570],
      2: [21000000, 21000000, 4300000, 1000000, 93300],
      3: [23000000, 23000000, 4700000, 1100000, 114000],
      4: [24000000, 24000000, 4900000, 1200000, 124380],
      5: [25000000, 25000000, 5000000, 1200000, 145140],
      6: [29000000, 29000000, 5800000, 1400000, 155520],
      7: [32000000, 32000000, 6500000, 1600000, 186600],
      8: [39000000, 39000000, 7900000, 1900000, 207360],
      9: [43000000, 43000000, 8700000, 2100000, 134760],
      10: [50000000, 50000000, 10000000, 2500000, 207360]
    },

    infirmary: {
      1: [16000000, 16000000, 3300000, 840000, 84660],
      2: [18000000, 18000000, 3600000, 900000, 108840],
      3: [19000000, 19000000, 3900000, 990000, 133020],
      4: [20000000, 20000000, 4100000, 1000000, 145140],
      5: [21000000, 21000000, 4200000, 1000000, 169320],
      6: [24000000, 24000000, 4800000, 1200000, 181440],
      7: [27000000, 27000000, 5400000, 1300000, 217680],
      8: [33000000, 33000000, 6600000, 1600000, 241920],
      9: [36000000, 36000000, 7200000, 1800000, 157200],
      10: [42000000, 42000000, 8400000, 2100000, 241920]
    },

    infantry: TROOP_RESOURCE_COSTS,
    lancer: TROOP_RESOURCE_COSTS,
    marksman: TROOP_RESOURCE_COSTS,

    academy: {
      2: [36000000, 36000000, 7200000, 1800000, 155520],
      3: [39000000, 39000000, 7900000, 1900000, 190080],
      4: [41000000, 41000000, 8200000, 2000000, 207360],
      5: [42000000, 42000000, 8400000, 2100000, 241920],
      6: [48000000, 48000000, 9600000, 2400000, 259200],
      7: [54000000, 54000000, 10000000, 2700000, 311040],
      8: [66000000, 66000000, 13000000, 3300000, 345600],
      9: [72000000, 72000000, 14000000, 3600000, 224640],
      10: [84000000, 84000000, 16000000, 4200000, 345600]
    }
  };

   const LEVELS = [
    ["30-0", "Lv30"],
    ["30-1", "Lv30 1/5"],
    ["30-2", "Lv30 2/5"],
    ["30-3", "Lv30 3/5"],
    ["30-4", "Lv30 4/5"]
  ];

  for (let fc = 1; fc <= 9; fc += 1) {
    LEVELS.push([`${fc}-0`, `火晶Lv${fc}`]);

    for (let stage = 1; stage <= 4; stage += 1) {
      LEVELS.push([
        `${fc}-${stage}`,
        `火晶Lv${fc} ${stage}/5`
      ]);
    }
  }

  LEVELS.push(["10-0", "火晶Lv10"]);

  const LEVEL_BY_KEY = {};

  LEVELS.forEach((level, rank) => {
    LEVEL_BY_KEY[level[0]] = {
      key: level[0],
      label: level[1],
      rank
    };
  });

  const $ = id => document.getElementById(id);
  const buildingList = $("buildingList");

  const formatNumber = number =>
    number.toLocaleString("ja-JP");

  const trimDecimal = number =>
    Number(number.toFixed(2)).toString();

  function formatResource(number) {
    if (number >= 1000000000) {
      return `${trimDecimal(number / 1000000000)}B`;
    }

    if (number >= 1000000) {
      return `${trimDecimal(number / 1000000)}M`;
    }

    if (number >= 1000) {
      return `${trimDecimal(number / 1000)}K`;
    }

    return formatNumber(number);
  }

  function formatDuration(totalSeconds) {
    const seconds = Math.max(
      0,
      Math.round(totalSeconds)
    );

    if (seconds === 0) {
      return "0秒";
    }

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const restSeconds = seconds % 60;
    const parts = [];

    if (days > 0) parts.push(`${days}日`);
    if (hours > 0) parts.push(`${hours}時間`);
    if (minutes > 0) parts.push(`${minutes}分`);
    if (restSeconds > 0) parts.push(`${restSeconds}秒`);

    return parts.join("");
  }

  function getTimeMultiplier() {
    const buildingSpeed = Math.max(
      0,
      Number($("buildingSpeed").value) || 0
    );

    const hyenaBuff =
      Number($("hyenaBuff").value) || 0;

    const ministerBuff =
      $("ministerBuff").checked ? 15 : 0;

    const orderMultiplier =
      $("doubleTimeBuff").checked ? 0.8 : 1;

    return (
      orderMultiplier /
      (1 + (buildingSpeed + hyenaBuff + ministerBuff) / 100)
    );
  }

  function availableLevels(buildingId) {
    return buildingId === "academy"
      ? LEVELS.slice(5)
      : LEVELS;
  }

  function createOptions(levels, selectedKey) {
    return levels
      .map(level => {
        const selected =
          level[0] === selectedKey ? " selected" : "";

        return (
          `<option value="${level[0]}"${selected}>` +
          `${level[1]}</option>`
        );
      })
      .join("");
  }

  const STORAGE_KEY = "wos-fire-calc-settings-v2";

  function saveState() {
    const buildings = {};

    document
      .querySelectorAll(".building-card")
      .forEach(card => {
        buildings[card.dataset.building] = {
          checked:
            card.querySelector(".building-check").checked,
          current:
            card.querySelector(".current-level").value,
          target:
            card.querySelector(".target-level").value
        };
      });

    const state = {
      includeRequirements:
        $("includeRequirements").checked,
      buildingSpeed:
        $("buildingSpeed").value,
      hyenaBuff:
        $("hyenaBuff").value,
      ministerBuff:
        $("ministerBuff").checked,
      doubleTimeBuff:
        $("doubleTimeBuff").checked,
      buildings
    };

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      // 保存できない環境でも計算機はそのまま使用できます。
    }
  }

  function restoreState() {
    let state;

    try {
      state = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      );
    } catch (error) {
      state = null;
    }

    if (!state) return;

    $("includeRequirements").checked =
      state.includeRequirements !== false;

    $("buildingSpeed").value =
      state.buildingSpeed ?? "0";

    $("hyenaBuff").value =
      state.hyenaBuff ?? "0";

    $("ministerBuff").checked =
      Boolean(state.ministerBuff);

    $("doubleTimeBuff").checked =
      Boolean(state.doubleTimeBuff);

    document
      .querySelectorAll(".building-card")
      .forEach(card => {
        const saved =
          state.buildings?.[card.dataset.building];

        if (!saved) return;

        const currentSelect =
          card.querySelector(".current-level");

        const targetSelect =
          card.querySelector(".target-level");

        card.querySelector(".building-check").checked =
          Boolean(saved.checked);

        if (
          Array.from(currentSelect.options)
            .some(option => option.value === saved.current)
        ) {
          currentSelect.value = saved.current;
        }

        if (
          Array.from(targetSelect.options)
            .some(option => option.value === saved.target)
        ) {
          targetSelect.value = saved.target;
        }
      });
  }

   function renderBuildings() {
    buildingList.innerHTML = BUILDINGS
      .map(building => {
        const [id, name, rule] = building;
        const levels = availableLevels(id);
        const current = levels[0][0];
        const target = levels[levels.length - 1][0];

        return `
          <article
            class="building-card"
            data-building="${id}"
          >
            <div class="building-main">
              <input
                type="checkbox"
                class="building-check"
                aria-label="${name}を選択"
              >

              <img
                src="./${id}.PNG"
                class="building-image"
                alt="${name}"
              >

              <div class="building-information">
                <div class="building-name">
                  ${name}
                </div>

                <div class="building-rule">
                  ${rule}
                </div>
              </div>
            </div>

            <div class="building-controls">
              <div class="select-box">
                <label>現在</label>

                <select class="current-level">
                  ${createOptions(levels, current)}
                </select>
              </div>

              <div class="arrow">→</div>

              <div class="select-box">
                <label>目標</label>

                <select class="target-level">
                  ${createOptions(levels, target)}
                </select>
              </div>
            </div>

            <details class="details">
              <summary>必要素材の内訳</summary>

              <div class="detail-content">
                <p class="route-empty">
                  施設を選択してください
                </p>
              </div>
            </details>
          </article>
        `;
      })
      .join("");
  }

  function getStepCost(buildingId, destinationRank) {
    const fireLevel = Math.ceil(destinationRank / 5);
    const stage = (destinationRank - 1) % 5;

    const [crystal, refined] =
      COSTS[buildingId]?.[fireLevel]?.[stage] ||
      [0, 0];

    const [food, wood, coal, iron, seconds] =
      RESOURCE_COSTS[buildingId]?.[fireLevel] ||
      [0, 0, 0, 0, 0];

    return {
      crystal,
      refined,
      food,
      wood,
      coal,
      iron,
      seconds
    };
  }

  function calculateBuilding(
    buildingId,
    currentKey,
    targetKey
  ) {
    const currentRank =
      LEVEL_BY_KEY[currentKey].rank;

    const targetRank =
      LEVEL_BY_KEY[targetKey].rank;

    let crystal = 0;
    let refined = 0;
    let food = 0;
    let wood = 0;
    let coal = 0;
    let iron = 0;
    let baseSeconds = 0;
    let adjustedSeconds = 0;
    const rows = [];
    const timeMultiplier = getTimeMultiplier();

    if (targetRank <= currentRank) {
      return {
        crystal,
        refined,
        food,
        wood,
        coal,
        iron,
        baseSeconds,
        adjustedSeconds,
        rows
      };
    }

    for (
      let rank = currentRank + 1;
      rank <= targetRank;
      rank += 1
    ) {
      const step = getStepCost(buildingId, rank);

      const stepAdjustedSeconds = Math.ceil(
        step.seconds * timeMultiplier
      );

      crystal += step.crystal;
      refined += step.refined;
      food += step.food;
      wood += step.wood;
      coal += step.coal;
      iron += step.iron;
      baseSeconds += step.seconds;
      adjustedSeconds += stepAdjustedSeconds;

      rows.push({
        label: LEVELS[rank][1],
        ...step,
        adjustedSeconds: stepAdjustedSeconds
      });
    }

    return {
      crystal,
      refined,
      food,
      wood,
      coal,
      iron,
      baseSeconds,
      adjustedSeconds,
      rows
    };
  }

   function updateCalculation() {
    const cards = {};
    const effectiveTargets = {};
    const autoReasons = {};

    let manualCount = 0;
    let includedCount = 0;
    let totalCrystal = 0;
    let totalRefined = 0;
    let totalFood = 0;
    let totalWood = 0;
    let totalCoal = 0;
    let totalIron = 0;
    let totalBaseSeconds = 0;
    let totalAdjustedSeconds = 0;

    const routes = [];

    const requirementsEnabled =
      $("includeRequirements").checked;

    document
      .querySelectorAll(".building-card")
      .forEach(card => {
        const id = card.dataset.building;

        const checkbox =
          card.querySelector(".building-check");

        const currentSelect =
          card.querySelector(".current-level");

        const targetSelect =
          card.querySelector(".target-level");

        cards[id] = {
          card,
          checkbox,

          detail:
            card.querySelector(".detail-content"),

          currentKey:
            currentSelect.value,

          targetKey:
            targetSelect.value,

          currentRank:
            LEVEL_BY_KEY[currentSelect.value].rank,

          targetRank:
            LEVEL_BY_KEY[targetSelect.value].rank
        };

        card
          .querySelectorAll(".auto-badge")
          .forEach(badge => {
            badge.remove();
          });

        if (checkbox.checked) {
          manualCount += 1;

          effectiveTargets[id] =
            LEVEL_BY_KEY[targetSelect.value].rank;
        }
      });

    /*
      選択した施設が大溶鉱炉より高い場合、
      必要な大溶鉱炉を自動追加する
    */
    if (requirementsEnabled) {
      let requiredFurnaceRank = 0;

      BUILDINGS.forEach(building => {
        const id = building[0];

        if (
          id !== "furnace" &&
          cards[id].checkbox.checked
        ) {
          requiredFurnaceRank = Math.max(
            requiredFurnaceRank,
            cards[id].targetRank
          );
        }
      });

      if (
        requiredFurnaceRank >
        cards.furnace.currentRank
      ) {
        effectiveTargets.furnace = Math.max(
          effectiveTargets.furnace ||
            cards.furnace.currentRank,

          requiredFurnaceRank
        );

        if (!cards.furnace.checkbox.checked) {
          autoReasons.furnace =
            "選択施設の前提として自動追加";
        } else if (
          effectiveTargets.furnace >
          cards.furnace.targetRank
        ) {
          autoReasons.furnace =
            "選択施設に合わせて目標を自動調整";
        }
      }

      /*
        大溶鉱炉の前提として、
        1段階前の完成済み大使館を自動追加する
      */
      const furnaceTargetRank =
        effectiveTargets.furnace;

      if (
        typeof furnaceTargetRank === "number" &&
        furnaceTargetRank > 0
      ) {
        const requiredEmbassyRank =
          Math.floor(
            (furnaceTargetRank - 1) / 5
          ) * 5;

        if (
          requiredEmbassyRank >
          cards.embassy.currentRank
        ) {
          effectiveTargets.embassy = Math.max(
            effectiveTargets.embassy ||
              cards.embassy.currentRank,

            requiredEmbassyRank
          );

          if (!cards.embassy.checkbox.checked) {
            autoReasons.embassy =
              "大溶鉱炉の前提として自動追加";
          } else if (
            effectiveTargets.embassy >
            cards.embassy.targetRank
          ) {
            autoReasons.embassy =
              "大溶鉱炉に合わせて目標を自動調整";
          }
        }
      }
    }

      BUILDINGS.forEach(building => {
      const [id, name] = building;
      const state = cards[id];

      const manuallySelected =
        state.checkbox.checked;

      const targetRank =
        effectiveTargets[id];

      const included =
        manuallySelected ||
        typeof targetRank === "number";

      state.card.classList.toggle(
        "selected",
        included
      );

      if (!included) {
        state.detail.innerHTML = `
          <p class="route-empty">
            施設を選択してください
          </p>
        `;

        return;
      }

      includedCount += 1;

      const actualTargetRank =
        typeof targetRank === "number"
          ? targetRank
          : state.targetRank;

      const actualTargetKey =
        LEVELS[actualTargetRank][0];

      const result =
        calculateBuilding(
          id,
          state.currentKey,
          actualTargetKey
        );

      totalCrystal += result.crystal;
      totalRefined += result.refined;
      totalFood += result.food;
      totalWood += result.wood;
      totalCoal += result.coal;
      totalIron += result.iron;
      totalBaseSeconds += result.baseSeconds;
      totalAdjustedSeconds += result.adjustedSeconds;

      if (autoReasons[id]) {
        const badge =
          document.createElement("div");

        badge.className = "auto-badge";
        badge.textContent =
          autoReasons[id];

        state.card
          .querySelector(".details")
          .before(badge);
      }

      if (result.rows.length === 0) {
        state.detail.innerHTML = `
          <p class="route-empty">
            追加で必要な素材はありません
          </p>
        `;
      } else {
        const rows = result.rows
          .map(row => {
            const refinedText =
              row.refined > 0
                ? ` / 精錬 ${formatNumber(
                    row.refined
                  )}`
                : "";

            return `
              <div class="detail-row">

                <span>
                  ${row.label}
                </span>

                <span class="detail-values">
                  <span>
                    火晶 ${formatNumber(
                      row.crystal
                    )}
                    ${refinedText}
                  </span>

                  <span>
                    生肉 ${formatResource(row.food)}
                    / 木材 ${formatResource(row.wood)}
                    / 石炭 ${formatResource(row.coal)}
                    / 鉄鉱 ${formatResource(row.iron)}
                  </span>

                  <span>
                    初期 ${formatDuration(row.seconds)}
                    → バフ後 ${formatDuration(
                      row.adjustedSeconds
                    )}
                  </span>
                </span>

              </div>
            `;
          })
          .join("");

        state.detail.innerHTML = `
          ${rows}

          <div class="detail-row detail-total">

            <span>
              合計
            </span>

            <span class="detail-values">
              <span>
                火晶 ${formatNumber(result.crystal)}
                / 精錬 ${formatNumber(result.refined)}
              </span>

              <span>
                生肉 ${formatResource(result.food)}
                / 木材 ${formatResource(result.wood)}
                / 石炭 ${formatResource(result.coal)}
                / 鉄鉱 ${formatResource(result.iron)}
              </span>

              <span>
                初期 ${formatDuration(result.baseSeconds)}
                → バフ後 ${formatDuration(
                  result.adjustedSeconds
                )}
              </span>
            </span>

          </div>
        `;
      }

      const autoText =
        autoReasons[id]
          ? "（自動追加）"
          : "";

      routes.push(`
        <div class="route-item">

          <span>
            ${name}${autoText}
          </span>

          <span>
            ${LEVEL_BY_KEY[
              state.currentKey
            ].label}
            →
            ${LEVEL_BY_KEY[
              actualTargetKey
            ].label}
          </span>

        </div>
      `);
    });

      $("totalCrystal").textContent =
      formatNumber(totalCrystal);

    $("totalRefined").textContent =
      formatNumber(totalRefined);

    $("totalFood").textContent =
      formatResource(totalFood);

    $("totalWood").textContent =
      formatResource(totalWood);

    $("totalCoal").textContent =
      formatResource(totalCoal);

    $("totalIron").textContent =
      formatResource(totalIron);

    $("totalBaseTime").textContent =
      formatDuration(totalBaseSeconds);

    $("totalAdjustedTime").textContent =
      formatDuration(totalAdjustedSeconds);

    $("selectedCount").textContent =
      `${manualCount}施設選択中`;

    const autoCount =
      includedCount - manualCount;

    if (manualCount === 0) {
      $("calculationNote").textContent =
        "施設を選択してください";
    } else if (autoCount > 0) {
      $("calculationNote").textContent =
        `${manualCount}施設＋前提${autoCount}施設分の必要素材です`;
    } else {
      $("calculationNote").textContent =
        `${manualCount}施設分の必要素材です`;
    }

    $("routeList").innerHTML =
      routes.length > 0
        ? routes.join("")
        : `
          <p class="route-empty">
            施設を選択すると表示されます
          </p>
        `;
  }

  renderBuildings();
  restoreState();

  buildingList.addEventListener(
    "change",
    () => {
      saveState();
      updateCalculation();
    }
  );

  $("selectAllButton").addEventListener(
    "click",
    () => {
      document
        .querySelectorAll(".building-check")
        .forEach(checkbox => {
          checkbox.checked = true;
        });

      saveState();
      updateCalculation();
    }
  );

  $("clearAllButton").addEventListener(
    "click",
    () => {
      document
        .querySelectorAll(".building-check")
        .forEach(checkbox => {
          checkbox.checked = false;
        });

      saveState();
      updateCalculation();
    }
  );

  $("resetButton").addEventListener(
    "click",
    () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        // 保存できない環境でもリセットは実行します。
      }

      renderBuildings();
      $("includeRequirements").checked = true;
      $("buildingSpeed").value = "0";
      $("hyenaBuff").value = "0";
      $("ministerBuff").checked = false;
      $("doubleTimeBuff").checked = false;
      updateCalculation();
    }
  );

  $("shareButton").addEventListener(
    "click",
    () => {
      $("shareMessage").textContent =
        "共有機能は次のバージョンで追加予定です";

      window.setTimeout(() => {
        $("shareMessage").textContent = "";
      }, 2500);
    }
  );

  const settingIds = [
    "includeRequirements",
    "hyenaBuff",
    "ministerBuff",
    "doubleTimeBuff"
  ];

  settingIds.forEach(id => {
    $(id).addEventListener(
      "change",
      () => {
        saveState();
        updateCalculation();
      }
    );
  });

  $("buildingSpeed").addEventListener(
    "input",
    () => {
      saveState();
      updateCalculation();
    }
  );

  updateCalculation();
})();
