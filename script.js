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
    let totalCrystal = 0;
    let totalRefined = 0;
    let selected = 0;

    const routes = [];

    document
      .querySelectorAll(".building-card")
      .forEach(card => {
        const checkbox =
          card.querySelector(".building-check");

        const currentSelect =
          card.querySelector(".current-level");

        const targetSelect =
          card.querySelector(".target-level");

        const detail =
          card.querySelector(".detail-content");

        const buildingId =
          card.dataset.building;

        const building =
          BUILDINGS.find(item => item[0] === buildingId);

        const currentKey = currentSelect.value;
        const targetKey = targetSelect.value;

        card.classList.toggle(
          "selected",
          checkbox.checked
        );

        if (!checkbox.checked) {
          detail.innerHTML = `
            <p class="route-empty">
              施設を選択してください
            </p>
          `;
          return;
        }

        selected += 1;

        const result = calculateBuilding(
          buildingId,
          currentKey,
          targetKey
        );

        totalCrystal += result.crystal;
        totalRefined += result.refined;

        if (result.rows.length === 0) {
          detail.innerHTML = `
            <p class="route-empty">
              目標レベルを現在レベルより
              高くしてください
            </p>
          `;
        } else {
          const rows = result.rows
            .map(row => {
              const refinedText =
                row.refined > 0
                  ? ` / 精錬 ${formatNumber(row.refined)}`
                  : "";

              return `
                <div class="detail-row">
                  <span>${row.label}</span>

                  <span>
                    火晶 ${formatNumber(row.crystal)}
                    ${refinedText}
                  </span>
                </div>
              `;
            })
            .join("");

          detail.innerHTML = `
            ${rows}

            <div class="detail-row detail-total">
              <span>合計</span>

              <span>
                火晶 ${formatNumber(result.crystal)}
                /
                精錬 ${formatNumber(result.refined)}
              </span>
            </div>
          `;
        }

        routes.push(`
          <div class="route-item">
            <span>${building[1]}</span>

            <span>
              ${LEVEL_BY_KEY[currentKey].label}
              →
              ${LEVEL_BY_KEY[targetKey].label}
            </span>
          </div>
        `);
      });

    $("totalCrystal").textContent =
      formatNumber(totalCrystal);

    $("totalRefined").textContent =
      formatNumber(totalRefined);

    $("selectedCount").textContent =
      `${selected}施設選択中`;

    $("calculationNote").textContent =
      selected > 0
        ? `${selected}施設分の必要素材です`
        : "施設を選択してください";

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

  requirementSwitch.checked = false;
  requirementSwitch.disabled = true;

  updateCalculation();
})();
