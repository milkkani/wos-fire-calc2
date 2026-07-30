(() => {
  "use strict";

  const BUILDINGS = [
    ["furnace", "大溶鉱炉", "Lv30から火晶Lv10まで"],
    ["embassy", "大使館", "Lv30から火晶Lv10まで"],
    ["command", "司令部", "Lv30から火晶Lv10まで"],
    ["infirmary", "医務室", "Lv30から火晶Lv10まで"],
    ["infantry", "盾兵舎", "Lv30から火晶Lv10まで"],
    ["lancer", "槍兵舎", "Lv30から火晶Lv10まで"],
    ["marksman", "弓兵舎", "Lv30から火晶Lv10まで"],
    ["academy", "戦争学舎", "火晶Lv1から火晶Lv10まで"]
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

    return (
      COSTS[buildingId]?.[fireLevel]?.[stage] ||
      [0, 0]
    );
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
    const rows = [];

    if (targetRank <= currentRank) {
      return { crystal, refined, rows };
    }

    for (
      let rank = currentRank + 1;
      rank <= targetRank;
      rank += 1
    ) {
      const [stepCrystal, stepRefined] =
        getStepCost(buildingId, rank);

      crystal += stepCrystal;
      refined += stepRefined;

      rows.push({
        label: LEVELS[rank][1],
        crystal: stepCrystal,
        refined: stepRefined
      });
    }

    return { crystal, refined, rows };
  }

    function updateCalculation() {
    const cards = {};
    const effectiveTargets = {};
    const autoReasons = {};

    let manualCount = 0;
    let includedCount = 0;
    let totalCrystal = 0;
    let totalRefined = 0;

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

                <span>
                  火晶 ${formatNumber(
                    row.crystal
                  )}
                  ${refinedText}
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

            <span>
              火晶 ${formatNumber(
                result.crystal
              )}
              /
              精錬 ${formatNumber(
                result.refined
              )}
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

  buildingList.addEventListener(
    "change",
    updateCalculation
  );

  $("selectAllButton").addEventListener(
    "click",
    () => {
      document
        .querySelectorAll(".building-check")
        .forEach(checkbox => {
          checkbox.checked = true;
        });

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

      updateCalculation();
    }
  );

  $("resetButton").addEventListener(
    "click",
    () => {
      renderBuildings();
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

  const requirementSwitch =
  $("includeRequirements");

requirementSwitch.disabled = false;
requirementSwitch.checked = true;

requirementSwitch.addEventListener(
  "change",
  updateCalculation
);

updateCalculation();
})();
