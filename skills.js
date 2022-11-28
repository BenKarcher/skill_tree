const skills = {
    start: {
        name: "start",
        x: 0,
        y: 0,
        type: "",
        descriptions: [],
        preRecs: []
    },
    solid_body: { name: "Solid Body", x: 85, y: 0, type: "Martial: Body, Passive", descriptions: ["Passive: +5 HP", "Passive: +10+Con HP", "Passive: +15+2*Con HP", "Passive: Same and -1 damage from all sources "], preRecs: ["start"] },
    sprint: { name: "Sprint", x: -45, y: -35, type: "1 action movement", descriptions: ["1 action: move speed+5 distance, can only use once per turn and not combined with run.", "same except +10", "same except +10+5*dex", "same except can be split up between actions"], preRecs: ["start"] },
    dodge: { name: "Dodge", x: -90, y: 0, type: "1 reaction, Martial: agility", descriptions: ["1 reaction: add dex to DC against one small projectile you are aware of. Can not be used while grappled or prone", "same except dex+2", "same except dex+4 and against a volley of small projectiles", "same except against all projectiles this turn. \nPassive: add dex mod even when not dodging "], preRecs: ["sprint"] },
    fluid_stance: { name: "Fluid Stance", x: -80, y: -80, type: "1 reaction, Martial:agility", descriptions: ["1 reaction: use dex+2 instead of strength to defend against a incoming grapple, can not be used while grappled or prone", "same except dex+3 and same target can not grapple you again this turn", "same except dex+4 on success displace target one square", "same except on success of +5 you knock target prone and on crit may counter grapple"], preRecs: ["sprint"] },
    focus: { name: "Focus", x: 0, y: 55, type: "Passive", descriptions: ["when doing a check without time pressure you may reroll the first roll if it is sub 5", "same except sub 10", "same except 2 rolls sub 15", "same except 3 rolls and no upper bound on roll"], preRecs: ["start"] },
    rock_stance: { name: "Rock Stance", x: 120, y: 120, type: "1 reaction: Earth Bending", descriptions: ["1 reaction: add bending to AC against small rock projectiles, can not be used together with agility reactions", "Same except bending+2 against small or medium. On success, the projectile and all shrapnel is stopped from damaging things behind you", "Same except bending+3, also take no knock back from this projectile even if save fails", "Can now be used against any rock attack, even large attacks that normally can't be dodged, such as landslides. (In this case, roll contested bending instead of using AC)"], preRecs: ["solid_body"] },
    rock_throw: { name: "Rock Throw", x: 180, y: 120, type: "1 action: Earth bending", descriptions: ["1 action: stomp a small rock out of the ground in front of you.\n 1 action: launch a rock that is hovering in the air in front of you for a range of 40 feet bending vs AC with 1d4+bending damage.", "50 foot range, 1d4+2+bending damage", "50+5*bending foot range, bending d4 +bending damage, stomp now calls up two rocks", "1 action to fire a number of rocks up too you're bending that are in front of you"], preRecs: ["rock_stance"] },
    make_glove: { name: "Make Gloves", x: 240, y: 140, type: "1 action: Earth Bending: Martial: Dai Li", descriptions: ["1 action: make a single glove or shoe out of stone on a hand or foot that is not already wearing one", "Gloves get +1 to grapple and +1 to damage shoes get +1 to climb +2 to damage", "Make two items at once", "Make 4 items at once, also make one item as a free action once per turn"], preRecs: ["rock_throw"] },
    strike: { name: "Strike", x: 40, y: -80, type: "1 action Martial: Strength", descriptions: ["1 action, melee range: Str Vs AC, 1d4+Str damage. May not be used while prone or grappled", "Str mod+1 Vs AC, disadvantage if prone or grappled", "Str mod+2 Vs AC, May be used freely while grappled", "Str d4 damage. Also may be used as a reaction"], preRecs: ["start"] },
    bow_shot: { name: "Bow Shot", x: 20, y: -160, type: "1 action Martial: Weapon", descriptions: ["1 action: Bow mod+dex vs AC 1d6+1 damage, requires bow drawn", "1d6+3 damage", "1d6+3+dex damage", "pulling out and putting away bow takes no action"], preRecs: ["strike"] },
    range: { name: "Range", x: 40, y: -220, type: "Passive: Martial: Weapon", descriptions: ["range+10 to all bows", "range+20", "may shoot past max range at -1 mod per 10 feet", "You shoot a high ark hitting an enemy behind full cover from above. You may attack enemies behind full cover that are not shielded from above as if they had partial cover and were obscured."], preRecs: ["bow_shot"] },
    accuracy: { name: "Accuracy", x: -20, y: -220, type: "Passive: Martial: Weapon", descriptions: ["+2 to bow attack rolls", "also +1 per 20 feet below range", "if you know the location of an obscured target, you may take a -2 penalty instead of disadvantage", "Consecutive shots on same target without you moving give +2 mod"], preRecs: ["bow_shot"] },
    crit: { name: "Crit", x: -20, y: -280, type: "Passive: Martial: Weapon", descriptions: ["On Crit deal 2x damage", "Also on success of +5 roll an extra d6", "Roll an extra d6 per 5 over", "Do (n+1)times damage for every +10n success (so +10=2x, +20=3x...)"], preRecs: ["accuracy"] },
    launch_glove: { name: "Launch Glove", x: 310, y: 140, type: "1 action: Earth Bending: Martial: Dai Li", descriptions: ["1 action: launch a  glove or shoe 50 feet and do one of the following:\n Kick: Bending Vs AC 1d4+bending damage \n Punch: bending Vs AC 1d4 damage \n Grab: bending contested grapple, on success target restrained with escape DC 10+bending", "55 foot range, +2 damage to kick/punch, +2mod to grab", "kick now deals 2d4+2*bending, add 1 to all 3 hit mods", "Successful grapple of +5 now also knocks prone, on crit target is restrained to the nearest stone and can not recover from prone state until restraint is broken."], preRecs: ["make_glove"] },
    wall_run: { name: "Wall Run", x: 240, y: 210, type: "1 action: Earth Bending: Martial: Dai Li", descriptions: ["1 action: climb up or down 1 story on a smooth wall, can not stop on wall, requires two boots to use", "able to stop on wall and use gloves, but considered prone and at disadvantage for attacking", "Move two stories or horizontally on wall 1/2 movement speed", "Use any bending on wall at disadvantage, no longer prone, use gloves freely, movement may be split up"], preRecs: ["make_glove"] }
}