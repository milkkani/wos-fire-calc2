"use strict";

/* =========================================================
   ホワサバ 火晶建築計算機 Ver1.0
   Part 1 / 4
   建物情報・レベル情報・必要素材データ
========================================================= */

/*
  レベルの対応

  Lv30
  Lv30 1/5
  Lv30 2/5
  Lv30 3/5
  Lv30 4/5
  火晶1
  火晶1 1/5
  ...
  火晶9 4/5
  火晶10

  画像の「火晶1」の素材
  ＝ Lv30 から火晶1までの5段階分

  画像の「火晶10」の素材
  ＝ 火晶9から火晶10までの5段階分
*/


/* =========================================================
   共通関数
========================================================= */

/**
 * 1～4段階目と5段階目から、5段階分の素材データを作る
 */
function createFiveSteps(
  normalCrystal,
  normalRefined,
  finalCrystal = normalCrystal,
  finalRefined = normalRefined
) {
  return [
    { crystal: normalCrystal, refined: normalRefined },
    { crystal: normalCrystal, refined: normalRefined },
    { crystal: normalCrystal, refined: normalRefined },
    { crystal: normalCrystal, refined: normalRefined },
    { crystal: finalCrystal, refined: finalRefined }
  ];
}


/* =========================================================
   建物一覧
========================================================= */

const BUILDINGS = [
  {
    id: "furnace",
    name: "大溶鉱炉",
    costType: "furnace"
  },
  {
    id: "embassy",
    name: "大使館",
    costType: "embassy"
  },
  {
    id: "commandCenter",
    name: "司令部",
    costType: "commandMedical"
  },
  {
    id: "infirmary",
    name: "軍医所",
    costType: "commandMedical"
  },
  {
    id: "infantryCamp",
    name: "歩兵兵舎",
    costType: "troopCamp"
  },
  {
    id: "lancerCamp",
    name: "槍兵舎",
    costType: "troopCamp"
  },
  {
    id: "marksmanCamp",
    name: "射手兵舎",
    costType: "troopCamp"
  },
  {
    id: "warAcademy",
    name: "戦争学園",
    costType: "warAcademy"
  }
];


/* =========================================================
   必要素材データ

   配列番号が、画像の火晶レベルに対応する。

   COST_DATA.furnace[1]
   ＝ 画像の「火晶1」
   ＝ Lv30 → 火晶1

   COST_DATA.furnace[10]
   ＝ 画像の「火晶10」
   ＝ 火晶9 → 火晶10
========================================================= */

const COST_DATA = {
  /* -------------------------
     大溶鉱炉
  ------------------------- */
  furnace: {
    1: createFiveSteps(132, 0),
    2: createFiveSteps(158, 0),
    3: createFiveSteps(238, 0),
    4: createFiveSteps(280, 0),
    5: createFiveSteps(335, 0),

    6: createFiveSteps(200, 10, 100, 20),
    7: createFiveSteps(240, 15, 120, 30),
    8: createFiveSteps(240, 20, 120, 40),
    9: createFiveSteps(280, 30, 140, 60),
    10: createFiveSteps(350, 70, 175, 140)
  },


  /* -------------------------
     大使館
  ------------------------- */
  embassy: {
    1: createFiveSteps(33, 0),
    2: createFiveSteps(39, 0),
    3: createFiveSteps(59, 0),
    4: createFiveSteps(70, 0),
    5: createFiveSteps(83, 0),

    6: createFiveSteps(50, 2, 25, 5),
    7: createFiveSteps(60, 3, 30, 7),
    8: createFiveSteps(60, 5, 30, 10),
    9: createFiveSteps(70, 7, 35, 15),
    10: createFiveSteps(87, 17, 43, 35)
  },


  /* -------------------------
     司令部・軍医所
  ------------------------- */
  commandMedical: {
    1: createFiveSteps(26, 0),
    2: createFiveSteps(31, 0),
    3: createFiveSteps(47, 0),
    4: createFiveSteps(56, 0),
    5: createFiveSteps(67, 0),

    6: createFiveSteps(40, 2, 20, 4),
    7: createFiveSteps(48, 3, 24, 7),
    8: createFiveSteps(48, 4, 24, 8),
    9: createFiveSteps(56, 6, 28, 12),
    10: createFiveSteps(70, 14, 35, 28)
  },


  /* -------------------------
     各兵舎
  ------------------------- */
  troopCamp: {
    1: createFiveSteps(59, 0),
    2: createFiveSteps(71, 0),
    3: createFiveSteps(107, 0),
    4: createFiveSteps(126, 0),
    5: createFiveSteps(150, 0),

    6: createFiveSteps(90, 4, 45, 9),
    7: createFiveSteps(108, 6, 54, 13),
    8: createFiveSteps(108, 9, 54, 18),
    9: createFiveSteps(126, 13, 63, 27),
    10: createFiveSteps(157, 31, 78, 63)
  },


  /* -------------------------
     戦争学園

     戦争学園は画像上、火晶1の素材がないため、
     火晶1から火晶2へ上げる段階から計算対象。
  ------------------------- */
  warAcademy: {
    1: null,

    2: createFiveSteps(71, 0),
    3: createFiveSteps(107, 0),
    4: createFiveSteps(126, 0),
    5: createFiveSteps(150, 0),

    6: createFiveSteps(90, 4, 45, 9),
    7: createFiveSteps(108, 6, 54, 13),
    8: createFiveSteps(108, 9, 54, 18),
    9: createFiveSteps(126, 13, 63, 27),
    10: createFiveSteps(157, 31, 78, 63)
  }
};


/* =========================================================
   全レベル一覧を作成
========================================================= */

function createLevelList() {
  const levels = [];

  /*
    Lv30～Lv30 4/5
  */
  for (let stage = 0; stage <= 4; stage += 1) {
    levels.push({
      tier: 0,
      stage,
      label: stage === 0 ? "Lv30" : `Lv30 ${stage}/5`
    });
  }

  /*
    火晶1～火晶9は、それぞれ1/5～4/5まで存在
  */
  for (let tier = 1; tier <= 9; tier += 1) {
    for (let stage = 0; stage <= 4; stage += 1) {
      levels.push({
        tier,
        stage,
        label: stage === 0
          ? `火晶${tier}`
          : `火晶${tier} ${stage}/5`
      });
    }
  }

  /*
    火晶10には1/5以降がない
  */
  levels.push({
    tier: 10,
    stage: 0,
    label: "火晶10"
  });

  return levels;
}

const LEVELS = createLevelList();


/* =========================================================
   レベル変換用
========================================================= */

/**
 * 火晶レベルと途中段階から、LEVELS内の番号を取得
 */
function getLevelIndex(tier, stage = 0) {
  return LEVELS.findIndex(
    (level) => level.tier === tier && level.stage === stage
  );
}


/**
 * LEVELS内の番号からレベル情報を取得
 */
function getLevelByIndex(index) {
  return LEVELS[index] ?? null;
}


/**
 * 指定したレベルの表示名を取得
 */
function getLevelLabel(index) {
  const level = getLevelByIndex(index);
  return level ? level.label : "不明";
}


/**
 * 数値を3桁区切りにする
 */
function formatNumber(value) {
  return Number(value || 0).toLocaleString("ja-JP");
}
