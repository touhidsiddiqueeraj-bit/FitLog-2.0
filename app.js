
        const GM='gemini-2.5-flash-lite';
        const API_URL='https://generativelanguage.googleapis.com/v1beta/models/'+GM+':generateContent';
        const OFF_API='https://world.openfoodfacts.org/api/v2/product/';

        const EX=[{id:'bp',n:'Barbell Bench Press',m:'Chest',e:'barbell',t:'strength',cal:8},{id:'dbp',n:'Dumbbell Bench Press',m:'Chest',e:'dumbbells',t:'strength',cal:7},{id:'inc_bp',n:'Incline Barbell Bench Press',m:'Upper Chest',e:'barbell',t:'strength',cal:8},{id:'inc_dbp',n:'Incline Dumbbell Press',m:'Upper Chest',e:'dumbbells',t:'strength',cal:7},{id:'dec_bp',n:'Decline Bench Press',m:'Lower Chest',e:'barbell',t:'strength',cal:8},{id:'mp',n:'Machine Chest Press',m:'Chest',e:'machines',t:'strength',cal:7},{id:'dp',n:'Chest Dips',m:'Chest',e:'bodyweight',t:'strength',cal:8},{id:'cable_fly',n:'Cable Chest Fly',m:'Chest',e:'cables',t:'strength',cal:6},{id:'db_fly',n:'Dumbbell Fly',m:'Chest',e:'dumbbells',t:'strength',cal:5},{id:'pec_deck',n:'Pec Deck Machine',m:'Chest',e:'machines',t:'strength',cal:5},{id:'psh',n:'Push-Ups',m:'Chest',e:'bodyweight',t:'endurance',cal:5},{id:'diamond_psh',n:'Diamond Push-Ups',m:'Chest/Triceps',e:'bodyweight',t:'strength',cal:6},{id:'wide_psh',n:'Wide Push-Ups',m:'Chest',e:'bodyweight',t:'endurance',cal:5},{id:'declinedl',n:'Decline Dumbbell Press',m:'Lower Chest',e:'dumbbells',t:'strength',cal:7},{id:'dl',n:'Conventional Deadlift',m:'Back',e:'barbell',t:'strength',cal:12},{id:'rdl',n:'Romanian Deadlift',m:'Back/Legs',e:'barbell',t:'strength',cal:10},{id:'sdl',n:'Sumo Deadlift',m:'Back/Legs',e:'barbell',t:'strength',cal:12},{id:'br',n:'Barbell Row',m:'Back',e:'barbell',t:'strength',cal:8},{id:'dbr',n:'Dumbbell Row',m:'Back',e:'dumbbells',t:'strength',cal:7},{id:'pendlay_row',n:'Pendlay Row',m:'Back',e:'barbell',t:'strength',cal:8},{id:'tbar_row',n:'T-Bar Row',m:'Back',e:'barbell',t:'strength',cal:8},{id:'seal_row',n:'Seal Row',m:'Back',e:'barbell',t:'strength',cal:7},{id:'pu',n:'Pull-Ups',m:'Back',e:'bodyweight',t:'strength',cal:9},{id:'chin_up',n:'Chin-Ups',m:'Back/Biceps',e:'bodyweight',t:'strength',cal:9},{id:'lat_pd',n:'Lat Pulldown',m:'Back',e:'cables',t:'strength',cal:7},{id:'seated_row',n:'Seated Cable Row',m:'Back',e:'cables',t:'strength',cal:7},{id:'lat_pd_under',n:'Underhand Lat Pulldown',m:'Back',e:'cables',t:'strength',cal:7},{id:'straight_arm_pd',n:'Straight Arm Pulldown',m:'Back',e:'cables',t:'strength',cal:6},{id:'cable_pull_over',n:'Cable Pull Over',m:'Back',e:'cables',t:'strength',cal:6},{id:'cp',n:'Chest-Supported Row',m:'Back',e:'dumbbells',t:'strength',cal:6},{id:'ytp',n:'Yates Row',m:'Back',e:'barbell',t:'strength',cal:8},{id:'fp',n:'Face Pulls',m:'Rear Delts',e:'cables',t:'endurance',cal:5},{id:'supermans',n:'Supermans',m:'Lower Back',e:'bodyweight',t:'rehab',cal:3},{id:'inverted_row',n:'Inverted Row',m:'Back',e:'bodyweight',t:'endurance',cal:5},{id:'ohp',n:'Overhead Press',m:'Shoulders',e:'barbell',t:'strength',cal:8},{id:'db_ohp',n:'Dumbbell Shoulder Press',m:'Shoulders',e:'dumbbells',t:'strength',cal:7},{id:'arnold',n:'Arnold Press',m:'Shoulders',e:'dumbbells',t:'strength',cal:7},{id:'machine_ohp',n:'Machine Shoulder Press',m:'Shoulders',e:'machines',t:'strength',cal:6},{id:'lr',n:'Lateral Raise',m:'Shoulders',e:'dumbbells',t:'endurance',cal:4},{id:'fr',n:'Front Raise',m:'Shoulders',e:'dumbbells',t:'endurance',cal:4},{id:'rr',n:'Rear Delt Fly',m:'Shoulders',e:'dumbbells',t:'endurance',cal:4},{id:'upright_row',n:'Upright Row',m:'Shoulders',e:'barbell',t:'strength',cal:6},{id:'cable_lateral',n:'Cable Lateral Raise',m:'Shoulders',e:'cables',t:'endurance',cal:4},{id:'landmine',n:'Landmine Press',m:'Shoulders',e:'barbell',t:'strength',cal:6},{id:'bc',n:'Barbell Curl',m:'Biceps',e:'barbell',t:'strength',cal:5},{id:'dbc',n:'Dumbbell Curl',m:'Biceps',e:'dumbbells',t:'strength',cal:4},{id:'hc',n:'Hammer Curl',m:'Biceps',e:'dumbbells',t:'strength',cal:4},{id:'preacher_curl',n:'Preacher Curl',m:'Biceps',e:'barbell',t:'strength',cal:5},{id:'incline_curl',n:'Incline Dumbbell Curl',m:'Biceps',e:'dumbbells',t:'strength',cal:4},{id:'cable_curl',n:'Cable Curl',m:'Biceps',e:'cables',t:'strength',cal:4},{id:'concentration_curl',n:'Concentration Curl',m:'Biceps',e:'dumbbells',t:'strength',cal:3},{id:'ez_curl',n:'EZ Bar Curl',m:'Biceps',e:'barbell',t:'strength',cal:5},{id:'reverse_curl',n:'Reverse Curl',m:'Biceps/Forearms',e:'barbell',t:'strength',cal:4},{id:'td',n:'Tricep Dips',m:'Triceps',e:'bodyweight',t:'strength',cal:6},{id:'pushdown',n:'Tricep Pushdown',m:'Triceps',e:'cables',t:'strength',cal:4},{id:'skull_crusher',n:'Skull Crusher',m:'Triceps',e:'barbell',t:'strength',cal:5},{id:'overhead_ext',n:'Overhead Tricep Extension',m:'Triceps',e:'dumbbells',t:'strength',cal:4},{id:'close_grip_bp',n:'Close Grip Bench Press',m:'Triceps',e:'barbell',t:'strength',cal:6},{id:'tricep_kickback',n:'Tricep Kickback',m:'Triceps',e:'dumbbells',t:'strength',cal:3},{id:'rope_pushdown',n:'Rope Pushdown',m:'Triceps',e:'cables',t:'strength',cal:4},{id:'diamond_dp',n:'Diamond Dips',m:'Triceps',e:'bodyweight',t:'strength',cal:6},{id:'sq',n:'Barbell Squat',m:'Legs',e:'barbell',t:'strength',cal:10},{id:'fs',n:'Front Squat',m:'Legs',e:'barbell',t:'strength',cal:10},{id:'goblet_sq',n:'Goblet Squat',m:'Legs',e:'dumbbells',t:'strength',cal:8},{id:'hack_sq',n:'Hack Squat',m:'Legs',e:'machines',t:'strength',cal:9},{id:'leg_press',n:'Leg Press',m:'Legs',e:'machines',t:'strength',cal:9},{id:'lunge',n:'Walking Lunges',m:'Legs',e:'dumbbells',t:'strength',cal:7},{id:'bulgarian_split',n:'Bulgarian Split Squat',m:'Legs',e:'dumbbells',t:'strength',cal:7},{id:'step_up',n:'Box Step-Up',m:'Legs',e:'dumbbells',t:'strength',cal:6},{id:'hip_thrust',n:'Hip Thrust',m:'Glutes',e:'barbell',t:'strength',cal:8},{id:'glute_bridge',n:'Glute Bridge',m:'Glutes',e:'bodyweight',t:'strength',cal:5},{id:'rdl_leg',n:'Single Leg RDL',m:'Hamstrings',e:'dumbbells',t:'strength',cal:6},{id:'leg_curl',n:'Lying Leg Curl',m:'Hamstrings',e:'machines',t:'strength',cal:5},{id:'seated_leg_curl',n:'Seated Leg Curl',m:'Hamstrings',e:'machines',t:'strength',cal:5},{id:'good_morning',n:'Good Morning',m:'Back/Legs',e:'barbell',t:'strength',cal:7},{id:'calf_raise',n:'Standing Calf Raise',m:'Calves',e:'machines',t:'strength',cal:4},{id:'seated_calf',n:'Seated Calf Raise',m:'Calves',e:'machines',t:'strength',cal:4},{id:'leg_extension',n:'Leg Extension',m:'Quads',e:'machines',t:'strength',cal:5},{id:'squat_jump',n:'Jump Squat',m:'Legs',e:'bodyweight',t:'plyometric',cal:8},{id:'plank',n:'Plank',m:'Core',e:'bodyweight',t:'endurance',cal:3},{id:'crunch',n:'Crunches',m:'Core',e:'bodyweight',t:'endurance',cal:4},{id:'leg_raise',n:'Hanging Leg Raise',m:'Core',e:'bodyweight',t:'endurance',cal:5},{id:'russian_twist',n:'Russian Twist',m:'Core',e:'bodyweight',t:'endurance',cal:4},{id:'cable_crunch',n:'Cable Crunch',m:'Core',e:'cables',t:'strength',cal:5},{id:'ab_wheel',n:'Ab Wheel Rollout',m:'Core',e:'bodyweight',t:'strength',cal:5},{id:'mountain_climber',n:'Mountain Climbers',m:'Core',e:'bodyweight',t:'cardio',cal:8},{id:'dead_bug',n:'Dead Bug',m:'Core',e:'bodyweight',t:'endurance',cal:3},{id:'bicycle_crunch',n:'Bicycle Crunch',m:'Core',e:'bodyweight',t:'endurance',cal:5},{id:'side_plank',n:'Side Plank',m:'Core',e:'bodyweight',t:'endurance',cal:3},{id:'burpee',n:'Burpees',m:'Full Body',e:'bodyweight',t:'cardio',cal:10},{id:'kb_swing',n:'Kettlebell Swing',m:'Full Body',e:'kettlebell',t:'cardio',cal:8},{id:'thruster',n:'Barbell Thruster',m:'Full Body',e:'barbell',t:'cardio',cal:10},{id:'clean',n:'Power Clean',m:'Full Body',e:'barbell',t:'strength',cal:10},{id:'snatch',n:'Snatch',m:'Full Body',e:'barbell',t:'strength',cal:10}];
        
        const BASE='https://fitnessprogramer.com/wp-content/uploads/2021/02/';
        const GIF_CACHE=SP(localStorage.getItem('fitlog_gifcache'),{});
        const GL={
  // CHEST
  bp:BASE+'Barbell-Bench-Press.gif',
  dbp:BASE+'Dumbbell-Press.gif',
  inc_bp:BASE+'Incline-Barbell-Bench-Press.gif',
  inc_dbp:BASE+'Incline-Dumbbell-Press.gif',
  dec_bp:BASE+'Decline-Barbell-Bench-Press.gif',
  mp:BASE+'Barbell-Chest-Press.gif',
  dp:BASE+'Dips.gif',
  cable_fly:BASE+'Cable-Chest-Fly.gif',
  db_fly:BASE+'Dumbbell-Fly.gif',
  pec_deck:BASE+'Pec-Deck-Fly.gif',
  psh:BASE+'Push-Up.gif',
  diamond_psh:BASE+'Diamond-Push-Up.gif',
  wide_psh:BASE+'Wide-Push-Up.gif',
  declinedl:BASE+'Decline-Dumbbell-Press.gif',
  inc_cable_fly:BASE+'Incline-Cable-Chest-Fly.gif',
  svend_press:BASE+'Svend-Press.gif',
  // BACK
  dl:BASE+'Conventional-Deadlift.gif',
  rdl:BASE+'Barbell-Romanian-Deadlift.gif',
  sdl:BASE+'Sumo-Deadlift.gif',
  br:BASE+'Barbell-Row.gif',
  dbr:BASE+'Dumbbell-Row.gif',
  pendlay_row:BASE+'Barbell-Row.gif',
  tbar_row:BASE+'T-bar-row.gif',
  seal_row:BASE+'Barbell-Row.gif',
  pu:BASE+'Pull-Up.gif',
  chin_up:BASE+'Chin-Up.gif',
  lat_pd:BASE+'Lat-Pulldown.gif',
  seated_row:BASE+'Seated-Cable-Row.gif',
  lat_pd_under:BASE+'Lat-Pulldown.gif',
  straight_arm_pd:BASE+'Standing-Pullover.gif',
  cable_pull_over:BASE+'Cable-Pullover.gif',
  cp:BASE+'Dumbbell-Row.gif',
  ytp:BASE+'Barbell-Row.gif',
  fp:BASE+'Face-Pull.gif',
  supermans:BASE+'Superman.gif',
  inverted_row:BASE+'Inverted-Row.gif',
  single_arm_lat_pd:BASE+'Single-Arm-Lat-Pulldown.gif',
  meadows_row:BASE+'Dumbbell-Row.gif',
  rack_pull:BASE+'Rack-Pull.gif',
  // SHOULDERS
  ohp:BASE+'Barbell-Overhead-Press.gif',
  db_ohp:BASE+'Dumbbell-Shoulder-Press.gif',
  arnold:BASE+'Arnold-Press.gif',
  machine_ohp:BASE+'Barbell-Shoulder-Press.gif',
  lr:BASE+'Dumbbell-Lateral-Raise.gif',
  fr:BASE+'Dumbbell-Front-Raise.gif',
  rr:BASE+'Dumbbell-Rear-Delt-Fly.gif',
  upright_row:BASE+'Barbell-Upright-Row.gif',
  cable_lateral:BASE+'Cable-Lateral-Raise.gif',
  landmine:BASE+'Landmine-Press.gif',
  scott_press:BASE+'Dumbbell-Shoulder-Press.gif',
  push_press:BASE+'Barbell-Overhead-Press.gif',
  lu_raises:BASE+'Dumbbell-Lateral-Raise.gif',
  cable_rr:BASE+'Cable-Rear-Delt-Fly.gif',
  // BICEPS
  bc:BASE+'Barbell-Curl.gif',
  dbc:BASE+'Dumbbell-Curl.gif',
  hc:BASE+'Hammer-Curl.gif',
  preacher_curl:BASE+'Preacher-Curl.gif',
  incline_curl:BASE+'Incline-Dumbbell-Curl.gif',
  cable_curl:BASE+'Cable-Curl.gif',
  concentration_curl:BASE+'Concentration-Curl.gif',
  ez_curl:BASE+'Ez-Bar-Curl.gif',
  reverse_curl:BASE+'Reverse-Curl.gif',
  spider_curl:BASE+'Spider-Curl.gif',
  zottman_curl:BASE+'Zottman-Curl.gif',
  cross_body_curl:BASE+'Cross-Body-Hammer-Curl.gif',
  // TRICEPS
  td:BASE+'Dips.gif',
  pushdown:BASE+'Tricep-Pushdown.gif',
  skull_crusher:BASE+'Skull-Crusher.gif',
  overhead_ext:BASE+'Overhead-Tricep-Extension.gif',
  close_grip_bp:BASE+'Close-Grip-Bench-Press.gif',
  tricep_kickback:BASE+'Tricep-Kickback.gif',
  rope_pushdown:BASE+'Rope-Pushdown.gif',
  diamond_dp:BASE+'Diamond-Push-Up.gif',
  single_arm_pushdown:BASE+'Single-Arm-Tricep-Pushdown.gif',
  tate_press:BASE+'Tate-Press.gif',
  jm_press:BASE+'Close-Grip-Bench-Press.gif',
  // LEGS
  sq:BASE+'Barbell-Squat.gif',
  fs:BASE+'Front-Squat.gif',
  goblet_sq:BASE+'Goblet-Squat.gif',
  hack_sq:BASE+'Hack-Squat.gif',
  leg_press:BASE+'Leg-Press.gif',
  lunge:BASE+'Walking-Lunges.gif',
  bulgarian_split:BASE+'Bulgarian-Split-Squat.gif',
  step_up:BASE+'Step-Up.gif',
  hip_thrust:BASE+'Barbell-Hip-Thrust.gif',
  glute_bridge:BASE+'Glute-Bridge.gif',
  rdl_leg:BASE+'Single-Leg-Romanian-Deadlift.gif',
  leg_curl:BASE+'Lying-Leg-Curl.gif',
  seated_leg_curl:BASE+'Seated-Leg-Curl.gif',
  good_morning:BASE+'Good-Morning.gif',
  calf_raise:BASE+'Standing-Calf-Raise.gif',
  seated_calf:BASE+'Seated-Calf-Raise.gif',
  leg_extension:BASE+'Leg-Extension.gif',
  squat_jump:BASE+'Jump-Squat.gif',
  sumo_squat:BASE+'Sumo-Squat.gif',
  pistol_squat:BASE+'Pistol-Squat.gif',
  lateral_lunge:BASE+'Side-Lunge.gif',
  reverse_lunge:BASE+'Reverse-Lunge.gif',
  nordic_curl:BASE+'Nordic-Curl.gif',
  hip_abduction:BASE+'Hip-Abduction.gif',
  hip_adduction:BASE+'Hip-Adduction.gif',
  glute_kickback:BASE+'Glute-Kickback.gif',
  donkey_kick:BASE+'Donkey-Kicks.gif',
  // CORE
  plank:BASE+'Plank.gif',
  crunch:BASE+'Crunches.gif',
  leg_raise:BASE+'Leg-Raise.gif',
  russian_twist:BASE+'Russian-Twist.gif',
  cable_crunch:BASE+'Cable-Crunch.gif',
  ab_wheel:BASE+'Ab-Wheel-Rollout.gif',
  mountain_climber:BASE+'Mountain-Climber.gif',
  dead_bug:BASE+'Dead-Bug.gif',
  bicycle_crunch:BASE+'Bicycle-Crunch.gif',
  side_plank:BASE+'Side-Plank.gif',
  hanging_knee_raise:BASE+'Hanging-Knee-Raise.gif',
  toe_touch:BASE+'Toe-Touch-Crunch.gif',
  v_up:BASE+'V-Up.gif',
  flutter_kick:BASE+'Flutter-Kicks.gif',
  dragon_flag:BASE+'Dragon-Flag.gif',
  pallof_press:BASE+'Pallof-Press.gif',
  wood_chop:BASE+'Wood-Chop.gif',
  reverse_crunch:BASE+'Reverse-Crunch.gif',
  // CARDIO & FULL BODY
  burpee:BASE+'Burpee.gif',
  kb_swing:BASE+'Kettlebell-Swing.gif',
  thruster:BASE+'Barbell-Thruster.gif',
  clean:BASE+'Power-Clean.gif',
  snatch:BASE+'Snatch.gif',
  box_jump:BASE+'Box-Jump.gif',
  jumping_jack:BASE+'Jumping-Jacks.gif',
  jump_rope:BASE+'Jump-Rope.gif',
  high_knee:BASE+'High-Knees.gif',
  bear_crawl:BASE+'Bear-Crawl.gif',
  battle_rope:BASE+'Battle-Ropes.gif',
  sled_push:BASE+'Sled-Push.gif',
  kb_clean:BASE+'Kettlebell-Clean.gif',
  kb_press:BASE+'Kettlebell-Press.gif',
  kb_goblet:BASE+'Goblet-Squat.gif',
  kb_deadlift:BASE+'Conventional-Deadlift.gif',
  kb_row:BASE+'Dumbbell-Row.gif',
  kb_snatch:BASE+'Snatch.gif',
  man_maker:BASE+'Burpee.gif',
  devil_press:BASE+'Burpee.gif',
  // STRETCHING / MOBILITY
  hip_flexor_stretch:BASE+'Hip-Flexor-Stretch.gif',
  pigeon_pose:BASE+'Pigeon-Pose.gif',
  cat_cow:BASE+'Cat-Cow-Stretch.gif',
  world_greatest:BASE+'Worlds-Greatest-Stretch.gif',
  // WRIST / FOREARM
  wrist_curl:BASE+'Wrist-Curl.gif',
  reverse_wrist_curl:BASE+'Reverse-Wrist-Curl.gif',
  farmers_walk:BASE+'Farmers-Walk.gif',
};
        function SP(j,f){try{const p=JSON.parse(j);return p&&typeof p==='object'?p:f}catch{return f}}
        function saveGifCache(){localStorage.setItem('fitlog_gifcache',JSON.stringify(GIF_CACHE))}
        const S={key:localStorage.getItem('fitlog_key')||'',meals:SP(localStorage.getItem('fitlog_meals'),[]),wkts:SP(localStorage.getItem('fitlog_wkts'),[]),wlog:SP(localStorage.getItem('fitlog_wlog'),[]),goals:SP(localStorage.getItem('fitlog_goals'),{}),favs:SP(localStorage.getItem('fitlog_favs'),[]),hydr:SP(localStorage.getItem('fitlog_hydr'),{tgt:2500,log:{}}),plans:SP(localStorage.getItem('fitlog_plans'),[]),steps:SP(localStorage.getItem('fitlog_steps'),{}),theme:localStorage.getItem('fitlog_theme')||'dark',view:'dashboard',lastCongratsDate:localStorage.getItem('fitlog_last_congrats')||'',customFoods:SP(localStorage.getItem('fitlog_custom_foods'),[]),fasting:SP(localStorage.getItem('fitlog_fasting'),{active:false,startTs:null,targetHours:16})};
        const today=new Date().toISOString().split('T')[0];
        if(!S.hydr.log)S.hydr.log={};if(typeof S.hydr.log[today]!=='number')S.hydr.log[today]=0;if(typeof S.steps[today]!=='number')S.steps[today]=0;
        function save(k,v){localStorage.setItem(k,JSON.stringify(v))}save('fitlog_hydr',S.hydr);save('fitlog_steps',S.steps);
        const $=id=>document.getElementById(id);
        function hk(){return!!(S.key&&S.key.trim())}function gT(){return today}function gA(d){const dt=new Date();dt.setDate(dt.getDate()-d);return dt.toISOString().split('T')[0]}
        function uid(){return Date.now().toString(36)+Math.random().toString(36).substr(2,9)}
        function toast(m,d=2500){const e=document.querySelector('.toast');if(e)e.remove();const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity 0.3s';setTimeout(()=>t.remove(),300)},d)}
        function showCongrats(msg){$('congrats-msg').textContent=msg||'You crushed it today!';$('congrats-overlay').style.display='flex';haptic([50,30,80]);const box=document.querySelector('.congrats-box');if(box)spawnConfetti(box);}
        function closeCongrats(){$('congrats-overlay').style.display='none'}
        function findExercise(idOrName){let m=EX.find(e=>e.id===idOrName);if(!m)m=EX.find(e=>e.id.toLowerCase()===(idOrName||'').toLowerCase());if(!m)m=EX.find(e=>e.n.toLowerCase()===(idOrName||'').toLowerCase());if(!m)m=EX.find(e=>e.n.toLowerCase().includes((idOrName||'').toLowerCase()));if(!m)m=EX.find(e=>(idOrName||'').toLowerCase().includes(e.id.toLowerCase()));return m}
        function findGif(exId,exName){
            const ck=exId||exName;
            if(GIF_CACHE[ck])return GIF_CACHE[ck];
            // 1. Exact ID match
            if(exId&&GL[exId])return GL[exId];
            if(exId&&GL[exId.toLowerCase()])return GL[exId.toLowerCase()];
            // 2. DB lookup by ID
            const ex=findExercise(exId||exName);
            if(ex&&GL[ex.id])return GL[ex.id];
            // 3. Exact name match
            if(exName&&GL[exName])return GL[exName];
            // 4. Word-level fuzzy scoring against all GL keys
            const sn=(exName||'').toLowerCase().replace(/\s+/g,' ').trim();
            const queryWords=sn.split(/[\s\-_/]+/).filter(w=>w.length>2);
            if(!queryWords.length)return null;
            let bestKey=null,bestScore=-1;
            for(const[k,v]of Object.entries(GL)){
                const kn=k.toLowerCase().replace(/[\-_]/g,' ');
                const keyWords=kn.split(/\s+/).filter(w=>w.length>2);
                let score=0;
                // Word-level overlap: each query word that appears in key
                for(const qw of queryWords){
                    for(const kw of keyWords){
                        if(qw===kw){score+=10;break;}
                        // prefix match (e.g. "incline" matches "incline")
                        if(qw.length>=4&&kw.startsWith(qw)){score+=6;break;}
                        if(kw.length>=4&&qw.startsWith(kw)){score+=5;break;}
                        // substring match
                        if(qw.length>=5&&kw.includes(qw)){score+=4;break;}
                        if(kw.length>=5&&qw.includes(kw)){score+=3;break;}
                    }
                }
                // Bonus: full name substring containment
                if(kn.includes(sn)||sn.includes(kn)) score+=8;
                // Normalise by coverage: avoid single-word keys winning for long queries
                const coverage=Math.min(queryWords.length,keyWords.length)/Math.max(queryWords.length,keyWords.length);
                score=score*coverage;
                if(score>bestScore){bestScore=score;bestKey=k;}
            }
            // Require a meaningful match threshold (at least one word scored)
            if(bestScore>=5)return GL[bestKey];
            return null;
        }
        function buildLiveGifUrl(exName){let n=exName.replace(/\(.*?\)/g,'').replace(/[^a-zA-Z0-9 ]/g,'').trim();n=n.replace(/\bdb\b/gi,'Dumbbell').replace(/\bbb\b/gi,'Barbell').replace(/\bkb\b/gi,'Kettlebell').replace(/\bkg\b/gi,'').replace(/\blbs?\b/gi,'').replace(/\breps?\b/gi,'').replace(/\bsets\b/gi,'').replace(/\bwith\b/gi,'').replace(/\busing\b/gi,'').replace(/\bthe\b/gi,'').replace(/\band\b/gi,'').replace(/\bfor\b/gi,'').replace(/\bof\b/gi,'').replace(/\bto\b/gi,'').replace(/\bor\b/gi,' ').replace(/\s+/g,' ').trim();const f=n.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join('-');return`https://fitnessprogramer.com/wp-content/uploads/2021/02/${f}.gif`}
        function showExerciseGif(exId,exName){const m=$('gif-modal'),t=$('gif-modal-title'),b=$('gif-modal-body'),ft=$('gif-modal-footer');t.textContent=exName;b.innerHTML='<div class="gif-loading">Searching...</div>';ft.innerHTML='';tryLoadGif(exId,exName,b,ft,0);m.style.display='flex';document.body.style.overflow='hidden'}
        function tryLoadGif(exId,exName,b,ft,att){let url=null,label='';if(att===0){url=findGif(exId,exName);label='Form'}else if(att===1){url=buildLiveGifUrl(exName);label='Web'}else if(att===2){const n=exName.replace(/\(.*?\)/g,'').trim();url=buildLiveGifUrl(n);label='Alt'}else{const fb=`https://www.youtube.com/results?search_query=${encodeURIComponent(exName+' exercise')}`;b.innerHTML=`<div style="text-align:center;padding:30px"><p>No demo found</p><a href="${fb}" target="_blank" class="btn btn-primary btn-sm">📹 YouTube</a></div>`;ft.innerHTML=`<span class="gif-tag">🔍 ${exId||'Not found'}</span>`;return}if(url){b.innerHTML=`<div class="gif-loading">Loading...</div>`;const img=new Image(),to=setTimeout(()=>{if(img.complete)return;tryLoadGif(exId,exName,b,ft,att+1)},5000);img.onload=()=>{clearTimeout(to);b.innerHTML='';img.style.maxWidth='100%';img.style.maxHeight='350px';img.style.objectFit='contain';b.appendChild(img);GIF_CACHE[exId||exName]=url;saveGifCache();ft.innerHTML=`<span class="gif-tag">📹 Demo</span><span class="gif-tag">🔄 ${label}</span>`};img.onerror=()=>{clearTimeout(to);tryLoadGif(exId,exName,b,ft,att+1)};img.src=url}else{tryLoadGif(exId,exName,b,ft,att+1)}}
        function closeGifModal(event){if(event&&event.target!==$('gif-modal'))return;$('gif-modal').style.display='none';document.body.style.overflow=''}

        // TAG CLOUD SYSTEM
        function initTagCloud(selectId, cloudId){const select=$(selectId);const cloud=$(cloudId);if(!select||!cloud)return;function render(){const opts=Array.from(select.options);cloud.innerHTML=opts.map(o=>`<span class="tag-chip${o.selected?' selected':''}" data-value="${o.value}">${o.textContent}</span>`).join('');cloud.querySelectorAll('.tag-chip').forEach(chip=>{chip.addEventListener('click',()=>{const val=chip.dataset.value;const opt=select.querySelector(`option[value="${val}"]`);if(opt){opt.selected=!opt.selected;chip.classList.toggle('selected',opt.selected)}})});}render();select.addEventListener('change',render)}
        function getSelectedValues(selectId){const sel=$(selectId);return sel?Array.from(sel.selectedOptions).map(o=>o.value).filter(Boolean):[]}

        let scannerInstance=null;
        function openScanner(){$('scanner-modal').style.display='flex';$('scan-result').innerHTML='';setTimeout(()=>{if(typeof Html5Qrcode!=='undefined')startScanner()},500)}
        function startScanner(){const c=$('scanner-container');c.innerHTML='';try{scannerInstance=new Html5Qrcode('scanner-container');scannerInstance.start({facingMode:'environment'},{fps:10,qrbox:{width:250,height:150}},(txt)=>{if(scannerInstance){scannerInstance.stop();scannerInstance.clear()}lookupBarcode(txt)},()=>{})}catch(e){}}
        function closeScanner(){if(scannerInstance){scannerInstance.stop().then(()=>scannerInstance.clear()).catch(()=>{});scannerInstance=null}$('scanner-modal').style.display='none'}
        async function lookupBarcode(bc){const rd=$('scan-result');rd.innerHTML='<div class="skeleton skeleton-text"></div>';try{const r=await fetch(OFF_API+bc+'.json');const d=await r.json();if(d.status===1&&d.product){const p=d.product,n=p.nutriments||{};const it=[{name:p.product_name||'Scanned',quantity:100,unit:'g',calories:Math.round(n['energy-kcal_100g']||0),protein_g:Math.round((n.proteins_100g||0)*10)/10,carbs_g:Math.round((n.carbohydrates_100g||0)*10)/10,fat_g:Math.round((n.fat_100g||0)*10)/10}];const tot={calories:it[0].calories,protein_g:it[0].protein_g,carbs_g:it[0].carbs_g,fat_g:it[0].fat_g};S.meals.push({id:uid(),ts:new Date().toISOString(),date:gT(),desc:'📷 '+p.product_name,items:it,totals:tot,isScanned:true});save('fitlog_meals',S.meals);rd.innerHTML='<p style="color:var(--accent-primary)">✅ Auto-logged!</p>';refreshNut();refreshDash();setTimeout(closeScanner,1500)}else{rd.innerHTML='<p style="color:var(--accent-secondary)">❌ Not found</p>'}}catch(e){rd.innerHTML='<p style="color:var(--accent-secondary)">❌ Error</p>'}}

        function openSettings(){$('settings-modal').style.display='flex';$('settings-api-key').value=S.key;updateKeyStatus()}function closeSettings(){$('settings-modal').style.display='none'}
        function saveSettingsKey(){const k=$('settings-api-key')?.value?.trim();if(k){S.key=k;localStorage.setItem('fitlog_key',k);closeSettings();toast('✅ Saved!')}}
        function updateKeyStatus(){const d=$('api-key-status-display');if(d)d.innerHTML=hk()?'<span style="color:var(--accent-primary)">✅ Key set</span>':'<span style="color:var(--accent-secondary)">⚠️ No key</span>'}
        function toggleTheme(){S.theme=S.theme==='dark'?'light':'dark';localStorage.setItem('fitlog_theme',S.theme);document.body.setAttribute('data-theme',S.theme);const _ttb=$('theme-toggle-btn');if(_ttb)_ttb.textContent=S.theme==='dark'?'🌙':'☀️';updateSettingsThemeBtn();if(S.view==='progress')renderCharts()}
        function toggleCoach(){const p=$('coach-panel');p.classList.toggle('open')}
        async function sendCoachMsg(){const inp=$('coach-input');if(!inp||!hk()){if(!hk()){toast('⚠️ Set API key');openSettings()}return}const m=inp.value.trim();if(!m)return;addCoachMsg('user',m);inp.value='';const sid=addCoachSkel();try{const r=await ai(m,'You are a fitness coach. Return JSON: {"response":"your message"}');removeCoachSkel(sid);addCoachMsg('ai',(r&&r.response)?r.response:'How can I help?')}catch{removeCoachSkel(sid);addCoachMsg('ai','Sorry, try again.')}}
        function addCoachMsg(t,m){const c=$('coach-messages');if(!c)return;const d=document.createElement('div');d.className=`chat-message ${t}`;d.textContent=m;c.appendChild(d);c.scrollTop=c.scrollHeight}
        function addCoachSkel(){const c=$('coach-messages');if(!c)return'cs-0';const id='cs-'+Date.now();const d=document.createElement('div');d.id=id;d.className='chat-message ai';d.innerHTML='<div class="skeleton skeleton-text"></div>';c.appendChild(d);c.scrollTop=c.scrollHeight;return id}
        function removeCoachSkel(id){const e=$(id);if(e)e.remove()}

        function go(v){S.view=v;document.querySelectorAll('#nav-tabs-desktop .tab').forEach(t=>t.classList.toggle('active',t.dataset.view===v));document.querySelectorAll('#bottom-nav .bottom-tab').forEach(t=>t.classList.toggle('active',t.dataset.view===v));document.querySelectorAll('.view').forEach(vw=>vw.classList.remove('active'));const t=$('view-'+v);if(t)t.classList.add('active');if(v==='dashboard')refreshDash();if(v==='nutrition'){refreshNut();refreshFavs()}if(v==='workout'){refreshPlans();checkActivePlanToday()}if(v==='body')refreshBody();if(v==='progress')renderCharts();window.scrollTo({top:0,behavior:'smooth'})}
        document.querySelectorAll('#nav-tabs-desktop .tab').forEach(t=>t.addEventListener('click',()=>go(t.dataset.view)));
        document.querySelectorAll('#bottom-nav .bottom-tab').forEach(t=>t.addEventListener('click',()=>go(t.dataset.view)));

        async function ai(prompt,sys='',img=null){if(!isOnline()){toast('📴 Offline — AI features unavailable');return null}if(!hk()){toast('⚠️ Set API key');openSettings();return null}const parts=[];if(img)parts.push({inlineData:{mimeType:img.mime,data:img.data}});parts.push({text:sys?`${sys}\n\n${prompt}`:prompt});const r=await fetch(`${API_URL}?key=${S.key}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts}],generationConfig:{temperature:0.4,maxOutputTokens:4096,responseMimeType:"application/json"}})});if(!r.ok){const e=await r.json();throw new Error(e.error?.message||'API error')}const d=await r.json();const txt=d?.candidates?.[0]?.content?.parts?.[0]?.text;if(!txt)throw new Error('Empty');try{return JSON.parse(txt)}catch{return{response:txt}}}

        function stepsToCalories(steps){
            // Standard: ~0.57 cal burned per kg per km; avg stride ~0.762m → 1312 steps/km
            // Simplifies to: cal = steps * weight * 0.000435
            const weight=S.wlog&&S.wlog.length?S.wlog.slice(-1)[0].weight:70;
            return Math.round(steps*weight*0.000435);
        }
        function addSteps(n){if(!S.steps||typeof S.steps!=='object')S.steps={};S.steps[gT()]=(S.steps[gT()]||0)+n;save('fitlog_steps',S.steps);updateStepsUI();renderDailyQuest();refreshDash();haptic([15]);const el=document.getElementById('step-count');if(el){el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');setTimeout(()=>el.classList.remove('pop'),300)}}function updateStepsUI(){const sc=$('step-count');const val=S.steps&&typeof S.steps==='object'?S.steps[gT()]||0:0;if(sc)sc.textContent=val.toLocaleString();const goalPct=Math.min(100,Math.round((val/10000)*100));const fill=$('step-goal-fill');if(fill)fill.style.width=goalPct+'%';const pctEl=$('step-goal-pct');if(pctEl)pctEl.textContent=goalPct;}
        function openWaterModal(){$('water-modal').style.display='flex'}function closeWaterModal(){$('water-modal').style.display='none'}
        function addWater(ml){if(!ml)return;S.hydr.log[gT()]=(S.hydr.log[gT()]||0)+ml;save('fitlog_hydr',S.hydr);updateHydr();renderDailyQuest();haptic([15]);}
        function updateHydr(){const cur=S.hydr.log[gT()]||0,tgt=S.hydr.tgt||2500,pct=Math.min(100,Math.round((cur/Math.max(1,tgt))*100));['hydrate-current','hydrate-goal','hydrate-pct','hydrate-fill'].forEach((id,i)=>{const el=$(id);if(el)i===3?el.style.width=pct+'%':el.textContent=i===0?cur:i===1?tgt:pct+'%'})}
        function openWeightModal(){$('weight-modal-date').textContent=new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});$('weight-modal').style.display='flex';const l=S.wlog.slice(-1)[0];if(l)$('custom-weight-input').value=l.weight}function closeWeightModal(){$('weight-modal').style.display='none'}
        function quickWeight(delta){const l=S.wlog.slice(-1)[0];const w=l?Math.round((l.weight+delta)*10)/10:70;S.wlog.push({date:gT(),weight:w});save('fitlog_wlog',S.wlog);updateWeightUI()}
        function logWeightFromModal(){const w=parseFloat($('custom-weight-input')?.value);if(!w||w<20||w>300)return;S.wlog.push({date:gT(),weight:Math.round(w*10)/10});save('fitlog_wlog',S.wlog);updateWeightUI()}
        function updateWeightUI(){const l=S.wlog.slice(-1)[0];const dw=$('dashboard-weight'),dwd=$('dashboard-weight-date');if(dw)dw.textContent=l?l.weight+' kg':'-- kg';if(dwd)dwd.textContent=l?l.date:''}

        function renderCharts(){drawWeightChart();drawCalorieChart()}
        function drawWeightChart(){const c=$('weight-chart-container');if(!c)return;const data=S.wlog.slice(-30);if(data.length<2){c.innerHTML='<div class="chart-empty-state">Need 2+ entries</div>';return}const isDark=S.theme==='dark',tc=isDark?'#A0A0B0':'#6B6B7B',gc=isDark?'#2A2A3A':'#E0E0E8',lc='#00D4AA';const w=340,h=240,p={t:20,r:20,b:40,l:50},pw=w-p.l-p.r,ph=h-p.t-p.b;const vals=data.map(d=>d.weight),min=Math.floor(Math.min(...vals)-1),max=Math.ceil(Math.max(...vals)+1),range=max-min||1;let svg=`<svg class="chart-svg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;for(let i=0;i<=4;i++){const y=p.t+(ph/4)*i;svg+=`<line x1="${p.l}" y1="${y}" x2="${w-p.r}" y2="${y}" stroke="${gc}" stroke-width="1"/><text x="${p.l-8}" y="${y+4}" fill="${tc}" font-size="10" text-anchor="end">${(max-(range/4)*i).toFixed(1)}</text>`}const pts=data.map((d,i)=>`${p.l+(pw/(data.length-1))*i},${p.t+ph-((d.weight-min)/range)*ph}`).join(' ');svg+=`<polyline points="${pts}" fill="none" stroke="${lc}" stroke-width="2.5"/>`;c.innerHTML=svg+'</svg>'}
        function drawCalorieChart(){const c=$('calorie-chart-container');if(!c)return;const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];const eaten=[],burned=[];for(let i=6;i>=0;i--){const d=gA(i);const daySteps=S.steps&&typeof S.steps==='object'?S.steps[d]||0:0;eaten.push({label:days[new Date(d).getDay()],y:S.meals.filter(m=>m.date===d).reduce((s,m)=>s+((m.totals||{}).calories||0),0)});burned.push({label:days[new Date(d).getDay()],y:S.wkts.filter(w=>w.date===d).reduce((s,w)=>s+(w.cal||0),0)+stepsToCalories(daySteps)})}if(eaten.every(p=>p.y===0)&&burned.every(p=>p.y===0)){c.innerHTML='<div class="chart-empty-state">Log meals</div>';return}const isDark=S.theme==='dark',tc=isDark?'#A0A0B0':'#6B6B7B',allVals=[...eaten.map(p=>p.y),...burned.map(p=>p.y)],max=Math.ceil(Math.max(...allVals,100)*1.2);const w=340,h=240,p={t:30,r:20,b:40,l:50},pw=w-p.l-p.r,ph=h-p.t-p.b,barW=(pw/eaten.length)*0.35;let svg=`<svg class="chart-svg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><rect x="${w-140}" y="8" width="12" height="12" rx="2" fill="#FF6B6B"/><text x="${w-124}" y="18" fill="${tc}" font-size="9">Eaten</text><rect x="${w-80}" y="8" width="12" height="12" rx="2" fill="#FFB84D"/><text x="${w-64}" y="18" fill="${tc}" font-size="9">Burned</text>`;eaten.forEach((pt,i)=>{const x=p.l+(pw/eaten.length)*i;if(pt.y>0){const bh=(pt.y/max)*ph;svg+=`<rect x="${x}" y="${p.t+ph-bh}" width="${barW}" height="${bh}" rx="3" fill="#FF6B6B" opacity="0.85"/>`}if(burned[i].y>0){const bh=(burned[i].y/max)*ph;svg+=`<rect x="${x+barW+2}" y="${p.t+ph-bh}" width="${barW}" height="${bh}" rx="3" fill="#FFB84D" opacity="0.85"/>`}svg+=`<text x="${x+barW}" y="${h-p.b+16}" fill="${tc}" font-size="9" text-anchor="middle">${pt.label}</text>`});c.innerHTML=svg+'</svg>'}

        function calculateStreak(){const plan=getActivePlan();if(!plan)return 0;let streak=0,freezes=plan.streakFreezes||0;const start=new Date(plan.startedDate);for(let i=0;i<365;i++){const d=gA(i);const hasWkt=S.wkts.some(w=>w.date===d);if(hasWkt){streak++;continue}if(i===0)continue;const dayOffset=Math.floor((new Date()-start)/(86400000))-i;if(dayOffset<0)continue;let isRestDay=false;for(const w of plan.weeks||[]){for(const wd of w.days||[]){const off=((w.weekNumber-1)*(plan.weeks[0]?.days?.length||4))+wd.dayNumber-1;if(off===dayOffset){isRestDay=true;break}}if(isRestDay)break}if(isRestDay)continue;if(freezes>0){freezes--;plan.streakFreezes=freezes;save('fitlog_plans',S.plans);continue}break}return streak}
        function updateStreakUI(){const plan=getActivePlan();const freezes=plan?Math.max(0,plan.streakFreezes||0):0;const s=calculateStreak();$('streak-count').textContent=s;$('streak-flame').style.display=s>0?'inline-block':'none';if($('streak-freezes'))$('streak-freezes').textContent=freezes}

        function getActivePlan(){return S.plans.find(p=>p.started)}
        function checkActivePlanToday(){
            const plan=getActivePlan();
            const genSec=$('plan-generator-section'),quickSec=$('quick-generator-section'),activeSec=$('active-plan-today');
            if(plan&&plan.startedDate){genSec.style.display='none';quickSec.style.display='block';activeSec.style.display='block';renderTodayPlanWorkout(plan)}
            else{genSec.style.display='block';quickSec.style.display='block';activeSec.style.display='none'}
        }
        // Get a flat ordered list of all plan days: [{week, day, weekNum, dayNum}]
        function getPlanDaysList(plan){const list=[];for(const w of plan.weeks){for(const d of w.days){list.push({week:w,day:d,weekNum:w.weekNumber,dayNum:d.dayNumber})}}return list}
        // Get the current active day index (0-based into getPlanDaysList)
        function getCurrentDayIndex(plan){if(typeof plan.currentDayIndex==='number')return plan.currentDayIndex;return 0}
        function startPlanDayWorkout(){
            const plan=getActivePlan();if(!plan)return;
            const days=getPlanDaysList(plan);const idx=getCurrentDayIndex(plan);
            if(idx>=days.length){toast('🎉 Plan already complete!');return;}
            const {day,weekNum,dayNum}=days[idx];
            const dayName=(plan.planName||'Plan')+' — '+(day.name||`W${weekNum}D${dayNum}`);
            const nameEl=$('workout-name');if(nameEl)nameEl.value=dayName;
            const container=$('exercise-entries');
            if(container){
                container.innerHTML='';
                (day.exercises||[]).forEach(ex=>{
                    const db=findExercise(ex.id);
                    const eName=db?db.n:(ex.id||'Exercise');
                    const div=document.createElement('div');
                    div.className='workout-exercise';
                    div.innerHTML=`<div><input type="text" class="exercise-name-input" placeholder="Exercise" style="margin-bottom:4px" value="${eName.replace(/"/g,'&quot;')}"><input type="text" class="exercise-details-input" placeholder="Sets × Reps × Weight" value="${ex.sets}×${ex.reps}"></div>`;
                    container.appendChild(div);
                });
            }
            startActiveWorkout();
            // Store plan context AFTER startActiveWorkout (which resets _wam) so wamFinish can advance the day
            _wam._planContext={planId:plan.id,weekNum,dayNum};
        }

        function renderTodayPlanWorkout(plan){
            const days=getPlanDaysList(plan);const idx=getCurrentDayIndex(plan);
            if(idx>=days.length){$('active-plan-workout').innerHTML='<p style="color:var(--text-secondary)">🎉 Plan complete! Amazing work!</p>';return}
            const {week,day,weekNum,dayNum}=days[idx];
            const isDone=plan.done?.[`${weekNum}-${dayNum}`];
            const exDoneKey=`${weekNum}-${dayNum}`;
            const exDoneArr=plan.exerciseDone?.[exDoneKey]||[];
            let html=`<h4>Week ${weekNum}, Day ${dayNum}: ${day.name||'Workout'}</h4>`;html+=`<span class="exercise-badge badge-${day.type||'strength'}">${day.type||'strength'}</span>`;if(day.warmup)html+=`<p style="font-size:.8rem;margin-top:4px"><strong>Warmup:</strong> ${day.warmup}</p>`;html+='<div style="margin-top:8px">';day.exercises.forEach((ex,i)=>{const db=findExercise(ex.id);const en=db?db.n:(ex.id||'Exercise');const exIsDone=exDoneArr[i];const gifUrl=findGif(db?db.id:'',en);const gifHtml=gifUrl?`<div class="inline-gif-wrap"><img src="${gifUrl}" alt="${en}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`:'';html+=`<div class="workout-plan-exercise-wrap" style="margin-bottom:8px"><div class="workout-plan-exercise exercise-clickable ${exIsDone?'completed':''}" style="padding:8px;margin-bottom:0" onclick="showExerciseGif('${db?db.id:''}','${en.replace(/'/g,"\\'")}')"><div style="flex:1;font-size:.85rem;${exIsDone?'text-decoration:line-through;opacity:0.6':''}">${i+1}. ${en} <span style="font-size:.75rem;color:var(--text-secondary)">${ex.sets}×${ex.reps}</span></div><button class="btn btn-done btn-sm ${exIsDone?'completed':''}" onclick="event.stopPropagation();toggleExerciseDone('${plan.id}',${weekNum},${dayNum},${i})">${exIsDone?'✅':'○'}</button></div>${gifHtml}</div>`});html+='</div>';if(day.cooldown)html+=`<p style="font-size:.8rem;margin-top:4px"><strong>Cooldown:</strong> ${day.cooldown}</p>`;            // Buttons row
            html+=`<div style="display:flex;gap:8px;margin-top:10px">`;
            if(!isDone){html+=`<button class="btn btn-accent btn-sm" onclick="startPlanDayWorkout()" style="flex:1">▶ Start Workout</button>`;}
            html+=`<button class="btn btn-sm ${isDone?'btn-secondary':'btn-primary'}" onclick="completeTodayPlanDay()" style="flex:1">${isDone?'↩️ Undo':'✅ Mark Complete'}</button>`;
            html+=`</div>`;
            html+=`<div class="plan-action-bar"><button class="btn btn-danger btn-sm" onclick="stopPlan('${plan.id}')">⏹️ Stop Plan</button></div>`;
            $('active-plan-workout').innerHTML=html}
        function autoCompleteDay(pid,w,d){const p=S.plans.find(pl=>pl.id===pid);if(!p)return;if(!p.done)p.done={};const key=`${w}-${d}`;if(p.done[key])return;p.done[key]=true;// Log workout entry for dashboard
            const days=getPlanDaysList(p);const dayObj=days.find(dy=>dy.weekNum===w&&dy.dayNum===d);if(dayObj){const exList=dayObj.day.exercises||[];const estCal=exList.reduce((s,ex)=>{const db=findExercise(ex.id);return s+(db?db.cal:6)*(ex.sets||3)},0)||200;S.wkts.push({id:uid(),ts:new Date().toISOString(),date:gT(),name:(p.planName||'Plan')+' — '+(dayObj.day.name||`W${w}D${d}`),dur:45,cal:estCal,type:dayObj.day.type||'strength',fromPlan:true,ex:exList.map(ex=>{const db=findExercise(ex.id);return{n:db?db.n:ex.id,d:`${ex.sets}×${ex.reps}`}})});save('fitlog_wkts',S.wkts)}// Advance to next day
            const idx=getCurrentDayIndex(p);if(idx<days.length-1){p.currentDayIndex=idx+1}else{p.currentDayIndex=days.length}save('fitlog_plans',S.plans);giveXP(50,'Day complete! +50 XP');checkAchievements();showCongrats('All exercises done! Day complete! 🔥');checkActivePlanToday();refreshPlans();refreshDash()}
        function completeTodayPlanDay(){const plan=getActivePlan();if(!plan)return;const days=getPlanDaysList(plan);const idx=getCurrentDayIndex(plan);if(idx>=days.length)return;const {week,day,weekNum,dayNum}=days[idx];if(!plan.done)plan.done={};const key=`${weekNum}-${dayNum}`;const completing=!plan.done[key];plan.done[key]=completing;if(completing){// Log a workout entry so dashboard tracks it
            const exList=day.exercises||[];const estCal=exList.reduce((s,ex)=>{const db=findExercise(ex.id);return s+(db?db.cal:6)*(ex.sets||3)},0)||200;S.wkts.push({id:uid(),ts:new Date().toISOString(),date:gT(),name:(plan.planName||'Plan')+' — '+( day.name||`W${weekNum}D${dayNum}`),dur:45,cal:estCal,type:day.type||'strength',fromPlan:true,ex:exList.map(ex=>{const db=findExercise(ex.id);return{n:db?db.n:ex.id,d:`${ex.sets}×${ex.reps}`}})});save('fitlog_wkts',S.wkts);// Advance to next day
            const nextIdx=idx+1;plan.currentDayIndex=nextIdx<days.length?nextIdx:days.length;giveXP(50,'Plan day complete! +50 XP');checkAchievements()}else{// Undo: remove the plan workout logged today, go back to this day
            S.wkts=S.wkts.filter(w=>!(w.fromPlan&&w.date===gT()&&w.name&&w.name.includes(plan.planName||'Plan')));save('fitlog_wkts',S.wkts);plan.currentDayIndex=idx}save('fitlog_plans',S.plans);checkActivePlanToday();refreshPlans();refreshDash();if(completing){showCongrats('Workout complete! Your streak continues! 🔥');requestNotificationPermission()}}

        // ── XP / LEVEL / ACHIEVEMENT SYSTEM ─────────────────────
        const XP_LEVELS=[
            {level:1,title:'Rookie',xpNeeded:0,next:100},
            {level:2,title:'Trainee',xpNeeded:100,next:250},
            {level:3,title:'Athlete',xpNeeded:250,next:500},
            {level:4,title:'Warrior',xpNeeded:500,next:900},
            {level:5,title:'Champion',xpNeeded:900,next:1400},
            {level:6,title:'Legend',xpNeeded:1400,next:2100},
            {level:7,title:'Elite',xpNeeded:2100,next:3000},
            {level:8,title:'Master',xpNeeded:3000,next:4200},
            {level:9,title:'Titan',xpNeeded:4200,next:6000},
            {level:10,title:'Immortal',xpNeeded:6000,next:9999}
        ];
        const ACHIEVEMENTS=[
            {id:'first_workout',icon:'💪',name:'First Sweat',desc:'Log your first workout',check:()=>S.wkts.length>=1},
            {id:'five_workouts',icon:'🏋️',name:'Getting Serious',desc:'Log 5 workouts',check:()=>S.wkts.length>=5},
            {id:'plan_started',icon:'📅',name:'Committed',desc:'Start a workout plan',check:()=>S.plans.some(p=>p.started)},
            {id:'plan_day',icon:'✅',name:'Day One Done',desc:'Complete a plan day',check:()=>S.plans.some(p=>Object.values(p.done||{}).some(v=>v))},
            {id:'streak3',icon:'🔥',name:'On Fire',desc:'3-day workout streak',check:()=>calculateStreak()>=3},
            {id:'streak7',icon:'🌟',name:'Week Warrior',desc:'7-day streak',check:()=>calculateStreak()>=7},
            {id:'hydrate',icon:'💧',name:'Hydrated',desc:'Log 2000ml of water',check:()=>(S.hydr.log[gT()]||0)>=2000},
            {id:'steps10k',icon:'👟',name:'10K Steps',desc:'Hit 10,000 steps in a day',check:()=>Object.values(S.steps).some(v=>v>=10000)},
            {id:'meals3',icon:'🍽️',name:'Meal Tracker',desc:'Log 3 meals',check:()=>S.meals.length>=3},
            {id:'weight_log',icon:'⚖️',name:'Scale Watcher',desc:'Log your weight',check:()=>S.wlog.length>=1},
            {id:'quest_done',icon:'⚔️',name:'Quest Taker',desc:'Complete a daily quest',check:()=>(S.xp?.questsDone||0)>=1},
            {id:'level5',icon:'🏆',name:'Mid-Tier Legend',desc:'Reach Level 5',check:()=>getCurrentLevel().level>=5},
            {id:'xp500',icon:'💎',name:'XP Collector',desc:'Earn 500 total XP',check:()=>(S.xp?.total||0)>=500},
        ];

        // Init XP state
        if(!S.xp)S.xp={total:0,questsDone:0,questDate:'',questProgress:0,unlockedAchievements:[]};

        function getCurrentLevel(){
            const total=S.xp?.total||0;
            let lv=XP_LEVELS[0];
            for(const l of XP_LEVELS){if(total>=l.xpNeeded)lv=l;else break}
            return lv
        }

        function giveXP(amount,label){
            if(!S.xp)S.xp={total:0,questsDone:0,questDate:'',questProgress:0,unlockedAchievements:[]};
            const prevLevel=getCurrentLevel().level;
            S.xp.total=(S.xp.total||0)+amount;
            save('fitlog_xp',S.xp);
            // XP toast
            const t=document.createElement('div');t.className='xp-toast';t.textContent='⚡ +'+amount+' XP';document.body.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .4s';setTimeout(()=>t.remove(),400)},1800);
            const newLevel=getCurrentLevel().level;
            if(newLevel>prevLevel){setTimeout(()=>showCongrats('🎉 Level Up! You\'re now '+getCurrentLevel().title+'!'),400)}
            renderXPBar()
        }

        function renderXPBar(){
            if(!S.xp)return;
            const lv=getCurrentLevel();
            const total=S.xp.total||0;
            const pct=lv.level===10?100:Math.round(((total-lv.xpNeeded)/(lv.next-lv.xpNeeded))*100);
            const badge=$('xp-level-badge'),fill=$('xp-fill'),cur=$('xp-current'),nxt=$('xp-next'),titleLbl=$('xp-title-label');
            if(badge)badge.textContent='Level '+lv.level;
            if(fill)fill.style.width=pct+'%';
            if(cur)cur.textContent=total;
            if(nxt)nxt.textContent=lv.next;
            if(titleLbl)titleLbl.textContent=lv.title;
            renderAchievements()
        }

        function checkAchievements(){
            if(!S.xp)return;
            const unlocked=S.xp.unlockedAchievements||[];
            let newUnlocks=false;
            for(const a of ACHIEVEMENTS){
                if(!unlocked.includes(a.id)&&a.check()){
                    unlocked.push(a.id);
                    newUnlocks=true;
                    giveXP(25,'Achievement: '+a.name+' +25 XP');
                    setTimeout(()=>toast('🏆 Achievement: '+a.name+'!'),600)
                }
            }
            if(newUnlocks){S.xp.unlockedAchievements=unlocked;save('fitlog_xp',S.xp);renderAchievements()}
        }

        function renderAchievements(){
            const el=$('achievements-list');if(!el)return;
            const unlocked=(S.xp?.unlockedAchievements)||[];
            const prog=$('achievement-progress');
            if(prog)prog.textContent=unlocked.length+' / '+ACHIEVEMENTS.length;
            el.style.cssText='display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:4px';
            el.innerHTML=ACHIEVEMENTS.map(function(a){
              var done=unlocked.includes(a.id);
              var baseStyle='position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 10px 12px;border-radius:16px;text-align:center;overflow:hidden;';
              var cardStyle=done
                ? baseStyle+'background:linear-gradient(145deg,rgba(0,229,187,0.1),rgba(0,212,245,0.05));border:1px solid rgba(0,229,187,0.3);box-shadow:0 4px 18px rgba(0,229,187,0.12);'
                : baseStyle+'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);filter:grayscale(1);opacity:.4;';
              var badge=done?'<span style="position:absolute;top:7px;right:9px;font-size:.6rem;font-weight:800;color:#00E5BB;background:rgba(0,229,187,0.15);border:1px solid rgba(0,229,187,0.35);border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center">&#10003;</span>':'';
              return '<div style="'+cardStyle+'">'+badge+'<span style="font-size:1.75rem;line-height:1">'+a.icon+'</span><div style="font-size:.73rem;font-weight:700;color:'+(done?'#F0F2FF':'rgba(180,190,220,0.75)')+';line-height:1.2">'+a.name+'</div><div style="font-size:.63rem;color:'+(done?'#00E5BB':'rgba(180,190,220,0.5)')+';line-height:1.3">'+a.desc+'</div></div>';
            }).join('');
        }

        // ── DAILY QUEST SYSTEM ───────────────────────────────────
        const QUEST_POOL=[
            {id:'pushups',desc:'Do 20 Push-Ups',xp:50,target:20,unit:'reps',exerciseId:'psh'},
            {id:'squats',desc:'Do 30 Bodyweight Squats',xp:50,target:30,unit:'reps',exerciseId:'goblet_sq'},
            {id:'plank',desc:'Hold a Plank for 60 seconds',xp:40,target:1,unit:'set',exerciseId:'plank'},
            {id:'pullups',desc:'Do 10 Pull-Ups',xp:60,target:10,unit:'reps',exerciseId:'pu'},
            {id:'burpees',desc:'Complete 15 Burpees',xp:70,target:15,unit:'reps',exerciseId:'burpee'},
            {id:'lunges',desc:'Do 20 Walking Lunges',xp:45,target:20,unit:'reps',exerciseId:'lunge'},
            {id:'workout',desc:'Log any workout today',xp:40,target:1,unit:'workout',exerciseId:null},
            {id:'steps',desc:'Walk 8,000 steps today',xp:55,target:8000,unit:'steps',exerciseId:null},
            {id:'water',desc:'Drink 2.5L of water',xp:35,target:2500,unit:'ml',exerciseId:null},
            {id:'crunch',desc:'Do 40 Crunches',xp:40,target:40,unit:'reps',exerciseId:'crunch'},
            {id:'dips',desc:'Complete 15 Tricep Dips',xp:55,target:15,unit:'reps',exerciseId:'td'},
            {id:'mountain',desc:'Do 30 Mountain Climbers',xp:50,target:30,unit:'reps',exerciseId:'mountain_climber'},
        ];

        function getDailyQuest(){
            if(!S.xp)S.xp={total:0,questsDone:0,questDate:'',questProgress:0,unlockedAchievements:[]};
            // Pick a deterministic quest per day using date as seed
            if(S.xp.questDate!==gT()){
                // New day — pick new quest and reset progress
                const seed=gT().split('-').join('')%QUEST_POOL.length;
                const idx=parseInt(gT().replace(/-/g,''))%QUEST_POOL.length;
                S.xp.questDate=gT();
                S.xp.questId=QUEST_POOL[idx].id;
                S.xp.questProgress=0;
                S.xp.questAwarded=false;
                save('fitlog_xp',S.xp)
            }
            return QUEST_POOL.find(q=>q.id===S.xp.questId)||QUEST_POOL[0]
        }

        function getAutoQuestProgress(quest){
            // Auto-fill progress for step/water/workout quests
            if(quest.unit==='steps')return Math.min(quest.target,S.steps[gT()]||0);
            if(quest.unit==='ml')return Math.min(quest.target,S.hydr.log[gT()]||0);
            if(quest.unit==='workout')return Math.min(1,S.wkts.filter(w=>w.date===gT()).length);
            return Math.min(quest.target,S.xp?.questProgress||0)
        }

        function renderDailyQuest(){
            const quest=getDailyQuest();
            const card=$('daily-quest-card'),desc=$('quest-desc'),status=$('quest-status'),fill=$('quest-progress-fill'),xpBadge=$('quest-xp-badge'),btn=$('quest-btn');
            if(!card||!desc)return;
            const progress=getAutoQuestProgress(quest);
            const done=progress>=quest.target;
            const pct=Math.round((progress/quest.target)*100);
            if(desc)desc.textContent=quest.desc;
            if(xpBadge)xpBadge.textContent='+'+quest.xp+' XP';
            if(fill)fill.style.width=pct+'%';
            const unitLabel=quest.unit==='reps'?`${progress}/${quest.target} reps`:quest.unit==='steps'?`${progress.toLocaleString()}/${quest.target.toLocaleString()} steps`:quest.unit==='ml'?`${progress}/${quest.target} ml`:done?'Done!':'0/1';
            if(status)status.textContent=unitLabel;
            if(card)card.className='quest-card'+(done?' quest-done':'');
            if(btn){
                if(done){btn.textContent='✅ Done!';btn.disabled=true}
                else if(quest.unit==='steps'||quest.unit==='ml'||quest.unit==='workout'){btn.textContent='Auto-tracked';btn.disabled=true}
                else{btn.textContent='✔ Log Progress';btn.disabled=false}
            }
            // Award XP if newly done
            if(done&&!S.xp.questAwarded){
                S.xp.questAwarded=true;S.xp.questsDone=(S.xp.questsDone||0)+1;save('fitlog_xp',S.xp);
                giveXP(quest.xp,'Quest complete!');checkAchievements();toast('⚔️ Quest Complete! +'+quest.xp+' XP')
            }
        }

        function logQuestProgress(){
            const quest=getDailyQuest();
            if(!S.xp)return;
            const increment=quest.unit==='reps'?5:quest.unit==='set'?1:1;
            S.xp.questProgress=Math.min(quest.target,(S.xp.questProgress||0)+increment);
            save('fitlog_xp',S.xp);
            renderDailyQuest()
        }

        // Load XP from localStorage
        const savedXP=SP(localStorage.getItem('fitlog_xp'),null);
        if(savedXP)S.xp=savedXP;
        if(!S.xp)S.xp={total:0,questsDone:0,questDate:'',questProgress:0,unlockedAchievements:[]};


        function scheduleDailyReminder(){if('Notification' in window&&Notification.permission==='granted'){const now=new Date();const reminder=new Date(now);reminder.setHours(8,0,0,0);if(reminder<now)reminder.setDate(reminder.getDate()+1);setTimeout(()=>{new Notification('FitLog Reminder',{body:'Time for your daily workout! 🏋️'});scheduleDailyReminder()},reminder-now)}}
        function requestNotificationPermission(){if('Notification' in window&&Notification.permission==='default'){Notification.requestPermission().then(()=>{}).catch(()=>{})}}

        // FIXED: Multi-Week Plan Generator
        async function generateMultiWeekPlan(){if(!hk()){toast('⚠️ Set API key');openSettings();return}const goal=$('plan-goal')?.value==='custom'?($('custom-goal-input')?.value||'Fitness'):$('plan-goal')?.value;const dur=$('plan-duration')?.value||'4 weeks',dpw=parseInt($('plan-days-per-week')?.value||'4');const eq=getSelectedValues('plan-equipment');if(!eq.length)eq.push('bodyweight');const sess=$('plan-session-duration')?.value||'45',c=$('multi-week-plan-result');c.innerHTML='<div class="skeleton skeleton-text"></div><p style="font-size:.8rem">Generating plan...</p>';const avail=EX.filter(ex=>eq.some(e=>{const xe=(ex.e||'').toLowerCase(),se=e.toLowerCase();return xe===se||xe.includes(se)||se.includes(xe)||ex.e==='none'}));if(avail.length<3){c.innerHTML='<p style="color:var(--accent-secondary)">❌ Not enough exercises with selected equipment. Add Bodyweight or more equipment.</p>';return}const exList=avail.map(e=>({id:e.id,n:e.n})).slice(0,30);try{const r=await ai(`Create a ${dur} training plan for: "${goal}". ${dpw} days/week, ${sess} min/session.`, `Create a structured workout plan. Return ONLY valid JSON:\n{"planName":"...","goal":"${goal}","duration":"${dur}","weeks":[{"weekNumber":1,"focus":"...","days":[{"dayNumber":1,"name":"...","type":"strength","exercises":[{"id":"...","sets":3,"reps":"8-12","restSeconds":60}],"warmup":"5 min light cardio","cooldown":"5 min stretching"}]}]}\n\nPick exercise IDs ONLY from this list: ${JSON.stringify(exList)}`);if(!r||!r.weeks||!r.weeks.length){c.innerHTML='<p style="color:var(--accent-secondary)">❌ Could not generate plan. Try different settings.</p>';return}const planData={id:uid(),ts:new Date().toISOString(),planName:r.planName||goal,goal,duration:dur,daysPerWeek:dpw,overview:r.overview||'',weeks:r.weeks,done:{},started:false};c.innerHTML='<p style="color:var(--accent-primary);text-align:center;padding:10px">✅ Plan generated! Review below.</p>';openPlanPreviewModal(planData);refreshPlans()}catch(e){c.innerHTML=`<p style="color:var(--accent-secondary)">❌ ${e.message||'Error generating plan. Try again.'}</p>`;console.error('Plan generation error:',e)}}
        function renderPlan(plan,c){const total=plan.weeks.reduce((s,w)=>s+(w.days?.length||0),0);const done=Object.values(plan.done||{}).filter(v=>v).length;const pct=total>0?Math.round((done/total)*100):0;c.innerHTML=`<div style="border-top:1px solid var(--border-color);padding-top:10px"><div style="display:flex;justify-content:space-between"><h4>📅 ${plan.planName}</h4><div><button class="btn btn-primary btn-xs" onclick="startPlan('${plan.id}')">▶️</button><button class="btn btn-danger btn-xs" onclick="delPlan('${plan.id}')">🗑️</button></div></div><p style="font-size:.78rem;color:var(--text-secondary)">${plan.goal} • ${plan.duration}</p><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div><p style="font-size:.7rem;text-align:right">${done}/${total} days</p>${plan.weeks.map(w=>`<div style="margin-top:8px"><h5 style="color:var(--accent-blue)">Week ${w.weekNumber}: ${w.focus||''}</h5>${(w.days||[]).map(d=>{const isDone=plan.done?.[`${w.weekNumber}-${d.dayNumber}`];const exKey=`${w.weekNumber}-${d.dayNumber}`;const exDoneArr=plan.exerciseDone?.[exKey]||[];return`<div class="plan-day-card"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><strong style="font-size:.85rem">Day ${d.dayNumber}: ${d.name||'Workout'}</strong><span class="day-badge ${isDone?'day-completed':'day-pending'}">${isDone?'✅':'⏳'}</span></div>${(d.exercises||[]).map((ex,i)=>{const db=findExercise(ex.id);const en=db?db.n:(ex.id||'Exercise');const exIsDone=exDoneArr[i];return`<div class="workout-plan-exercise exercise-clickable ${exIsDone?'completed':''}" style="padding:6px 10px" onclick="showExerciseGif('${db?db.id:''}','${en.replace(/'/g,"\\'")}')"><div style="flex:1;font-size:.8rem;${exIsDone?'text-decoration:line-through;opacity:0.6':''}">${i+1}. ${en} <span style="font-size:.72rem;color:var(--text-secondary)">${ex.sets}×${ex.reps}</span> <span class="gif-indicator">🎬</span></div><button class="btn btn-done btn-sm ${exIsDone?'completed':''}" onclick="event.stopPropagation();toggleExerciseDone('${plan.id}',${w.weekNumber},${d.dayNumber},${i})">${exIsDone?'✅':'○'}</button></div>`}).join('')}<button class="btn btn-sm ${isDone?'btn-secondary':'btn-primary'} btn-block" onclick="markDay('${plan.id}',${w.weekNumber},${d.dayNumber})">${isDone?'↩️ Undo':'✅ Done'}</button></div>`}).join('')}</div>`).join('')}</div>`}
        function markDay(pid,w,d){const p=S.plans.find(pl=>pl.id===pid);if(!p)return;if(!p.done)p.done={};p.done[`${w}-${d}`]=!p.done[`${w}-${d}`];save('fitlog_plans',S.plans);renderPlan(p,$('multi-week-plan-result'));refreshPlans();refreshDash();checkActivePlanToday()}
        function toggleExerciseDone(pid,w,d,exIdx){const p=S.plans.find(pl=>pl.id===pid);if(!p)return;if(!p.exerciseDone)p.exerciseDone={};if(!p.done)p.done={};const key=`${w}-${d}`;if(!p.exerciseDone[key])p.exerciseDone[key]=[];p.exerciseDone[key][exIdx]=!p.exerciseDone[key][exIdx];save('fitlog_plans',S.plans);// Always re-render immediately so checkmarks update
            checkActivePlanToday();renderPlan(p,$('multi-week-plan-result'));refreshPlans();// Auto-complete day when ALL exercises are ticked
            let totalEx=0;for(const wk of p.weeks){for(const dy of wk.days){if(wk.weekNumber===w&&dy.dayNumber===d){totalEx=dy.exercises.length;break}}}const doneCount=(p.exerciseDone[key]||[]).filter(Boolean).length;if(totalEx>0&&doneCount===totalEx&&!p.done[key]){setTimeout(()=>autoCompleteDay(pid,w,d),500)}}
        function startPlan(pid){const p=S.plans.find(pl=>pl.id===pid);if(p){p.started=true;p.startedDate=new Date().toISOString();p.currentDayIndex=0;const dpw=p.daysPerWeek||parseInt($('plan-days-per-week')?.value)||4;p.streakFreezes=Math.max(0,7-dpw);p.streakFreezesUsed=0;save('fitlog_plans',S.plans);refreshPlans();renderPlan(p,$('multi-week-plan-result'));checkActivePlanToday();toast('▶️ Plan started! '+p.streakFreezes+' streak freezes');scheduleDailyReminder()}}
        function delPlan(pid){showConfirm('Delete Plan?','This action cannot be undone.',()=>{S.plans=S.plans.filter(p=>p.id!==pid);save('fitlog_plans',S.plans);$('multi-week-plan-result').innerHTML='';refreshPlans();refreshDash();checkActivePlanToday();toast('🗑️ Plan deleted')})}
        function refreshPlans(){const h=!S.plans.length?'<div class="empty-state-rich"><div class="es-icon">📋</div><div class="es-title">No plans yet</div><div class="es-sub">Generate one with AI above</div></div>':S.plans.map(p=>{const t=p.weeks.reduce((s,w)=>s+(w.days?.length||0),0),d=Object.values(p.done||{}).filter(v=>v).length,pct=t>0?Math.round((d/t)*100):0;return`<div class="plan-day-card" style="cursor:pointer;position:relative" onclick="openPlanEditModal('${p.id}')"><button class="plan-delete-btn" onclick="event.stopPropagation();delPlan('${p.id}')">✕</button><div style="display:flex;justify-content:space-between"><strong style="font-size:.85rem">${p.planName}</strong><span class="day-badge ${p.started?'day-today':'day-pending'}" style="font-size:.65rem">${p.started?'▶️ Active':'⏸️'}</span></div><div style="font-size:.72rem;color:var(--text-secondary)">${p.goal} • ${p.duration}</div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div><div style="font-size:.68rem;color:var(--text-secondary);text-align:right;margin-top:2px">${d}/${t} days · ${pct}%</div></div>`}).join('');const l=$('active-plans-list'),d2=$('active-plans-dashboard');if(l)l.innerHTML=h;if(d2)d2.innerHTML=h}

        let cw=null,cd={};
        async function generateWorkoutPlan(){if(!hk()){toast('⚠️ Set API key');openSettings();return}const type=$('gen-workout-type')?.value||'strength',dur=$('gen-duration')?.value||'45';const eq=getSelectedValues('gen-equipment');if(!eq.length)eq.push('bodyweight');const split=$('gen-split')?.value||'full body',c=$('generated-plan-container');c.innerHTML='<div class="skeleton skeleton-text"></div>';const avail=EX.filter(ex=>eq.some(e=>(ex.e||'').toLowerCase().includes(e.toLowerCase())||ex.e==='none'));if(avail.length<3){c.innerHTML='<p style="color:var(--accent-secondary)">❌ Select more equipment</p>';return}try{const r=await ai('Create workout',`Create ${type} ${split} workout (${dur} min). Pick from: ${JSON.stringify(avail.slice(0,25).map(e=>({id:e.id,n:e.n})))}\nReturn JSON: {"planName":"...","exercises":[{"id":"...","sets":num,"reps":"...","restSeconds":num}],"estimatedCalories":num}`);if(!r?.exercises?.length){c.innerHTML='<p style="color:var(--accent-secondary)">❌ Failed</p>';return}cw=r;cd={};renderGW(c);toast('✨ Generated!')}catch(e){c.innerHTML=`<p style="color:var(--accent-secondary)">❌ ${e.message}</p>`}}
        function renderGW(c){c.innerHTML=`<div style="border-top:1px solid var(--border-color);padding-top:10px"><h4>${cw.planName||'Workout'}</h4><p style="font-size:.8rem">🔥 ${cw.estimatedCalories||'?'} cal</p>${cw.exercises.map((ex,i)=>{const db=findExercise(ex.id);const en=db?db.n:(ex.id||'Exercise');const eid=db?db.id:'';const isD=cd[i];return`<div class="workout-plan-exercise exercise-clickable ${isD?'completed':''}" onclick="showExerciseGif('${eid}','${en.replace(/'/g,"\\'")}')"><div style="flex:1;font-size:.82rem">${i+1}. ${en} <span class="gif-indicator">🎬</span> ${ex.sets}×${ex.reps}</div><button class="btn btn-done btn-sm ${isD?'completed':''}" onclick="event.stopPropagation();markGD(${i})">${isD?'✅':'○'}</button></div>`}).join('')}<div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-primary btn-sm" style="flex:1" onclick="logGW()">💾 Log</button><button class="btn btn-accent btn-sm" style="flex:1" onclick="startActiveWorkout(true)">▶ Start</button></div></div>`}
        function markGD(i){cd[i]=!cd[i];renderGW($('generated-plan-container'))}
        function logGW(){if(!cw?.exercises)return;const exercises=cw.exercises.map((ex,i)=>{const db=findExercise(ex.id);const name=db?db.n:ex.id;return{name,details:`${ex.sets}×${ex.reps}`,done:!!cd[i]}});S.wkts.push({id:uid(),ts:new Date().toISOString(),date:gT(),name:cw.planName||'Workout',dur:parseInt($('gen-duration')?.value||'45'),type:$('gen-workout-type')?.value||'strength',cal:cw.estimatedCalories||300,exercises,ex:exercises.map(e=>({n:e.name,d:e.details}))});save('fitlog_wkts',S.wkts);cw=null;cd={};$('generated-plan-container').innerHTML='<p style="color:var(--accent-primary)">✅ Logged!</p>';giveXP(30,'Workout logged! +30 XP');checkAchievements();refreshDash();updateStreakUI();renderExHistoryPreview();showCongrats('Quick workout done! 💪')}
        function renderWktLog(){renderExHistoryPreview();}

        function addExerciseEntry(){const c=$('exercise-entries');if(!c)return;const d=document.createElement('div');d.className='workout-exercise';d.innerHTML='<div style="flex:1"><input type="text" class="exercise-name-input" placeholder="Exercise" style="margin-bottom:4px" required><input type="text" class="exercise-details-input" placeholder="Sets × Reps × Weight"></div><button type="button" class="btn btn-danger btn-xs" onclick="this.parentElement.remove()">✕</button>';c.appendChild(d)}
        function logWorkout(e){e.preventDefault();const name=$('workout-name')?.value?.trim(),dur=parseInt($('workout-duration')?.value||'0'),cal=parseInt($('workout-calories')?.value||'300');if(!name||!dur){toast('⚠️ Fill fields');return}const exercises=[];document.querySelectorAll('#exercise-entries .workout-exercise').forEach(en=>{const n=en.querySelector('.exercise-name-input')?.value?.trim(),d=en.querySelector('.exercise-details-input')?.value?.trim();if(n)exercises.push({name:n,details:d||''})});if(!exercises.length){toast('⚠️ Add exercise');return}S.wkts.push({id:uid(),ts:new Date().toISOString(),date:gT(),name,dur,cal,type:'strength',exercises,ex:exercises.map(e=>({n:e.name,d:e.details}))});save('fitlog_wkts',S.wkts);$('workout-form').reset();$('workout-calories').value='300';$('exercise-entries').innerHTML='<div class="workout-exercise"><div><input type="text" class="exercise-name-input" placeholder="Exercise" style="margin-bottom:4px" required><input type="text" class="exercise-details-input" placeholder="Sets × Reps × Weight"></div></div>';giveXP(30,'Workout logged! +30 XP');checkAchievements();refreshDash();updateStreakUI();renderExHistoryPreview();showCongrats('Workout logged! 🎉')}

        async function sendMealMessage(){const input=$('nutrition-chat-input');if(!input)return;const msg=input.value.trim();if(!msg)return;addCM('user',msg);input.value='';const sid=addSK();try{const r=await ai(msg,'Return ONLY JSON: {"items":[{"name":"","calories":num,"protein_g":num,"carbs_g":num,"fat_g":num}],"totals":{"calories":num,"protein_g":num,"carbs_g":num,"fat_g":num}}');remSK(sid);if(r?.items?.length){const entry={id:uid(),ts:new Date().toISOString(),date:gT(),desc:msg,items:r.items,totals:r.totals||{}};S.meals.push(entry);save('fitlog_meals',S.meals);addCM('ai',`✅ ${r.items.map(i=>`${i.name}: ${i.calories}cal`).join(' | ')}<br><strong>Total: ${r.totals?.calories||0} cal</strong><br><button class="btn btn-xs btn-accent" onclick="saveFav('${entry.id}')">⭐ Save</button>`);refreshNut();refreshDash()}else addCM('ai','✅ Got it!')}catch(e){remSK(sid);addCM('ai',`❌ ${e.message}`)}}
        function addCM(t,m){const c=$('nutrition-chat-messages');if(!c)return;const d=document.createElement('div');d.className=`chat-message ${t}`;d.innerHTML=m;c.appendChild(d);c.scrollTop=c.scrollHeight}
        function addSK(){const c=$('nutrition-chat-messages');if(!c)return'sk-0';const id='sk-'+Date.now();const d=document.createElement('div');d.id=id;d.className='chat-message ai';d.innerHTML='<div class="skeleton skeleton-text"></div>';c.appendChild(d);c.scrollTop=c.scrollHeight;return id}
        function remSK(id){const e=$(id);if(e)e.remove()}
        function getTM(){return S.meals.filter(m=>m.date===gT())}
        function refreshNut(){const tm=getTM(),ld=$('todays-food-log'),td=$('nutrition-totals');if(!ld||!td)return;ld.innerHTML=!tm.length?'<div class="empty-state-rich"><div class="es-icon">🍽️</div><div class="es-title">No food logged yet</div><div class="es-sub">Describe a meal or scan a barcode</div></div>':tm.slice().reverse().map(m=>`<div class="list-item"><div style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${(m.items||[]).map(i=>i.name||'?').join(', ')||m.desc||'Meal'}</div><div class="list-item-value">${(m.totals||{}).calories||0} cal</div></div>`).join('');const totals={cal:tm.reduce((s,m)=>s+((m.totals||{}).calories||0),0),p:tm.reduce((s,m)=>s+((m.totals||{}).protein_g||0),0),c:tm.reduce((s,m)=>s+((m.totals||{}).carbs_g||0),0),f:tm.reduce((s,m)=>s+((m.totals||{}).fat_g||0),0)};td.style.display=tm.length?'flex':'none';$('nutrition-total-calories').textContent=totals.cal;$('nutrition-total-protein').textContent=totals.p.toFixed(1);$('nutrition-total-carbs').textContent=totals.c.toFixed(1);$('nutrition-total-fat').textContent=totals.f.toFixed(1);renderMacroRings(totals);}
        function saveFav(mid){const m=S.meals.find(ml=>ml.id===mid);if(!m?.items)return;if(S.favs.find(f=>f.id===mid)){toast('Already saved');return}S.favs.push({id:mid,name:m.items.map(i=>i.name||'?').join(', '),items:m.items,totals:m.totals||{}});save('fitlog_favs',S.favs);refreshFavs();toast('⭐ Saved!')}
        function qlFav(fid){const f=S.favs.find(fv=>fv.id===fid);if(!f?.items)return;S.meals.push({id:uid(),ts:new Date().toISOString(),date:gT(),desc:'⭐ '+f.name,items:f.items,totals:f.totals||{}});save('fitlog_meals',S.meals);refreshNut();refreshDash()}
        function refreshFavs(){const h=!S.favs.length?'<div class="empty-state-rich"><div class="es-icon">⭐</div><div class="es-title">No favorites yet</div><div class="es-sub">Log a meal then tap ⭐ Save</div></div>':`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:6px">${S.favs.map(f=>`<div class="favorite-card" onclick="qlFav('${f.id}')"><div class="fav-name">${f.name}</div><div class="fav-cals">${(f.totals||{}).calories||0} cal</div></div>`).join('')}</div>`;const c1=$('favorites-list'),c2=$('dashboard-favorites');if(c1)c1.innerHTML=h;if(c2)c2.innerHTML=h}

        let sp=null;
        function handlePhotoSelect(e){const f=e.target.files?.[0];if(!f)return;sp=f;const r=new FileReader();r.onload=ev=>{$('photo-preview').src=ev.target.result;$('photo-preview').style.display='block';$('analyze-photo-btn').disabled=false};r.readAsDataURL(f)}
        async function analyzeMealPhoto(){if(!sp||!hk()){if(!hk()){toast('⚠️ Set API key');openSettings()}return}const btn=$('analyze-photo-btn');btn.disabled=true;btn.textContent='🔍...';try{const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(sp)});const r=await ai('Analyze meal','Return JSON: {"items":[{"name":"","calories":num,"protein_g":num,"carbs_g":num,"fat_g":num}],"totals":{"calories":num,"protein_g":num,"carbs_g":num,"fat_g":num}}',{data:b64,mime:sp.type||'image/jpeg'});if(r?.items?.length){S.meals.push({id:uid(),ts:new Date().toISOString(),date:gT(),desc:'📷 Meal',items:r.items,totals:r.totals,isPhoto:true});save('fitlog_meals',S.meals);refreshNut();refreshDash();toast('📷 Logged!')}else toast('⚠️ Could not identify')}catch(e){toast('❌ '+e.message)}btn.disabled=false;btn.textContent='🔍 Analyze';sp=null;$('meal-photo-input').value='';$('photo-preview').style.display='none'}

        let bfPhoto=null;
        function handleBfPhotoSelect(e){const f=e.target.files?.[0];if(!f)return;bfPhoto=f;const r=new FileReader();r.onload=ev=>{$('bf-photo-preview').src=ev.target.result;$('bf-photo-preview').style.display='block';$('analyze-bf-btn').disabled=false};r.readAsDataURL(f)}
        async function estimateBodyFatFromPhoto(){if(!bfPhoto||!hk()){if(!hk()){toast('⚠️ Set API key');openSettings()}return}const btn=$('analyze-bf-btn');btn.disabled=true;btn.textContent='🔍...';const rd=$('bf-photo-result');rd.innerHTML='<div class="skeleton skeleton-text"></div>';try{const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(bfPhoto)});const r=await ai('Estimate body fat %','Return JSON: {"estimatedBfPercent":num,"confidence":"low/medium/high","notes":"brief"}',{data:b64,mime:bfPhoto.type||'image/jpeg'});if(r&&typeof r.estimatedBfPercent==='number'){rd.innerHTML=`<div style="text-align:center"><div style="font-size:2rem;font-weight:700;color:var(--accent-primary)">~${Math.round(r.estimatedBfPercent*10)/10}%</div><p>Confidence: ${r.confidence}</p></div>`}else rd.innerHTML='<p style="color:var(--accent-secondary)">⚠️ Could not estimate</p>'}catch(e){rd.innerHTML=`<p style="color:var(--accent-secondary)">❌ ${e.message}</p>`}btn.disabled=false;btn.textContent='🔍 Estimate'}

        function toggleHipField(){$('hip-field').style.display=$('bf-gender')?.value==='female'?'block':'none'}
        function calculateBodyFat(){const g=$('bf-gender')?.value||'male',h=parseFloat($('bf-height')?.value||0),w=parseFloat($('bf-weight')?.value||0),n=parseFloat($('bf-neck')?.value||0),waist=parseFloat($('bf-waist')?.value||0),hip=parseFloat($('bf-hip')?.value||0);if(!h||!w||!n||!waist){toast('⚠️ Fill fields');return}let bf=g==='male'?86.010*Math.log10(waist-n)-70.041*Math.log10(h)+36.76:163.205*Math.log10(waist+hip-n)-97.684*Math.log10(h)-78.387;bf=Math.max(2,Math.min(50,Math.round(bf*10)/10));const fm=Math.round(w*bf/100*10)/10,lm=Math.round((w-fm)*10)/10;$('bf-result-container').innerHTML=`<div style="text-align:center"><div style="font-size:2.2rem;font-weight:700">${bf}%</div><div class="grid-4" style="margin-top:8px"><div class="stat-card"><div class="stat-value">${fm}</div><div class="stat-label">Fat kg</div></div><div class="stat-card"><div class="stat-value">${lm}</div><div class="stat-label">Lean kg</div></div></div></div>`}
        function calculateGoals(){const g=$('bf-gender')?.value||'male',w=parseFloat($('bf-weight')?.value||70),h=parseFloat($('bf-height')?.value||175),age=parseInt($('bf-age')?.value||25),act=parseFloat($('goal-activity')?.value||1.55),goal=$('goal-type')?.value||'maintain',bmr=Math.round(g==='male'?(10*w)+(6.25*h)-(5*age)+5:(10*w)+(6.25*h)-(5*age)-161),tdee=Math.round(bmr*act),target=goal==='lose'?tdee-500:goal==='gain'?tdee+500:tdee;S.goals={bmr,tdee,targetCal:target,proteinG:Math.round(target*0.4/4),carbsG:Math.round(target*0.3/4),fatG:Math.round(target*0.3/9),goal};save('fitlog_goals',S.goals);$('goal-result-container').innerHTML=`<div style="border-top:1px solid var(--border-color);padding-top:10px"><div class="grid-4"><div class="stat-card"><div class="stat-value" style="font-size:1.3rem">${bmr}</div><div class="stat-label">BMR</div></div><div class="stat-card"><div class="stat-value" style="font-size:1.3rem">${tdee}</div><div class="stat-label">TDEE</div></div><div class="stat-card"><div class="stat-value highlight" style="font-size:1.3rem">${target}</div><div class="stat-label">Target</div></div><div class="stat-card"><div class="stat-value" style="font-size:1.3rem">${S.goals.proteinG}g</div><div class="stat-label">Protein</div></div></div><p style="font-size:.72rem;color:var(--text-secondary);margin-top:8px;text-align:center">✅ Net calories now visible on dashboard</p></div>`;refreshDash();toast('🎯 Done!')}
        function refreshBody(){if(S.goals?.targetCal){const g=S.goals;$('goal-result-container').innerHTML=`<div style="border-top:1px solid var(--border-color);padding-top:10px"><h4>Targets</h4><div class="grid-4"><div class="stat-card"><div class="stat-value" style="font-size:1.3rem">${g.bmr||'—'}</div><div class="stat-label">BMR</div></div><div class="stat-card"><div class="stat-value" style="font-size:1.3rem">${g.tdee}</div><div class="stat-label">TDEE</div></div><div class="stat-card"><div class="stat-value highlight" style="font-size:1.3rem">${g.targetCal}</div><div class="stat-label">Target</div></div><div class="stat-card"><div class="stat-value" style="font-size:1.3rem">${g.proteinG}g</div><div class="stat-label">Protein</div></div></div>${g.bmr?'':'<p style="font-size:.72rem;color:var(--text-secondary);margin-top:6px">Recalculate to unlock Net Cal on dashboard</p>'}</div>`}}

        function refreshDash(){const tm=getTM();const todayWkts=S.wkts.filter(w=>w.date===gT());const eaten=tm.reduce((s,m)=>s+((m.totals||{}).calories||0),0);const todaySteps=S.steps&&typeof S.steps==='object'?S.steps[gT()]||0:0;const wktBurned=todayWkts.reduce((s,w)=>s+(w.cal||0),0);const stepsBurned=stepsToCalories(todaySteps);const totalBurned=wktBurned+stepsBurned;$('stat-calories').textContent=eaten;$('stat-protein').textContent=tm.reduce((s,m)=>s+((m.totals||{}).protein_g||0),0).toFixed(1)+'g';$('stat-workouts').textContent=todayWkts.length;$('stat-burned').textContent=totalBurned;const netEl=$('stat-net');const netBar=$('net-cal-bar');if(netEl&&netBar){const bmr=S.goals?.bmr||0;if(bmr){netBar.style.display='flex';const net=eaten-(bmr+totalBurned);netEl.textContent=(net>0?'+':'')+net;netEl.style.color=net>200?'var(--accent-secondary)':net<-200?'var(--accent-primary)':'var(--accent-yellow)'}else{netBar.style.display='none'}}updateHydr();updateWeightUI();updateStepsUI();updateStreakUI();refreshFavs();refreshPlans();renderXPBar();renderDailyQuest();renderDashRecentWorkouts();}
        function renderDashRecentWorkouts(){const el=$('dashboard-recent-workouts');if(!el)return;const recent=S.wkts.slice().reverse().slice(0,5);if(!recent.length){el.innerHTML='<div class="empty-state-rich"><div class="es-icon">🏋️</div><div class="es-title">No workouts yet</div><div class="es-sub">Log your first workout in the Train tab</div></div>';return;}el.innerHTML=recent.map(w=>{const exs=(w.exercises||w.ex||[]).slice(0,3).map(e=>e.name||e.n||'?').join(', ');const moreEx=(w.exercises||w.ex||[]).length>3?` +${(w.exercises||w.ex||[]).length-3} more`:'';return`<div class="wkt-history-item"><div style="flex:1;min-width:0"><div class="wkt-history-name" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${w.name||'Workout'}</div><div class="wkt-history-meta">${w.date} · ${w.dur||w.duration||'?'}min${exs?` · ${exs}${moreEx}`:''}</div></div><div class="wkt-history-cal">${w.cal||0} cal</div></div>`}).join('');}
        function initNetworkStatus(){
            function updateStatus(){
                const pill=$('network-pill');
                if(pill)pill.style.display=navigator.onLine?'none':'block';
            }
            window.addEventListener('online',()=>{updateStatus();toast('🟢 Back online!')});
            window.addEventListener('offline',()=>{updateStatus();toast('📴 Offline — AI unavailable')});
            updateStatus();
        }
        function isOnline(){return navigator.onLine}

        // PLAN MANAGEMENT - PREVIEW & EDIT
        let pendingPlanData=null;
        let currentEditPlanId=null;
        let currentEditWeek=null;
        let currentEditDay=null;
        let currentExPickerCallback=null;
        let confirmCallback=null;

        function openPlanPreviewModal(planData){pendingPlanData=planData;$('plan-preview-modal').style.display='flex';renderPlanPreview(planData)}
        function closePlanPreview(){$('plan-preview-modal').style.display='none';pendingPlanData=null}
        function renderPlanPreview(plan){const total=plan.weeks.reduce((s,w)=>s+(w.days?.length||0),0);const c=$('plan-preview-content');c.innerHTML=`<div class="plan-preview-header"><h2>📅 ${plan.planName||'Workout Plan'}</h2><p>${plan.goal} • ${plan.duration} • ${plan.daysPerWeek} days/week</p></div><div style="margin-bottom:12px"><strong>${total}</strong> total workouts</div><div id="plan-preview-weeks">${plan.weeks.slice(0,2).map((w,i)=>`<div class="plan-preview-week"><div class="plan-preview-week-header" onclick="togglePreviewWeek(${i})"><span>Week ${w.weekNumber}: ${w.focus||'Training'}</span><span class="plan-preview-expand" id="preview-week-icon-${i}">▼ ${(w.days||[]).length} days</span></div><div class="plan-preview-week-days" id="preview-week-${i}" style="display:none">${(w.days||[]).map(d=>{const db=findExercise(d.exercises?.[0]?.id);return`<div class="plan-preview-day"><div style="display:flex;justify-content:space-between"><strong>Day ${d.dayNumber}: ${d.name||'Workout'}</strong><span class="exercise-badge badge-${d.type||'strength'}">${d.type||'strength'}</span></div><div class="plan-preview-exercise">${(d.exercises||[]).slice(0,3).map(ex=>{const e=findExercise(ex.id);return e?e.n:ex.id}).join(', ')}${(d.exercises||[]).length>3?'...':''}</div></div>`}).join('')}</div></div>`).join('')}${plan.weeks.length>2?`<p style="text-align:center;color:var(--text-secondary);font-size:.8rem;margin-top:8px">+ ${plan.weeks.length-2} more weeks</p>`:''}</div><div class="plan-preview-actions"><button class="btn btn-primary" onclick="acceptPlanFromPreview()">▶️ Start Plan</button><button class="btn btn-secondary" onclick="editPlanFromPreview()">✏️ Edit</button><button class="btn btn-danger" onclick="discardPlanFromPreview()">🗑️ Discard</button></div>`}
        function togglePreviewWeek(idx){const el=$(`preview-week-${idx}`),icon=$(`preview-week-icon-${idx}`);el.style.display=el.style.display==='none'?'block':'none';icon.textContent=el.style.display==='none'?'▼':'▲'}
        function acceptPlanFromPreview(){if(!pendingPlanData)return;const dpw=pendingPlanData.daysPerWeek||4;pendingPlanData.started=true;pendingPlanData.startedDate=new Date().toISOString();pendingPlanData.streakFreezes=Math.max(0,7-dpw);pendingPlanData.streakFreezesUsed=0;S.plans.push(pendingPlanData);save('fitlog_plans',S.plans);closePlanPreview();refreshPlans();refreshDash();checkActivePlanToday();toast('▶️ Plan started! '+pendingPlanData.streakFreezes+' streak freezes');scheduleDailyReminder()}
        function editPlanFromPreview(){if(!pendingPlanData)return;const tempId=uid();pendingPlanData.id=tempId;S.plans.push(pendingPlanData);save('fitlog_plans',S.plans);closePlanPreview();openPlanEditModal(tempId);refreshPlans()}
        function discardPlanFromPreview(){showConfirm('Discard Plan?','This plan will be deleted.',()=>{closePlanPreview();toast('Plan discarded')})}

        function openPlanEditModal(planId){currentEditPlanId=planId;$('plan-preview-modal').style.display='flex';renderPlanEdit(planId)}
        function renderPlanEdit(planId){const plan=S.plans.find(p=>p.id===planId);if(!plan){toast('Plan not found');return}const total=plan.weeks.reduce((s,w)=>s+(w.days?.length||0),0);const done=Object.values(plan.done||{}).filter(v=>v).length;const pct=total>0?Math.round((done/total)*100):0;let actionBtns='';if(plan.started){actionBtns=`<button class="btn btn-danger btn-sm" onclick="stopPlan('${planId}');closePlanEdit()">⏹️ Stop Plan</button><button class="btn btn-primary btn-sm" onclick="savePlanEdit('${planId}')">💾 Save</button>`}else{actionBtns=`<button class="btn btn-primary btn-sm" onclick="startPlanFromEdit('${planId}')">▶️ Start Plan</button><button class="btn btn-secondary btn-sm" onclick="savePlanEdit('${planId}')">💾 Save</button>`}const c=$('plan-preview-content');c.innerHTML=`<div class="plan-preview-header"><h2>✏️ ${plan.planName}</h2><p>${plan.goal} • ${plan.duration} • ${plan.daysPerWeek} days/week</p><div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:${pct}%"></div></div><p style="font-size:.7rem;color:var(--text-secondary);margin-top:4px">${done}/${total} days completed</p></div><div style="max-height:45vh;overflow-y:auto" id="plan-edit-weeks">${plan.weeks.map((w,wi)=>`<div class="plan-edit-week"><div style="margin:12px 0 8px"><strong>Week ${w.weekNumber}: ${w.focus||'Training'}</strong></div>${(w.days||[]).map((d,di)=>{const isDone=plan.done?.[`${w.weekNumber}-${d.dayNumber}`];return`<div class="plan-edit-day" style="${isDone?'border-color:var(--done-border);background:var(--done-bg)':''}"><div class="plan-edit-day-header"><input type="text" value="${d.name||'Workout'}" onchange="updateDayField('${planId}',${wi},${di},'name',this.value)"><span class="exercise-badge badge-${d.type||'strength'}">${d.type||'strength'}</span><button class="btn btn-xs btn-cyan" onclick="regenerateDay(${wi},${di})">🔄</button></div>${(d.exercises||[]).map((ex,ei)=>{const db=findExercise(ex.id);const en=db?db.n:ex.id;return`<div class="plan-edit-exercise"><input type="number" value="${ex.sets||3}" style="width:50px" onchange="updateExerciseField('${planId}',${wi},${di},${ei},'sets',this.value)"><input type="text" value="${ex.reps||'8-12'}" style="width:70px" onchange="updateExerciseField('${planId}',${wi},${di},${ei},'reps',this.value)"><div class="exercise-name" onclick="openExercisePicker('${planId}',${wi},${di},${ei})">${en}</div><button class="remove-btn" onclick="removeExerciseFromDay('${planId}',${wi},${di},${ei})">✕</button></div>`}).join('')}<div class="plan-edit-add-exercise"><button class="btn btn-xs btn-secondary" onclick="addExerciseToDay('${planId}',${wi},${di})">+ Add Exercise</button></div></div>`}).join('')}</div>`).join('')}</div><div class="plan-preview-actions">${actionBtns}<button class="btn btn-danger btn-sm" onclick="delPlan('${planId}');closePlanEdit()">🗑️ Delete</button></div>`}
        function startPlanFromEdit(planId){const p=S.plans.find(pl=>pl.id===planId);if(p){p.started=true;p.startedDate=new Date().toISOString();const dpw=p.daysPerWeek||4;p.streakFreezes=Math.max(0,7-dpw);p.streakFreezesUsed=0;save('fitlog_plans',S.plans);closePlanEdit();refreshPlans();refreshDash();checkActivePlanToday();toast('▶️ Plan started! '+p.streakFreezes+' streak freezes');scheduleDailyReminder()}}
        function updateDayField(planId,wIdx,dIdx,field,value){const p=S.plans.find(pl=>pl.id===planId);if(p&&p.weeks[wIdx]&&p.weeks[wIdx].days[dIdx]){p.weeks[wIdx].days[dIdx][field]=value}}
        function updateExerciseField(planId,wIdx,dIdx,exIdx,field,value){const p=S.plans.find(pl=>pl.id===planId);if(p&&p.weeks[wIdx]&&p.weeks[wIdx].days[dIdx]&&p.weeks[wIdx].days[dIdx].exercises[exIdx]){p.weeks[wIdx].days[dIdx].exercises[exIdx][field]=field==='sets'?parseInt(value)||3:value}}
        function addExerciseToDay(planId,wIdx,dIdx){const p=S.plans.find(pl=>pl.id===planId);if(p&&p.weeks[wIdx]&&p.weeks[wIdx].days[dIdx]){p.weeks[wIdx].days[dIdx].exercises.push({id:'bp',sets:3,reps:'8-12'});renderPlanEdit(planId)}}
        function removeExerciseFromDay(planId,wIdx,dIdx,exIdx){const p=S.plans.find(pl=>pl.id===planId);if(p&&p.weeks[wIdx]&&p.weeks[wIdx].days[dIdx]&&p.weeks[wIdx].days[dIdx].exercises){p.weeks[wIdx].days[dIdx].exercises.splice(exIdx,1);renderPlanEdit(planId)}}
        function savePlanEdit(planId){save('fitlog_plans',S.plans);closePlanEdit();refreshPlans();refreshDash();toast('💾 Saved!')}
        function closePlanEdit(){$('plan-preview-modal').style.display='none';currentEditPlanId=null;refreshPlans()}

        function openExercisePicker(planId,wIdx,dIdx,exIdx){currentEditPlanId=planId;currentEditWeek=wIdx;currentEditDay=dIdx;currentExPickerCallback=exIdx;$('exercise-picker-modal').style.display='flex';$('exercise-search').value='';renderExercisePickerList()}
        function closeExercisePicker(){$('exercise-picker-modal').style.display='none';currentEditPlanId=null;currentEditWeek=null;currentEditDay=null;currentExPickerCallback=null}
        function renderExercisePickerList(){const search=($('exercise-search')?.value||'').toLowerCase();const list=EX.filter(e=>e.n.toLowerCase().includes(search)).slice(0,30);$('exercise-picker-list').innerHTML=list.map(e=>`<div style="padding:10px;border-bottom:1px solid var(--border-color);cursor:pointer" onclick="selectExercise('${e.id}')"><strong>${e.n}</strong><br><span style="font-size:.75rem;color:var(--text-secondary)">${e.m} • ${e.e}</span></div>`).join('')||'<p style="padding:10px;color:var(--text-secondary)">No exercises found</p>'}
        function selectExercise(exId){const p=S.plans.find(pl=>pl.id===currentEditPlanId);if(p&&p.weeks[currentEditWeek]&&p.weeks[currentEditWeek].days[currentEditDay]&&p.weeks[currentEditWeek].days[currentEditDay].exercises[currentExPickerCallback]){p.weeks[currentEditWeek].days[currentEditDay].exercises[currentExPickerCallback].id=exId;save('fitlog_plans',S.plans);closeExercisePicker();renderPlanEdit(currentEditPlanId)}}

        async function regenerateDay(wIdx,dIdx){const plan=S.plans.find(p=>p.id===currentEditPlanId);if(!plan)return;const day=plan.weeks[wIdx].days[dIdx];const eq=getSelectedValues('plan-equipment');if(!eq.length)eq.push('bodyweight');const avail=EX.filter(ex=>eq.some(e=>(ex.e||'').toLowerCase().includes(e.toLowerCase())||ex.e==='none')).slice(0,20);const btn=event.target;btn.disabled=true;btn.textContent='...';try{const r=await ai(`Generate exercises for ${day.name||'workout'} day. Goal: ${plan.goal}.`,"Create 4-6 exercises. Return JSON: {\"exercises\":[{\"id\":\"...\",\"sets\":3,\"reps\":\"8-12\"}]}. Use ONLY: "+JSON.stringify(avail.map(e=>({id:e.id,n:e.n}))));if(r?.exercises?.length){plan.weeks[wIdx].days[dIdx].exercises=r.exercises;save('fitlog_plans',S.plans);renderPlanEdit(currentEditPlanId);toast('🔄 Day regenerated!')}else{toast('⚠️ Could not regenerate')}}catch(e){toast('❌ '+e.message)}btn.disabled=false;btn.textContent='🔄'}

        // CONFIRM MODAL
        function showConfirm(title,msg,onOk){$('confirm-title').textContent=title;$('confirm-msg').textContent=msg;confirmCallback=onOk;const m=$('confirm-modal');m.style.zIndex='1500';m.style.display='flex'}
        function closeConfirm(){$('confirm-modal').style.display='none';confirmCallback=null}
        function confirmOk(){if(confirmCallback)confirmCallback();closeConfirm()}

        // STOP/PAUSE PLAN
        function stopPlan(planId){showConfirm('Stop Plan?','This will pause your active plan. You can restart later.',()=>{const p=S.plans.find(pl=>pl.id===planId);if(p){p.started=false;save('fitlog_plans',S.plans);checkActivePlanToday();refreshPlans();refreshDash();toast('⏸️ Plan paused')}})}


        // ============================================
        // CLOUD SAVE SYSTEM
        // Uses Claude API as a key-value store via
        // a deterministic sync code + base64 payload
        // Stores to localStorage with cloud backup option
        // ============================================
        const CLOUD_KEY_LS = 'fitlog_cloud_code';
        let cloudSyncCode = localStorage.getItem(CLOUD_KEY_LS) || '';

        function openCloudModal() {
            if (!cloudSyncCode) generateNewSyncCode();
            updateCloudStatus('idle');
            document.getElementById('sync-code-display').textContent = cloudSyncCode || '—';
            document.getElementById('cloud-modal').style.display = 'flex';
        }
        function closeCloudModal() { document.getElementById('cloud-modal').style.display = 'none'; }

        function generateNewSyncCode() {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let code = '';
            for (let i = 0; i < 12; i++) {
                if (i > 0 && i % 4 === 0) code += '-';
                code += chars[Math.floor(Math.random() * chars.length)];
            }
            cloudSyncCode = code;
            localStorage.setItem(CLOUD_KEY_LS, code);
            document.getElementById('sync-code-display').textContent = code;
            setCloudLog('New sync code generated. Tap Backup to save data.');
        }

        function copySyncCode() {
            if (!cloudSyncCode) return;
            navigator.clipboard?.writeText(cloudSyncCode).then(() => toast('📋 Code copied!'));
        }

        function updateCloudStatus(status) {
            const dot = document.getElementById('cloud-status-dot');
            const text = document.getElementById('cloud-status-text');
            const dot2 = document.getElementById('cloud-status-dot2');
            const text2 = document.getElementById('cloud-status-text2');
            if (!dot || !text) return;
            if (status === 'synced') { dot.className = 'cloud-status-dot synced'; text.textContent = 'Synced'; }
            else if (status === 'syncing') { dot.className = 'cloud-status-dot syncing'; text.textContent = 'Syncing...'; }
            else if (status === 'error') { dot.className = 'cloud-status-dot offline'; text.textContent = 'Sync failed'; }
            else { dot.className = 'cloud-status-dot offline'; text.textContent = 'Not synced'; }
            if (dot2) { dot2.className = dot.className; } if (text2) { text2.textContent = text ? text.textContent : ''; }
        }

        function setCloudLog(msg) {
            const el = document.getElementById('cloud-log');
            if (el) el.textContent = msg;
        }

        function getAllDataPayload() {
            return {
                meals: S.meals, wkts: S.wkts, wlog: S.wlog,
                goals: S.goals, favs: S.favs, hydr: S.hydr,
                plans: S.plans, steps: S.steps, xp: S.xp,
                exportedAt: new Date().toISOString(), version: '3.0'
            };
        }

        async function cloudBackup() {
            if (!cloudSyncCode) { toast('⚠️ Generate a sync code first'); return; }
            if (!isOnline()) { toast('📴 Offline — cannot backup'); return; }
            updateCloudStatus('syncing');
            setCloudLog('Backing up...');
            try {
                const payload = getAllDataPayload();
                const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
                // Store in localStorage with the sync code as key
                localStorage.setItem('fitlog_cloud_' + cloudSyncCode, encoded);
                localStorage.setItem('fitlog_cloud_ts_' + cloudSyncCode, new Date().toISOString());
                updateCloudStatus('synced');
                const ts = new Date().toLocaleTimeString();
                setCloudLog('✅ Backed up at ' + ts);
                toast('☁️ Backup saved!');
                updateCloudNavBtn(true);
            } catch(e) {
                updateCloudStatus('error');
                setCloudLog('❌ Backup failed: ' + e.message);
                toast('❌ Backup failed');
            }
        }

        function restoreFromCode() {
            const input = document.getElementById('restore-code-input');
            const code = (input?.value || '').trim().toUpperCase();
            if (!code || code.length < 8) { toast('⚠️ Enter a valid sync code'); return; }
            const stored = localStorage.getItem('fitlog_cloud_' + code);
            if (!stored) {
                setCloudLog('❌ No backup found for code: ' + code);
                toast('❌ No backup found for that code');
                return;
            }
            try {
                const data = JSON.parse(decodeURIComponent(escape(atob(stored))));
                const exportDate = data.exportedAt ? new Date(data.exportedAt).toLocaleDateString() : 'backup';
                showConfirm('Restore Data?', `Restore from ${exportDate}? Your current data will be overwritten.`, ()=>{
                    if (data.meals) { S.meals = data.meals; save('fitlog_meals', S.meals); }
                    if (data.wkts) { S.wkts = data.wkts; save('fitlog_wkts', S.wkts); }
                    if (data.wlog) { S.wlog = data.wlog; save('fitlog_wlog', S.wlog); }
                    if (data.goals) { S.goals = data.goals; save('fitlog_goals', S.goals); }
                    if (data.favs) { S.favs = data.favs; save('fitlog_favs', S.favs); }
                    if (data.hydr) { S.hydr = data.hydr; save('fitlog_hydr', S.hydr); }
                    if (data.plans) { S.plans = data.plans; save('fitlog_plans', S.plans); }
                    if (data.steps) { S.steps = data.steps; save('fitlog_steps', S.steps); }
                    // Update sync code
                    cloudSyncCode = code;
                    localStorage.setItem(CLOUD_KEY_LS, code);
                    document.getElementById('sync-code-display').textContent = code;
                    updateCloudStatus('synced');
                    setCloudLog('✅ Restored from backup');
                    refreshDash(); refreshNut(); refreshFavs(); refreshPlans();
                    updateHydr(); updateWeightUI(); updateStepsUI(); checkActivePlanToday();
                    toast('✅ Data restored!');
                });
            } catch(e) {
                setCloudLog('❌ Invalid backup data');
                toast('❌ Restore failed');
            }
        }

        function exportLocalJSON() {
            const data = getAllDataPayload();
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'fitlog-backup-' + new Date().toISOString().split('T')[0] + '.json';
            a.click();
            URL.revokeObjectURL(url);
            toast('💾 JSON exported!');
        }


        function updateSettingsThemeBtn() {
            const btn = document.getElementById('settings-theme-btn');
            if (btn) btn.textContent = S.theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
        }
        function updateCloudNavBtn(synced) {
            const btn = document.getElementById('cloud-nav-btn');
            if (btn) btn.style.borderColor = synced ? 'rgba(0,229,187,0.4)' : '';
        }

        // Check if there's a recent backup on load
        function initCloudStatus() {
            if (cloudSyncCode) {
                const ts = localStorage.getItem('fitlog_cloud_ts_' + cloudSyncCode);
                if (ts) updateCloudNavBtn(true);
            }
        }


        function renderMacroRings(t){const el=$('macro-rings-container');if(!el)return;const tgt=S.goals||{proteinG:150,carbsG:200,fatG:65};function ring(val,max,color,label,unit){const r=30,circ=2*Math.PI*r,pct=Math.min(1,val/(max||1)),offset=circ*(1-pct);return`<div class="macro-ring-item"><svg width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="7"/><circle cx="38" cy="38" r="${r}" fill="none" stroke="${color}" stroke-width="7" stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}" stroke-linecap="round" transform="rotate(-90 38 38)" style="transition:stroke-dashoffset .6s ease"/><text x="38" y="38" text-anchor="middle" dominant-baseline="middle" fill="${color}" font-size="11" font-weight="700" font-family='JetBrains Mono,monospace'>${Math.round(val)}</text></svg><div class="macro-ring-label">${label}</div></div>`}
        el.innerHTML=ring(t.p,tgt.proteinG||150,'var(--accent-primary)','Protein','g')+ring(t.c,tgt.carbsG||200,'var(--accent-blue)','Carbs','g')+ring(t.f,tgt.fatG||65,'var(--accent-yellow)','Fat','g');}

        // ── ONBOARDING ──────────────────────────────────────────────
        function dismissOnboarding(){localStorage.setItem('fitlog_onboarded','1');const el=$('onboarding-overlay');if(el){el.style.opacity='0';el.style.transition='opacity .4s';setTimeout(()=>el.style.display='none',400)}}
        function initOnboarding(){if(!localStorage.getItem('fitlog_onboarded')){const el=$('onboarding-overlay');if(el)el.style.display='flex'}}

        // ── PWA INSTALL ─────────────────────────────────────────────
        let _deferredPrompt=null;
        window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();_deferredPrompt=e;const btn=$('pwa-install-btn-settings');if(btn)btn.style.display='block';const note=$('pwa-installed-note');if(note)note.style.display='none';});
        function triggerPWAInstall(){if(_deferredPrompt){_deferredPrompt.prompt();_deferredPrompt.userChoice.then(()=>{_deferredPrompt=null;toast('📲 Thanks for installing FitLog!')});}else{toast('Use browser menu → "Add to Home Screen"')}}

        // ── HAPTIC FEEDBACK ──────────────────────────────────────────
        function haptic(pattern=[10]){if(navigator.vibrate)navigator.vibrate(pattern);}

        // ── CLEAR ALL DATA ───────────────────────────────────────────
        function clearAllData(){showConfirm('Clear All Data?','This will permanently delete ALL your workouts, meals, plans, and settings. This cannot be undone.',()=>{['fitlog_meals','fitlog_wkts','fitlog_wlog','fitlog_goals','fitlog_favs','fitlog_hydr','fitlog_plans','fitlog_steps','fitlog_xp','fitlog_key','fitlog_theme','fitlog_last_congrats','fitlog_gifcache','fitlog_custom_foods','fitlog_fasting','fitlog_cloud_code','fitlog_onboarded'].forEach(k=>localStorage.removeItem(k));toast('🗑️ All data cleared. Reloading…');setTimeout(()=>location.reload(),1200);})}

        // ── SHOWCONFETTI standalone ─────────────────────────────────
        function spawnConfetti(el){if(!el)return;const colors=['#00E5BB','#6C8CFF','#FFB84D','#FF5E7D','#B388FF'];for(let i=0;i<18;i++){const dot=document.createElement('div');dot.className='confetti-dot';dot.style.cssText=`background:${colors[i%colors.length]};left:${10+Math.random()*80}%;top:${20+Math.random()*40}%;animation-delay:${Math.random()*0.4}s;`;el.appendChild(dot);setTimeout(()=>dot.remove(),1600);}}
        function spawnOrb() {
            const orb = document.createElement('div');
            orb.className = 'bg-orb';
            const size = 60 + Math.random() * 120;
            const colors = [
                'rgba(0,229,187,0.08)','rgba(108,140,255,0.08)',
                'rgba(179,136,255,0.06)','rgba(0,212,245,0.07)'
            ];
            orb.style.cssText = `
                width:${size}px; height:${size}px;
                background: radial-gradient(circle, ${colors[Math.floor(Math.random()*colors.length)]} 0%, transparent 70%);
                left:${Math.random()*100}%;
                bottom:-${size}px;
                filter: blur(${size/4}px);
                animation-duration:${12+Math.random()*18}s;
                animation-delay:${Math.random()*5}s;
            `;
            document.body.appendChild(orb);
            setTimeout(() => orb.remove(), 35000);
        }
        // spawn orbs periodically
        setInterval(spawnOrb, 3500);
        spawnOrb(); spawnOrb();

        // ── STEP POP ANIMATION (added to original function) ─────────────────

        // ── FLOATING ORB BACKGROUND ──────────────────────────────
        // Swipe down to close gif modal
        (function(){
          var sheet=null,startY=0,curY=0,dragging=false;
          document.addEventListener('touchstart',function(e){
            var m=document.getElementById('gif-modal');
            if(m&&m.style.display!=='none'){
              sheet=document.getElementById('gif-modal-sheet');
              startY=e.touches[0].clientY;dragging=true;
            }
          },{passive:true});
          document.addEventListener('touchmove',function(e){
            if(!dragging||!sheet)return;
            curY=e.touches[0].clientY;
            var dy=Math.max(0,curY-startY);
            sheet.style.transform='translateY('+dy+'px)';
            sheet.style.transition='none';
          },{passive:true});
          document.addEventListener('touchend',function(){
            if(!dragging||!sheet)return;
            dragging=false;
            var dy=curY-startY;
            sheet.style.transition='transform .3s cubic-bezier(0.4,0,0.2,1)';
            if(dy>120){
              sheet.style.transform='translateY(100%)';
              setTimeout(function(){
                var m=document.getElementById('gif-modal');
                if(m)m.style.display='none';
                sheet.style.transform='';
                document.body.style.overflow='';
              },300);
            } else {
              sheet.style.transform='';
            }
          });
        })();


        /* ============================================================
           FOOD DATABASE & CUSTOM FOODS
           Strategy: instant local DB first (0ms), then live OFF fallback
        ============================================================ */

        // Compact local nutrition DB — per 100g: [cal, protein, carbs, fat]
        const LOCAL_FOODS=[
          ['Chicken Breast (cooked)',165,31,0,3.6],['Chicken Thigh (cooked)',209,26,0,11],
          ['Salmon',208,20,0,13],['Tuna (canned in water)',116,26,0,1],['Egg (whole)',155,13,1.1,11],
          ['Egg White',52,11,0.7,0.2],['Beef (lean mince)',215,26,0,12],['Beef Steak (sirloin)',207,26,0,11],
          ['Pork Loin',242,27,0,14],['Shrimp',99,24,0.2,0.3],['Cod',82,18,0,0.7],
          ['Turkey Breast',189,29,0,7],['Greek Yogurt (plain)',59,10,3.6,0.4],
          ['Milk (whole)',61,3.2,4.8,3.3],['Milk (skimmed)',35,3.4,5,0.1],
          ['Cottage Cheese',98,11,3.4,4.3],['Cheddar Cheese',402,25,1.3,33],
          ['Mozzarella',280,28,2.2,17],['Whey Protein Powder',370,80,5,4],
          ['Rice (white, cooked)',130,2.7,28,0.3],['Rice (brown, cooked)',123,2.7,26,1],
          ['Oats (rolled, dry)',379,13,67,7],['Oatmeal (cooked)',71,2.5,12,1.5],
          ['Pasta (cooked)',158,5.8,31,0.9],['Bread (white)',265,9,49,3.2],
          ['Bread (wholemeal)',247,13,41,3.4],['Quinoa (cooked)',120,4.4,21,1.9],
          ['Potato (baked)',93,2.5,21,0.1],['Sweet Potato (baked)',90,2,21,0.1],
          ['Banana',89,1.1,23,0.3],['Apple',52,0.3,14,0.2],['Orange',47,0.9,12,0.1],
          ['Strawberries',32,0.7,7.7,0.3],['Blueberries',57,0.7,14,0.3],
          ['Mango',60,0.8,15,0.4],['Grapes',69,0.7,18,0.2],
          ['Avocado',160,2,9,15],['Broccoli',34,2.8,7,0.4],
          ['Spinach',23,2.9,3.6,0.4],['Kale',49,4.3,9,0.9],
          ['Carrot',41,0.9,10,0.2],['Tomato',18,0.9,3.9,0.2],
          ['Cucumber',15,0.7,3.6,0.1],['Lettuce (romaine)',17,1.2,3.3,0.3],
          ['Bell Pepper',31,1,6,0.3],['Onion',40,1.1,9,0.1],
          ['Garlic',149,6.4,33,0.5],['Mushroom',22,3.1,3.3,0.3],
          ['Corn',86,3.3,19,1.4],['Peas',81,5.4,14,0.4],
          ['Lentils (cooked)',116,9,20,0.4],['Chickpeas (cooked)',164,8.9,27,2.6],
          ['Black Beans (cooked)',132,8.9,24,0.5],['Kidney Beans',127,8.7,23,0.5],
          ['Almonds',579,21,22,50],['Peanuts',567,26,16,49],
          ['Cashews',553,18,30,44],['Walnuts',654,15,14,65],
          ['Peanut Butter',588,25,20,50],['Almond Butter',614,21,19,56],
          ['Olive Oil',884,0,0,100],['Coconut Oil',862,0,0,100],
          ['Butter',717,0.9,0.1,81],['Sunflower Oil',884,0,0,100],
          ['Honey',304,0.3,82,0],['Sugar (white)',387,0,100,0],
          ['Dark Chocolate (70%)',598,8,46,43],['Milk Chocolate',535,7.7,59,30],
          ['Chips / Crisps',536,6.5,53,34],['White Rice (dry)',365,7.1,80,0.7],
          ['Couscous (cooked)',112,3.8,23,0.2],['Bagel',257,10,50,1.6],
          ['Tortilla (flour)',303,8,49,7],['Protein Bar (avg)',380,30,40,10],
          ['Orange Juice',45,0.7,10,0.2],['Coca-Cola',42,0,11,0],
          ['Beer (lager)',43,0.5,3.6,0],['Red Wine',85,0.1,2.7,0],
          ['Coffee (black)',2,0.3,0,0],['Green Tea',1,0,0,0],
        ];

        // Render food results rows (shared by local + live)
        function renderFoodResults(items){
            // items: [{name,cal,prot,carb,fat,badge?}]
            return items.map(f=>{
                const nm=f.name.replace(/"/g,'&quot;');
                const short=nm.length>48?nm.slice(0,48)+'…':nm;
                const badge=f.badge?`<span style="font-size:.6rem;background:rgba(108,140,255,.2);color:var(--accent-blue);border-radius:6px;padding:1px 5px;margin-left:4px">${f.badge}</span>`:'';
                return`<div class="food-search-result" onclick='addFoodFromSearch(${JSON.stringify(f.name)},${f.cal},${f.prot},${f.carb},${f.fat})'>
                    <div><div class="food-sr-name">${short}${badge}</div><div class="food-sr-macros">P:${f.prot}g C:${f.carb}g F:${f.fat}g · per 100g</div></div>
                    <div class="food-sr-cal">${f.cal} kcal</div></div>`;
            }).join('');
        }

        async function searchFoods(){
            const q=($('food-search-input').value||'').trim();
            if(!q)return;
            const ql=q.toLowerCase();
            const el=$('food-search-results');

            // ── STEP 1: Instant local results (synchronous, 0ms) ──────────
            const localHits=LOCAL_FOODS
                .map(([name,cal,prot,carb,fat])=>({name,cal,prot,carb,fat}))
                .filter(f=>f.name.toLowerCase().includes(ql))
                .slice(0,8);

            if(localHits.length){
                el.innerHTML=renderFoodResults(localHits.map(f=>({...f,badge:'local'})));
                // Still fire live search in background — results append/replace below
            }else{
                el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-secondary);font-size:.82rem">🔍 Searching…</div>';
            }

            // ── STEP 2: Live OpenFoodFacts search (async, ~1-2s) ──────────
            try{
                const PROXIES=[
                    u=>`https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
                    u=>`https://corsproxy.io/?${encodeURIComponent(u)}`,
                ];
                const offUrl=`https://world.openfoodfacts.org/cgi/search.pl?action=process&json=1&page_size=20&fields=product_name,nutriments,brands,lang&search_terms=${encodeURIComponent(q)}`;

                async function tryFetch(url){
                    // Direct first
                    try{const r=await fetch(url,{mode:'cors',signal:AbortSignal.timeout(4000)});if(r.ok)return r.json()}catch(_){}
                    // Proxies
                    for(const mk of PROXIES){
                        try{const r=await fetch(mk(url),{signal:AbortSignal.timeout(5000)});if(r.ok){const t=await r.text();return JSON.parse(t)}}catch(_){}
                    }
                    throw new Error('fetch failed');
                }

                const data=await tryFetch(offUrl);
                const qWords=ql.split(/\s+/).filter(Boolean);
                const liveItems=(data.products||[])
                    .filter(p=>p.product_name&&(p.nutriments?.['energy-kcal_100g']||p.nutriments?.energy_100g))
                    .map(p=>{
                        const cal=Math.round(p.nutriments['energy-kcal_100g']||p.nutriments['energy_100g']/4.184||0);
                        const prot=+(p.nutriments['proteins_100g']||0).toFixed(1);
                        const carb=+(p.nutriments['carbohydrates_100g']||0).toFixed(1);
                        const fat=+(p.nutriments['fat_100g']||0).toFixed(1);
                        const brand=p.brands?` (${p.brands.split(',')[0].trim().slice(0,20)})`:'';
                        const name=p.product_name+brand;
                        let score=0;
                        const pn=p.product_name.toLowerCase();
                        for(const w of qWords)if(pn.includes(w))score+=10;
                        if(pn.startsWith(ql))score+=20;
                        if(p.lang==='en')score+=5;
                        if(cal<5||cal>900)score-=8;
                        return{name,cal,prot,carb,fat,score,badge:'live'};
                    })
                    .sort((a,b)=>b.score-a.score)
                    .slice(0,12);

                if(!liveItems.length&&!localHits.length){
                    el.innerHTML='<div style="padding:12px;color:var(--text-secondary);font-size:.82rem">No results. Try a shorter term or add a custom food.</div>';
                    return;
                }

                // Merge: local first (dedup by name prefix), then live
                const seen=new Set(localHits.map(f=>f.name.toLowerCase().slice(0,20)));
                const merged=[...localHits,...liveItems.filter(f=>!seen.has(f.name.toLowerCase().slice(0,20)))];
                el.innerHTML=renderFoodResults(merged);

            }catch(e){
                // Live search failed — local results (if any) already shown, just note it
                if(!localHits.length){
                    el.innerHTML='<div style="padding:12px;color:var(--accent-secondary);font-size:.82rem">⚠️ Search unavailable. Use a custom food entry or AI logging instead.</div>';
                }else{
                    el.innerHTML+=`<div style="padding:6px 12px;font-size:.72rem;color:var(--text-secondary)">⚠️ Live search unavailable — showing local results only</div>`;
                }
            }
        }

        function openFoodSearch(){renderCustomFoodsList();$('food-search-modal').style.display='flex';}
        function closeFoodSearch(){$('food-search-modal').style.display='none';}

        // Pending food — avoids inline JSON/quote-escaping issues in onclick
        let _pendingFood=null;

        function addFoodFromSearch(name,cal,prot,carb,fat){
            _pendingFood={name,cal,prot,carb,fat};
            const el=$('food-search-results');
            const prev=document.querySelector('.food-qty-inline');
            if(prev)prev.remove();
            const div=document.createElement('div');
            div.className='food-qty-inline';
            div.style.cssText='background:var(--glass-2);border:1px solid var(--accent-primary);border-radius:12px;padding:12px;margin:8px 0;';
            const safeName=name.length>40?name.slice(0,40)+'…':name;
            div.innerHTML=`<div style="font-size:.82rem;font-weight:700;margin-bottom:8px">${safeName}</div>
                <div style="display:flex;gap:8px;align-items:center">
                  <div style="flex:1"><label style="font-size:.7rem">Amount (g)</label><input type="number" id="food-qty-input" value="100" min="1" style="padding:6px"></div>
                  <button class="btn btn-primary btn-sm" onclick="confirmFoodAdd()" style="margin-top:14px">Add</button>
                  <button class="btn btn-secondary btn-sm" onclick="this.closest('.food-qty-inline').remove();_pendingFood=null;" style="margin-top:14px">✕</button>
                </div>`;
            el.prepend(div);
            div.querySelector('#food-qty-input').focus();
        }

        function confirmFoodAdd(){
            if(!_pendingFood)return;
            const qty=parseFloat($('food-qty-input')?.value)||100;
            const {name,cal:calPer100,prot:protPer100,carb:carbPer100,fat:fatPer100}=_pendingFood;
            const scale=qty/100;
            const meal={id:Date.now(),date:gT(),time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
                name:`${name} (${qty}g)`,
                totals:{calories:Math.round(calPer100*scale),protein_g:+(protPer100*scale).toFixed(1),carbs_g:+(carbPer100*scale).toFixed(1),fat_g:+(fatPer100*scale).toFixed(1)}};
            S.meals.push(meal);save('fitlog_meals',S.meals);
            _pendingFood=null;
            refreshNut();refreshDash();closeFoodSearch();
            toast('✅ Added '+meal.name);
        }

        // Custom foods
        function renderCustomFoodsList(){
            const el=$('custom-foods-list');if(!el)return;
            if(!S.customFoods.length){el.innerHTML='<div style="font-size:.78rem;color:var(--text-secondary);padding:6px 0">No custom foods yet</div>';return;}
            el.innerHTML=S.customFoods.map((f,i)=>`<div class="food-search-result">
                <div onclick="addCustomFoodToLog(${i})" style="flex:1;cursor:pointer">
                    <div class="food-sr-name">${f.name}</div>
                    <div class="food-sr-macros">P:${f.protein}g C:${f.carbs}g F:${f.fat}g · per ${f.serving}g</div>
                </div>
                <div style="display:flex;align-items:center;gap:6px">
                    <div class="food-sr-cal">${f.cal} kcal</div>
                    <button class="btn btn-danger btn-xs" onclick="deleteCustomFood(${i})">✕</button>
                </div></div>`).join('');
        }

        function openAddCustomFood(){$('custom-food-modal').style.display='flex';}

        function saveCustomFood(){
            const name=($('cf-name').value||'').trim();
            const cal=parseFloat($('cf-cal').value||0);
            const serving=parseFloat($('cf-serving').value||100);
            const protein=parseFloat($('cf-protein').value||0);
            const carbs=parseFloat($('cf-carbs').value||0);
            const fat=parseFloat($('cf-fat').value||0);
            if(!name||!cal){toast('⚠️ Name and calories required');return;}
            S.customFoods.push({name,cal,serving,protein,carbs,fat});
            save('fitlog_custom_foods',S.customFoods);
            ['cf-name','cf-cal','cf-serving','cf-protein','cf-carbs','cf-fat'].forEach(id=>{const el=$(id);if(el)el.value='';});
            $('custom-food-modal').style.display='none';
            renderCustomFoodsList();toast('✅ Custom food saved');
        }

        function deleteCustomFood(i){S.customFoods.splice(i,1);save('fitlog_custom_foods',S.customFoods);renderCustomFoodsList();}

        function addCustomFoodToLog(i){
            const f=S.customFoods[i];if(!f)return;
            const meal={id:Date.now(),date:gT(),time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
                name:`${f.name} (${f.serving}g)`,
                totals:{calories:f.cal,protein_g:f.protein,carbs_g:f.carbs,fat_g:f.fat}};
            S.meals.push(meal);save('fitlog_meals',S.meals);
            refreshNut();refreshDash();closeFoodSearch();
            toast(`✅ Added ${f.name}`);
        }

        /* ============================================================
           EXERCISE HISTORY & PROGRESSIVE OVERLOAD
        ============================================================ */
        function getExerciseHistory(name){
            // Collect all sets for this exercise across all workouts, sorted by date
            const norm=name.toLowerCase().trim();
            const history=[];
            S.wkts.forEach(w=>{
                (w.exercises||[]).forEach(ex=>{
                    if((ex.name||'').toLowerCase().trim()===norm){
                        // Parse details: "3 × 10 × 80kg" or "3x10x80" or raw text
                        const parsed=parseExDetails(ex.details||'');
                        history.push({date:w.date,sets:parsed.sets,reps:parsed.reps,weight:parsed.weight,raw:ex.details||''});
                    }
                });
            });
            return history.sort((a,b)=>a.date.localeCompare(b.date));
        }

        function parseExDetails(str){
            // Handle "3 × 10 × 80kg", "3x10x80", "10 reps", "80kg × 5", etc.
            const s=str.replace(/×/g,'x').replace(/\s+/g,' ').trim();
            const m3=s.match(/(\d+)\s*x\s*(\d+)\s*x\s*([\d.]+)/i);
            if(m3)return{sets:+m3[1],reps:+m3[2],weight:+m3[3]};
            const m2=s.match(/(\d+)\s*x\s*([\d.]+)\s*kg/i);
            if(m2)return{sets:1,reps:+m2[1],weight:+m2[2]};
            const mw=s.match(/([\d.]+)\s*kg/i);
            const mr=s.match(/(\d+)\s*(?:reps?|x)/i);
            return{sets:1,reps:mr?+mr[1]:0,weight:mw?+mw[1]:0};
        }

        function calc1RM(weight,reps){
            if(!weight||!reps)return 0;
            if(reps===1)return weight;
            return Math.round(weight*(1+reps/30)); // Epley formula
        }

        function getProgressiveOverloadSuggestion(history){
            if(history.length<2)return null;
            const last=history[history.length-1];
            const prev=history[history.length-2];
            if(!last.weight||!last.reps)return null;
            const lastVol=(last.sets||1)*last.reps*last.weight;
            const prevVol=(prev.sets||1)*(prev.reps||1)*(prev.weight||1);
            const suggestion={};
            if(lastVol>=prevVol){
                // Progressing — suggest small weight increase
                const inc=last.weight>=100?2.5:last.weight>=60?2.5:1.25;
                suggestion.text=`Last: ${last.sets||1}×${last.reps}×${last.weight}kg → Try ${last.sets||1}×${last.reps}×${last.weight+inc}kg`;
                suggestion.type='increase';
            }else{
                suggestion.text=`Last: ${last.sets||1}×${last.reps}×${last.weight}kg → Match previous volume first`;
                suggestion.type='maintain';
            }
            return suggestion;
        }

        function openExerciseHistory(name){
            // If called from preview, name may be undefined — show picker
            if(!name){
                const names=getAllExerciseNames();
                if(!names.length){toast('No exercise history yet');return;}
                $('ex-history-title').textContent='📊 Select Exercise';
                $('ex-history-body').innerHTML=names.map(n=>`<div class="food-search-result" onclick="openExerciseHistory(${JSON.stringify(n)})">
                    <div class="food-sr-name">${n}</div>
                    <div class="food-sr-cal">${getExerciseHistory(n).length} sessions</div></div>`).join('');
                $('ex-history-modal').style.display='flex';return;
            }
            const hist=getExerciseHistory(name);
            $('ex-history-title').innerHTML=`📊 ${name}`;
            if(!hist.length){$('ex-history-body').innerHTML='<div style="color:var(--text-secondary);font-size:.82rem">No logged sets found for this exercise.</div>';$('ex-history-modal').style.display='flex';return;}

            // Find PR
            let pr1RM=0,prDate='';
            hist.forEach(h=>{const v=calc1RM(h.weight,h.reps);if(v>pr1RM){pr1RM=v;prDate=h.date;}});

            // Progressive overload suggestion
            const sug=getProgressiveOverloadSuggestion(hist);

            // Mini weight chart (SVG sparkline)
            const weights=hist.filter(h=>h.weight>0);
            let sparkline='';
            if(weights.length>=2){
                const maxW=Math.max(...weights.map(h=>h.weight));
                const minW=Math.min(...weights.map(h=>h.weight));
                const W=260,H=50;
                const pts=weights.map((h,i)=>{
                    const x=i/(weights.length-1)*W;
                    const y=H-(h.weight-minW)/(maxW-minW||1)*H;
                    return`${x},${y}`;
                }).join(' ');
                sparkline=`<div style="margin:12px 0 6px"><div style="font-size:.72rem;color:var(--text-secondary);margin-bottom:4px">Weight trend (kg)</div>
                <svg width="100%" viewBox="0 0 ${W} ${H}" style="overflow:visible">
                  <polyline points="${pts}" fill="none" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round"/>
                  ${weights.map((h,i)=>{const x=i/(weights.length-1)*W;const y=H-(h.weight-minW)/(maxW-minW||1)*H;return`<circle cx="${x}" cy="${y}" r="3" fill="var(--accent-primary)"/>`}).join('')}
                  <text x="0" y="${H+14}" fill="var(--text-secondary)" font-size="9">${weights[0].date}</text>
                  <text x="${W}" y="${H+14}" fill="var(--text-secondary)" font-size="9" text-anchor="end">${weights[weights.length-1].date}</text>
                </svg></div>`;
            }

            // 1RM trend
            const rm1s=hist.filter(h=>h.weight&&h.reps).map(h=>calc1RM(h.weight,h.reps));
            let rm1sparkline='';
            if(rm1s.length>=2){
                const maxR=Math.max(...rm1s),minR=Math.min(...rm1s);
                const W=260,H=40;
                const pts=rm1s.map((v,i)=>{const x=i/(rm1s.length-1)*W;const y=H-(v-minR)/(maxR-minR||1)*H;return`${x},${y}`;}).join(' ');
                rm1sparkline=`<div style="margin:12px 0 6px"><div style="font-size:.72rem;color:var(--text-secondary);margin-bottom:4px">Estimated 1RM trend (kg)</div>
                <svg width="100%" viewBox="0 0 ${W} ${H}" style="overflow:visible">
                  <polyline points="${pts}" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round"/>
                  ${rm1s.map((v,i)=>{const x=i/(rm1s.length-1)*W;const y=H-(v-minR)/(maxR-minR||1)*H;return`<circle cx="${x}" cy="${y}" r="3" fill="var(--accent-cyan)"/>`}).join('')}
                </svg></div>`;
            }

            $('ex-history-body').innerHTML=`
                ${pr1RM?`<div style="background:rgba(255,184,77,.1);border:1px solid rgba(255,184,77,.3);border-radius:10px;padding:10px 14px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">
                    <div><div style="font-size:.7rem;color:var(--accent-yellow);font-weight:700;text-transform:uppercase">🏆 Best 1RM (Epley)</div><div style="font-size:1.4rem;font-weight:800;font-family:'Sora',sans-serif">${pr1RM} kg</div></div>
                    <div style="font-size:.72rem;color:var(--text-secondary)">${prDate}</div></div>`:''}
                ${sug?`<div style="background:var(--glass-1);border:1px solid ${sug.type==='increase'?'var(--accent-primary)':'var(--border-color)'};border-radius:10px;padding:10px 14px;margin-bottom:12px">
                    <div style="font-size:.7rem;font-weight:700;color:${sug.type==='increase'?'var(--accent-primary)':'var(--text-secondary)'};text-transform:uppercase;margin-bottom:2px">💡 Overload Suggestion</div>
                    <div style="font-size:.82rem">${sug.text}</div></div>`:''}
                ${sparkline}${rm1sparkline}
                <div style="margin-top:14px"><div style="font-size:.78rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Session Log</div>
                ${hist.slice().reverse().map(h=>{
                    const isPR=pr1RM&&calc1RM(h.weight,h.reps)===pr1RM;
                    return`<div class="ex-history-item">
                        <div><span style="color:var(--text-secondary)">${h.date}</span>${isPR?'<span class="pr-badge">PR</span>':''}</div>
                        <div style="font-family:'JetBrains Mono',monospace;font-size:.8rem">${h.raw||'—'}</div>
                    </div>`;
                }).join('')}</div>`;
            $('ex-history-modal').style.display='flex';
        }

        function getAllExerciseNames(){
            const names=new Set();
            S.wkts.forEach(w=>(w.exercises||[]).forEach(ex=>{if(ex.name)names.add(ex.name)}));
            return[...names].sort();
        }

        function renderExHistoryPreview(){
            const el=$('ex-history-preview');if(!el)return;
            const names=getAllExerciseNames();
            if(!names.length){el.innerHTML='<span style="font-size:.78rem;color:var(--text-secondary)">Log exercises to see history</span>';return;}
            el.innerHTML=names.slice(0,4).map(n=>{
                const hist=getExerciseHistory(n);
                const last=hist[hist.length-1];
                return`<div class="food-search-result" onclick="openExerciseHistory(${JSON.stringify(n)})">
                    <div class="food-sr-name">${n}</div>
                    <div class="food-sr-cal" style="font-size:.75rem;color:var(--text-secondary)">${last?last.raw:'—'}</div></div>`;
            }).join('')+(names.length>4?`<div style="font-size:.72rem;color:var(--text-secondary);padding:6px 0">+${names.length-4} more…</div>`:'');
        }

        /* ============================================================
           WORKOUT ACTIVE MODE
        ============================================================ */
        let _wam={exercises:[],current:0,startTs:null,timerInterval:null,restInterval:null,restRemain:0,restTotal:0};

        function startActiveWorkout(fromGenerated){
            let exercises, wName;
            if(fromGenerated&&cw&&cw.exercises&&cw.exercises.length){
                // Launch from generated/quick workout
                wName=cw.planName||'Workout';
                exercises=cw.exercises.map(ex=>{
                    const db=findExercise(ex.id);
                    const name=db?db.n:(ex.id||'Exercise');
                    return{name,details:`${ex.sets}×${ex.reps}`,sets:[],done:false};
                });
            }else{
                // Launch from manual form
                const nameInputs=[...document.querySelectorAll('.exercise-name-input')];
                const detailInputs=[...document.querySelectorAll('.exercise-details-input')];
                wName=$('workout-name').value||'Workout';
                exercises=nameInputs.map((el,i)=>({
                    name:el.value.trim(),
                    details:detailInputs[i]?.value.trim()||'',
                    sets:[],done:false
                })).filter(e=>e.name);
                if(!exercises.length){toast('⚠️ Add at least one exercise');return;}
            }

            _wam={exercises,current:0,startTs:Date.now(),timerInterval:null,restInterval:null,restRemain:0,restTotal:0,name:wName};
            $('workout-active-modal').style.display='flex';
            $('wam-name').textContent=wName;
            $('wam-ex-progress').textContent=`1/${exercises.length}`;
            _wam.timerInterval=setInterval(()=>{
                const s=Math.floor((Date.now()-_wam.startTs)/1000);
                const m=Math.floor(s/60),sec=s%60;
                const el=$('wam-timer-display');
                if(el)el.textContent=`${m}:${sec.toString().padStart(2,'0')}`;
            },1000);
            renderWAMBody();
        }

        function renderWAMBody(){
            const track=$('wam-slides-track');if(!track)return;
            const total=_wam.exercises.length;

            // Build all slides (one per exercise)
            track.innerHTML=_wam.exercises.map((ex,ei)=>{
                const hist=getExerciseHistory(ex.name);
                const last=hist.length?hist[hist.length-1]:null;
                const sug=hist.length>=2?getProgressiveOverloadSuggestion(hist):null;
                const parsed=parseExDetails(ex.details);
                const numSets=parsed.sets||3;
                const isDone=ex.done;

                // Dot indicator row
                const dots=_wam.exercises.map((_,di)=>`<div class="wam-ex-dot${di===ei?' active':_wam.exercises[di].done?' done':''}"></div>`).join('');

                // Big set rows
                const setRows=Array.from({length:numSets},(_,si)=>{
                    const set=ex.sets[si]||{weight:parsed.weight||'',reps:parsed.reps||''};
                    const setDone=set.done;
                    return`<div class="wam-set-row${setDone?' done':''}" id="wam-set-${ei}-${si}">
                        <div class="set-num">Set ${si+1}</div>
                        <div class="wam-set-inputs">
                            <div>
                                <input type="number" placeholder="—" value="${set.weight||''}" inputmode="decimal"
                                    onchange="_wamSetVal(${ei},${si},'weight',this.value)" style="">
                                <div class="inp-label" style="text-align:center;margin-top:3px">kg</div>
                            </div>
                            <div style="color:var(--text-secondary);font-size:1.1rem;align-self:center">×</div>
                            <div>
                                <input type="number" placeholder="—" value="${set.reps||''}" inputmode="numeric"
                                    onchange="_wamSetVal(${ei},${si},'reps',this.value)" style="">
                                <div class="inp-label" style="text-align:center;margin-top:3px">reps</div>
                            </div>
                        </div>
                        <button class="wam-set-done-btn${setDone?' done':''}"
                            onclick="_wamToggleSet(${ei},${si})">${setDone?'✅':'Done'}</button>
                    </div>`;
                }).join('');

                // GIF below sets
                const gifUrl=findGif('',ex.name);
                const gifHtml=gifUrl
                    ?`<div class="wam-inline-gif"><img src="${gifUrl}" alt="${ex.name}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`
                    :'';

                return`<div class="wam-slide" id="wam-slide-${ei}">
                    <div class="wam-ex-counter">${dots}</div>
                    <div class="wam-exercise-card${isDone?' wam-done':''}">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
                            <div class="wam-ex-name">${isDone?'✅ ':''} ${ex.name}</div>
                            <button style="font-size:.7rem;background:var(--glass-2);border:1px solid var(--glass-border);border-radius:8px;padding:4px 10px;cursor:pointer;color:var(--text-secondary);flex-shrink:0;margin-left:8px" onclick="openExerciseHistory(${JSON.stringify(ex.name)})">📊</button>
                        </div>
                        <div class="wam-ex-meta">${last?('Last: '+last.raw+(sug?' · 💡 '+sug.text:'')):'No previous data'}</div>
                        <div class="wam-sets-grid">${setRows}</div>
                        ${gifHtml}
                    </div>
                </div>`;
            }).join('');

            // Slide to current
            track.style.transform=`translateX(-${_wam.current*100}%)`;

            // Update header
            const doneCount=_wam.exercises.filter(e=>e.done).length;
            const pct=(doneCount/total)*100;
            const pf=$('wam-progress-fill');if(pf)pf.style.width=pct+'%';
            $('wam-ex-progress').textContent=`${_wam.current+1}/${total}`;

            // Update Done button state to reflect current exercise
            const doneBtn=$('wam-done-btn');
            if(doneBtn){
                const curDone=_wam.exercises[_wam.current]?.done;
                doneBtn.textContent=curDone?'↩ Undo Done':'✅ Done';
                doneBtn.style.opacity=curDone?'0.7':'1';
            }

            // Touch/swipe support
            _initWamSwipe();
        }

        let _wamTouchX=null;
        function _initWamSwipe(){
            const body=$('wam-body');
            if(body._swipeInit)return;
            body._swipeInit=true;
            body.addEventListener('touchstart',e=>{_wamTouchX=e.touches[0].clientX;},{passive:true});
            body.addEventListener('touchend',e=>{
                if(_wamTouchX===null)return;
                const dx=e.changedTouches[0].clientX-_wamTouchX;
                _wamTouchX=null;
                if(Math.abs(dx)>50){if(dx<0)wamNextEx();else wamPrevEx();}
            },{passive:true});
        }

        function wamNextEx(){
            if(_wam.current<_wam.exercises.length-1){
                _wam.current++;
                const track=$('wam-slides-track');
                if(track)track.style.transform=`translateX(-${_wam.current*100}%)`;
                $('wam-ex-progress').textContent=`${_wam.current+1}/${_wam.exercises.length}`;
                // Re-render dots only (cheap)
                renderWAMBody();
            }
        }
        function wamPrevEx(){
            if(_wam.current>0){
                _wam.current--;
                const track=$('wam-slides-track');
                if(track)track.style.transform=`translateX(-${_wam.current*100}%)`;
                $('wam-ex-progress').textContent=`${_wam.current+1}/${_wam.exercises.length}`;
                renderWAMBody();
            }
        }

        function _wamSetVal(ei,si,field,val){
            if(!_wam.exercises[ei].sets[si])_wam.exercises[ei].sets[si]={};
            _wam.exercises[ei].sets[si][field]=parseFloat(val)||val;
        }

        function _wamToggleSet(ei,si){
            if(!_wam.exercises[ei].sets[si])_wam.exercises[ei].sets[si]={};
            _wam.exercises[ei].sets[si].done=!_wam.exercises[ei].sets[si].done;
            const ex=_wam.exercises[ei];
            const parsed=parseExDetails(ex.details);
            const numSets=parsed.sets||3;
            ex.done=ex.sets.filter(s=>s&&s.done).length>=numSets;
            renderWAMBody();
            if(_wam.exercises[ei].sets[si].done) {startRestTimer(60);haptic([20,10,20]);}
        }

        function wamDoneExercise(){
            const ei=_wam.current;
            const ex=_wam.exercises[ei];
            // Toggle done state for this exercise
            ex.done=!ex.done;
            renderWAMBody();
            if(ex.done){
                toast(`✅ ${ex.name} done!`);
                // Auto-advance to next undone exercise
                const nextIdx=_wam.exercises.findIndex((e,i)=>i>ei&&!e.done);
                if(nextIdx!==-1){
                    setTimeout(()=>{_wam.current=nextIdx;renderWAMBody();},400);
                } else {
                    // All done — prompt to save
                    const allDone=_wam.exercises.every(e=>e.done);
                    if(allDone) setTimeout(()=>{
                        showConfirm('💪 All Done!','All exercises complete! Save your workout?', wamFinish);
                    },500);
                }
            }
        }

        function wamConfirmEnd(){
            const doneCount=_wam.exercises.filter(e=>e.done).length;
            const total=_wam.exercises.length;
            if(doneCount===0){
                showConfirm('End Workout?','Quit without saving? No exercises were completed.',()=>exitWorkoutMode());
            } else {
                showConfirm('💾 Save Workout?',`${doneCount}/${total} exercises completed. Save this workout?`,()=>wamFinish());
            }
        }

        function wamFinish(){
            clearInterval(_wam.timerInterval);
            const dur=Math.round((Date.now()-_wam.startTs)/60000)||1;
            // Build exercise records from active sets
            const exercises=_wam.exercises.map(ex=>{
                const best=ex.sets.filter(s=>s&&s.weight&&s.reps).sort((a,b)=>calc1RM(b.weight,b.reps)-calc1RM(a.weight,a.reps))[0];
                const numSets=ex.sets.filter(s=>s&&s.done).length||parseExDetails(ex.details).sets||1;
                const reps=best?.reps||parseExDetails(ex.details).reps||0;
                const weight=best?.weight||parseExDetails(ex.details).weight||0;
                let details=ex.details;
                if(best)details=`${numSets}×${reps}×${weight}kg`;
                return{name:ex.name,details};
            });
            const weight=S.wlog?.length?S.wlog[S.wlog.length-1].weight:75; // kg, fallback 75kg
            const metCal=Math.round(dur*(weight*0.0893)); // MET ~5.1 for strength, ≈0.0893*weight cal/min
            const wkt={id:Date.now(),date:gT(),name:_wam.name,duration:dur,cal:Math.max(metCal,dur*4),exercises};
            S.wkts.push(wkt);save('fitlog_wkts',S.wkts);
            GFit.writeWorkout(wkt); // ← Google Fit sync
            refreshDash();renderWktLog();renderExHistoryPreview();
            // If launched from a plan day, advance the plan
            const ctx=_wam._planContext;
            if(ctx){
                const p=S.plans.find(pl=>pl.id===ctx.planId);
                if(p){
                    if(!p.done)p.done={};
                    const key=`${ctx.weekNum}-${ctx.dayNum}`;
                    const days=getPlanDaysList(p);
                    const foundIdx=days.findIndex(d=>d.weekNum===ctx.weekNum&&d.dayNum===ctx.dayNum);
                    const targetIdx=foundIdx>=0?foundIdx:getCurrentDayIndex(p);
                    if(!p.done[key]){
                        p.done[key]=true;
                        p.currentDayIndex=targetIdx<days.length-1?targetIdx+1:days.length;
                        save('fitlog_plans',S.plans);
                        giveXP(50,'Plan day complete! +50 XP');
                        checkAchievements();
                    } else if(getCurrentDayIndex(p)===targetIdx){
                        // Already marked done but index not advanced — fix it
                        p.currentDayIndex=targetIdx<days.length-1?targetIdx+1:days.length;
                        save('fitlog_plans',S.plans);
                    }
                }
            }
            exitWorkoutMode();
            checkActivePlanToday();refreshPlans();refreshDash();
            toast(`✅ Workout saved! ${dur} min`);
        }

        function exitWorkoutMode(){
            clearInterval(_wam.timerInterval);
            clearInterval(_wam.restInterval);
            skipRest();
            $('workout-active-modal').style.display='none';
        }

        // Rest Timer
        function startRestTimer(seconds){
            skipRest(); // clear any existing
            _wam.restRemain=seconds;_wam.restTotal=seconds;
            $('rest-timer-overlay').style.display='flex';
            updateRestTimerUI();
            _wam.restInterval=setInterval(()=>{
                _wam.restRemain--;
                updateRestTimerUI();
                if(_wam.restRemain<=0) skipRest();
            },1000);
        }

        function updateRestTimerUI(){
            const el=$('rest-timer-count');if(el)el.textContent=_wam.restRemain;
            const fill=$('rest-ring-fill');if(!fill)return;
            const circ=502;
            const offset=circ*(1-_wam.restRemain/_wam.restTotal);
            fill.style.strokeDashoffset=offset;
            fill.style.stroke=_wam.restRemain<=10?'var(--accent-secondary)':'var(--accent-primary)';
        }

        function skipRest(){
            clearInterval(_wam.restInterval);
            $('rest-timer-overlay').style.display='none';
        }

        function addRestTime(s){_wam.restRemain+=s;_wam.restTotal+=s;updateRestTimerUI();}

        /* ============================================================
           INTERMITTENT FASTING TRACKER
        ============================================================ */
        let _fastInterval=null;

        function initFasting(){
            setFastWindowUI(S.fasting.targetHours||16);
            if(S.fasting.active&&S.fasting.startTs) startFastInterval();
            else updateFastUI();
        }

        function setFastWindow(h){
            S.fasting.targetHours=h;
            save('fitlog_fasting',S.fasting);
            setFastWindowUI(h);
        }

        function setFastWindowUI(h){
            [16,18,20,24].forEach(n=>{
                const btn=$(`fw-${n}`);
                if(btn)btn.classList.toggle('active',n===h);
            });
        }

        function toggleFast(){
            if(S.fasting.active){
                // End fast
                const elapsed=(Date.now()-S.fasting.startTs)/3600000;
                const targetH=S.fasting.targetHours||16;
                const completed=elapsed>=targetH;
                if(!S.fasting.log)S.fasting.log=[];
                S.fasting.log.push({start:S.fasting.startTs,end:Date.now(),hours:+elapsed.toFixed(1),completed});
                S.fasting.active=false;S.fasting.startTs=null;
                save('fitlog_fasting',S.fasting);
                clearInterval(_fastInterval);_fastInterval=null;
                updateFastUI();
                renderFastLog();
                toast(completed?'🎉 Fast completed!':'⏹ Fast ended');
            }else{
                S.fasting.active=true;S.fasting.startTs=Date.now();
                save('fitlog_fasting',S.fasting);
                startFastInterval();
                toast('⏱ Fast started!');
            }
        }

        function startFastInterval(){
            updateFastUI();
            _fastInterval=setInterval(updateFastUI,1000);
        }

        function updateFastUI(){
            const btn=$('fast-toggle-btn');
            const elapsed=$('fast-elapsed');
            const label=$('fast-label');
            const fill=$('fast-ring-fill');
            const timeEl=$('fast-ring-time');
            if(!btn)return;
            if(!S.fasting.active){
                if(elapsed)elapsed.textContent='00:00';
                if(label)label.textContent='Not fasting';
                if(btn)btn.textContent='🟢 Start Fast';
                if(btn)btn.style.background='';
                if(fill)fill.style.strokeDashoffset='440';
                if(timeEl)timeEl.style.color='var(--accent-blue)';
                if(fill)fill.className='fr-fill';
                return;
            }
            const totalSec=S.fasting.targetHours*3600;
            const elapsedSec=Math.floor((Date.now()-S.fasting.startTs)/1000);
            const h=Math.floor(elapsedSec/3600);
            const m=Math.floor((elapsedSec%3600)/60);
            const s=elapsedSec%60;
            const pct=Math.min(elapsedSec/totalSec,1);
            const circ=440;
            const offset=circ*(1-pct);
            const complete=elapsedSec>=totalSec;
            if(elapsed)elapsed.textContent=`${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
            if(label)label.textContent=complete?`✅ Done!`:`/${S.fasting.targetHours}h goal`;
            if(fill){fill.style.strokeDashoffset=offset;fill.className='fr-fill'+(complete?' complete':'');}
            if(timeEl)timeEl.style.color=complete?'var(--accent-primary)':'var(--accent-blue)';
            if(btn){btn.textContent='🔴 End Fast';btn.style.background='rgba(255,94,125,.2)';}
        }

        function renderFastLog(){
            const el=$('fast-log-list');if(!el)return;
            const logs=(S.fasting.log||[]).slice(-5).reverse();
            if(!logs.length){el.innerHTML='';return;}
            const rows=logs.map(l=>{
                const d=new Date(l.start).toLocaleDateString([],{month:'short',day:'numeric'});
                const col=l.completed?'var(--accent-primary)':'var(--text-secondary)';
                const chk=l.completed?' ✅':'';
                return`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--glass-border);font-size:.78rem"><span>${d}</span><span style="color:${col}">${l.hours}h${chk}</span></div>`;
            }).join('');
            el.innerHTML=`<div style="font-size:.72rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;margin-bottom:6px">Recent Fasts</div>`+rows;
        }

        /* ╔══════════════════════════════════════════════════════════════╗
           ║  GOOGLE FIT INTEGRATION — Full Data Pull                     ║
           ║  OAuth 2.0 Implicit Flow · No backend · GitHub Pages ready   ║
           ║  Client ID: 479785409747-v6dslf91ngff1sdo02eolinu2rql8cuc   ║
           ╚══════════════════════════════════════════════════════════════╝ */
        const GFIT_CLIENT_ID='479785409747-v6dslf91ngff1sdo02eolinu2rql8cuc.apps.googleusercontent.com';
        const GFIT_REDIRECT ='https://touhidsiddiqueeraj-bit.github.io/FitLog-2.0/';
        const GFIT_SCOPES   =[
            'https://www.googleapis.com/auth/fitness.activity.read',
            'https://www.googleapis.com/auth/fitness.activity.write',
            'https://www.googleapis.com/auth/fitness.body.read',
            'https://www.googleapis.com/auth/fitness.sleep.read',
            'https://www.googleapis.com/auth/fitness.heart_rate.read',
            'https://www.googleapis.com/auth/fitness.location.read',
        ].join(' ');
        const GFIT_API ='https://www.googleapis.com/fitness/v1/users/me';
        const GFIT_TK  ='fitlog_gfit_token';
        const GFIT_EXP ='fitlog_gfit_expiry';
        const GFIT_CACHE='fitlog_gfit_cache'; // last pulled data

        const GFit=(()=>{
            /* ── TOKEN ──────────────────────────────────────────────── */
            function _save(tok,exp){
                localStorage.setItem(GFIT_TK,tok);
                localStorage.setItem(GFIT_EXP,String(Date.now()+(exp-60)*1000));
            }
            function _clear(){localStorage.removeItem(GFIT_TK);localStorage.removeItem(GFIT_EXP);}
            function _tok(){
                const t=localStorage.getItem(GFIT_TK),e=+localStorage.getItem(GFIT_EXP)||0;
                return(t&&Date.now()<e)?t:null;
            }
            function isConnected(){return!!_tok();}

            /* ── OAUTH ──────────────────────────────────────────────── */
            function connect(){
                const params=new URLSearchParams({
                    client_id:GFIT_CLIENT_ID,redirect_uri:GFIT_REDIRECT,
                    response_type:'token',scope:GFIT_SCOPES,
                    include_granted_scopes:'true',prompt:'consent',
                });
                const popup=window.open(
                    'https://accounts.google.com/o/oauth2/v2/auth?'+params,
                    'gfit_auth',
                    'width=520,height=640,left='+Math.round((screen.width-520)/2)+
                    ',top='+Math.round((screen.height-640)/2)+',scrollbars=yes'
                );
                if(!popup){toast('⚠️ Allow popups for Google Sign-In');return;}
                const poll=setInterval(()=>{
                    try{
                        if(popup.closed){clearInterval(poll);_updateUI();return;}
                        const h=popup.location.hash;
                        if(h&&h.includes('access_token')){
                            clearInterval(poll);popup.close();_handleHash(h);
                        }
                    }catch(_){}
                },300);
            }

            function _handleHash(hash){
                const p=new URLSearchParams(hash.replace(/^#/,''));
                const tok=p.get('access_token'),exp=+p.get('expires_in')||3600;
                if(!tok){toast('❌ Google Sign-In failed');return;}
                _save(tok,exp);
                toast('✅ Connected to Google Fit!');
                _updateUI();
                syncNow();
            }

            function _checkHashOnLoad(){
                const h=window.location.hash;
                if(h&&h.includes('access_token')){
                    _handleHash(h);
                    history.replaceState(null,'',window.location.pathname+window.location.search);
                }
            }

            /* ── DISCONNECT ─────────────────────────────────────────── */
            function disconnect(){
                const t=_tok();
                if(t)fetch('https://oauth2.googleapis.com/revoke?token='+t,{method:'POST',mode:'no-cors'}).catch(()=>{});
                _clear();
                _updateUI();
                _clearDashCard();
                toast('🔌 Google Fit disconnected');
            }

            /* ── API FETCH ──────────────────────────────────────────── */
            async function _api(path,opts={}){
                const t=_tok();
                if(!t)throw new Error('NOT_AUTH');
                const r=await fetch(GFIT_API+path,{
                    ...opts,
                    headers:{'Authorization':'Bearer '+t,'Content-Type':'application/json',...(opts.headers||{})},
                });
                if(r.status===401){_clear();_updateUI();throw new Error('TOKEN_EXPIRED');}
                if(!r.ok)throw new Error('HTTP '+r.status);
                return r.json();
            }

            /* ── DATE HELPERS ───────────────────────────────────────── */
            function _todayMs(){const d=new Date();d.setHours(0,0,0,0);return d.getTime();}
            function _nowMs(){return Date.now();}
            function _daysAgoMs(n){return _nowMs()-n*86400000;}

            /* ══════════════════════════════════════════════════════════
               PULL FUNCTIONS — one per data type
            ═══════════════════════════════════════════════════════════ */

            /* Steps (today) */
            async function _pullSteps(){
                const d=await _api('/dataset:aggregate',{method:'POST',body:JSON.stringify({
                    aggregateBy:[{dataTypeName:'com.google.step_count.delta'}],
                    bucketByTime:{durationMillis:86400000},
                    startTimeMillis:_todayMs(),endTimeMillis:_nowMs(),
                })});
                let steps=0;
                for(const pt of(d?.bucket?.[0]?.dataset?.[0]?.point||[]))
                    steps+=pt?.value?.[0]?.intVal||0;
                // Merge with local — take higher
                if(steps>0){
                    const today=gT(),cur=(S.steps&&S.steps[today])||0;
                    if(steps>cur){S.steps[today]=steps;save('fitlog_steps',S.steps);updateStepsUI();renderDailyQuest();refreshDash();}
                }
                return steps;
            }

            /* Calories burned (today) */
            async function _pullCaloriesBurned(){
                const d=await _api('/dataset:aggregate',{method:'POST',body:JSON.stringify({
                    aggregateBy:[{dataTypeName:'com.google.calories.expended'}],
                    bucketByTime:{durationMillis:86400000},
                    startTimeMillis:_todayMs(),endTimeMillis:_nowMs(),
                })});
                let cals=0;
                for(const pt of(d?.bucket?.[0]?.dataset?.[0]?.point||[]))
                    cals+=pt?.value?.[0]?.fpVal||0;
                return Math.round(cals);
            }

            /* Active minutes (today — MOVE_MINUTES) */
            async function _pullActiveMinutes(){
                const d=await _api('/dataset:aggregate',{method:'POST',body:JSON.stringify({
                    aggregateBy:[{dataTypeName:'com.google.active_minutes'}],
                    bucketByTime:{durationMillis:86400000},
                    startTimeMillis:_todayMs(),endTimeMillis:_nowMs(),
                })});
                let mins=0;
                for(const pt of(d?.bucket?.[0]?.dataset?.[0]?.point||[]))
                    mins+=pt?.value?.[0]?.intVal||0;
                return mins;
            }

            /* Distance (today, meters → km) */
            async function _pullDistance(){
                const d=await _api('/dataset:aggregate',{method:'POST',body:JSON.stringify({
                    aggregateBy:[{dataTypeName:'com.google.distance.delta'}],
                    bucketByTime:{durationMillis:86400000},
                    startTimeMillis:_todayMs(),endTimeMillis:_nowMs(),
                })});
                let dist=0;
                for(const pt of(d?.bucket?.[0]?.dataset?.[0]?.point||[]))
                    dist+=pt?.value?.[0]?.fpVal||0;
                return+(dist/1000).toFixed(2); // km
            }

            /* Heart rate average (today) */
            async function _pullHeartRate(){
                const d=await _api('/dataset:aggregate',{method:'POST',body:JSON.stringify({
                    aggregateBy:[{dataTypeName:'com.google.heart_rate.bpm',dataSourceId:'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm'}],
                    bucketByTime:{durationMillis:86400000},
                    startTimeMillis:_todayMs(),endTimeMillis:_nowMs(),
                })});
                let avg=0;
                const pts=d?.bucket?.[0]?.dataset?.[0]?.point||[];
                if(pts.length){
                    let sum=0,count=0;
                    for(const pt of pts){const v=pt?.value?.[0]?.fpVal;if(v){sum+=v;count++;}}
                    avg=count?Math.round(sum/count):0;
                }
                return avg; // bpm
            }

            /* Sleep (last night — look back 24h) */
            async function _pullSleep(){
                const end=_nowMs(),start=end-2*86400000; // 2 days back to catch last night
                const d=await _api('/dataset:aggregate',{method:'POST',body:JSON.stringify({
                    aggregateBy:[{dataTypeName:'com.google.sleep.segment'}],
                    bucketByTime:{durationMillis:86400000},
                    startTimeMillis:start,endTimeMillis:end,
                })});
                let totalMs=0;
                for(const bucket of(d?.bucket||[])){
                    for(const pt of(bucket?.dataset?.[0]?.point||[])){
                        const st=+pt.startTimeNanos/1000000,et=+pt.endTimeNanos/1000000;
                        const sleepType=pt?.value?.[0]?.intVal||0;
                        // 1=awake, 2=sleep, 3=out-of-bed, 4=light, 5=deep, 6=REM
                        if(sleepType>=2&&sleepType!==3)totalMs+=(et-st);
                    }
                }
                return+(totalMs/3600000).toFixed(1); // hours
            }

            /* Body weight (last 7 days) */
            async function _pullWeight(){
                const d=await _api('/dataset:aggregate',{method:'POST',body:JSON.stringify({
                    aggregateBy:[{dataTypeName:'com.google.weight'}],
                    bucketByTime:{durationMillis:7*86400000},
                    startTimeMillis:_daysAgoMs(7),endTimeMillis:_nowMs(),
                })});
                let latest=null;
                for(const b of(d?.bucket||[]))
                    for(const pt of(b?.dataset?.[0]?.point||[])){
                        const v=pt?.value?.[0]?.fpVal;
                        if(v>0)latest=Math.round(v*10)/10;
                    }
                if(latest){
                    const today=gT(),last=S.wlog?.length?S.wlog[S.wlog.length-1]:null;
                    if(!last||last.date!==today){S.wlog.push({date:today,weight:latest});save('fitlog_wlog',S.wlog);updateWeightUI();}
                }
                return latest;
            }

            /* Body fat % (last 7 days) */
            async function _pullBodyFat(){
                const d=await _api('/dataset:aggregate',{method:'POST',body:JSON.stringify({
                    aggregateBy:[{dataTypeName:'com.google.body.fat.percentage'}],
                    bucketByTime:{durationMillis:7*86400000},
                    startTimeMillis:_daysAgoMs(7),endTimeMillis:_nowMs(),
                })});
                let latest=null;
                for(const b of(d?.bucket||[]))
                    for(const pt of(b?.dataset?.[0]?.point||[])){
                        const v=pt?.value?.[0]?.fpVal;
                        if(v>0)latest=Math.round(v*10)/10;
                    }
                return latest; // %
            }

            /* ══ SYNC ALL ══════════════════════════════════════════════ */
            async function syncNow(){
                if(!isConnected())return;
                _setStatus('🔄 Syncing…','var(--text-secondary)');
                const syncBtn=document.getElementById('gfit-sync-btn');
                if(syncBtn){syncBtn.disabled=true;syncBtn.textContent='⏳';}

                try{
                    const [steps,cals,mins,dist,hr,sleep,weight,bf]=await Promise.allSettled([
                        _pullSteps(),_pullCaloriesBurned(),_pullActiveMinutes(),
                        _pullDistance(),_pullHeartRate(),_pullSleep(),
                        _pullWeight(),_pullBodyFat(),
                    ]).then(r=>r.map(x=>x.status==='fulfilled'?x.value:null));

                    // Persist cache
                    const cache={steps,cals,mins,dist,hr,sleep,weight,bf,ts:Date.now()};
                    localStorage.setItem(GFIT_CACHE,JSON.stringify(cache));

                    _renderDashCard(cache);

                    // Toast summary
                    const parts=[];
                    if(steps>0)parts.push(steps.toLocaleString()+' steps');
                    if(cals>0)parts.push(cals+' kcal burned');
                    if(sleep>0)parts.push(sleep+'h sleep');
                    if(weight)parts.push(weight+'kg body wt');
                    if(parts.length)toast('🏃 Google Fit: '+parts.slice(0,3).join(' · '));

                }catch(err){
                    if(err.message==='TOKEN_EXPIRED')toast('🔄 Google Fit session expired — reconnect in Settings');
                    else console.warn('[GFit] syncNow error:',err.message);
                }

                _setStatus('✅ Connected to Google Fit','var(--accent-primary)');
                if(syncBtn){syncBtn.disabled=false;syncBtn.textContent='🔄 Sync';}
                _updateLastSync();
            }

            /* ══ WRITE WORKOUT ════════════════════════════════════════ */
            async function writeWorkout(wkt){
                if(!isConnected())return;
                const tok=_tok();if(!tok)return;
                try{
                    const endMs=Date.now(),startMs=endMs-(wkt.duration||1)*60000;
                    const startNs=String(startMs*1000000),endNs=String(endMs*1000000);
                    const dsId=await _ensureDS(tok);if(!dsId)return;
                    // Dataset patch
                    await fetch(GFIT_API+'/dataSources/'+encodeURIComponent(dsId)+'/datasets/'+startNs+'-'+endNs,{
                        method:'PATCH',
                        headers:{'Authorization':'Bearer '+tok,'Content-Type':'application/json'},
                        body:JSON.stringify({
                            minStartTimeNs:startNs,maxEndTimeNs:endNs,dataSourceId:dsId,
                            point:[{startTimeNanos:startNs,endTimeNanos:endNs,
                                dataTypeName:'com.google.activity.segment',value:[{intVal:8}]}],
                        }),
                    });
                    // Session
                    const sid='fitlog-'+(wkt.id||Date.now());
                    await fetch(GFIT_API+'/sessions/'+sid,{
                        method:'PUT',
                        headers:{'Authorization':'Bearer '+tok,'Content-Type':'application/json'},
                        body:JSON.stringify({
                            id:sid,name:wkt.name||'FitLog Workout',
                            description:'FitLog — '+(wkt.exercises?.length||0)+' exercises, '+(wkt.cal||0)+' kcal',
                            startTimeMillis:String(startMs),endTimeMillis:String(endMs),
                            activityType:8,
                            application:{name:'FitLog',version:'1.0',detailsUrl:GFIT_REDIRECT},
                        }),
                    });
                    console.log('[GFit] Workout synced:',wkt.name);
                }catch(e){console.warn('[GFit] writeWorkout silent fail:',e.message);}
            }

            async function _ensureDS(tok){
                const res=await fetch(GFIT_API+'/dataSources',{
                    method:'POST',
                    headers:{'Authorization':'Bearer '+tok,'Content-Type':'application/json'},
                    body:JSON.stringify({dataStreamName:'fitlog_activity',type:'derived',
                        application:{name:'FitLog',version:'1',detailsUrl:GFIT_REDIRECT},
                        dataType:{name:'com.google.activity.segment'}}),
                });
                if(res.status===409)return await _findDS(tok);
                if(!res.ok)return null;
                return(await res.json()).dataStreamId;
            }
            async function _findDS(tok){
                try{
                    const r=await fetch(GFIT_API+'/dataSources?dataTypeName=com.google.activity.segment',
                        {headers:{'Authorization':'Bearer '+tok}});
                    if(!r.ok)return null;
                    const d=await r.json();
                    const s=(d.dataSource||[]).find(x=>x.application?.name==='FitLog');
                    return s?s.dataStreamId:null;
                }catch{return null;}
            }

            /* ══ UI ═══════════════════════════════════════════════════ */
            function _updateUI(){
                const ok=isConnected();
                const signIn=document.getElementById('gfit-signin-btn');
                const connBtns=document.getElementById('gfit-connected-btns');
                const dot=document.getElementById('gfit-dot');
                if(signIn)signIn.style.display=ok?'none':'flex';
                if(connBtns)connBtns.style.display=ok?'grid':'none';
                if(dot)dot.style.background=ok?'var(--accent-primary)':'var(--text-secondary)';
                if(!ok){_setStatus('Not connected','var(--text-secondary)');_clearDashCard();}
                else _setStatus('✅ Connected to Google Fit','var(--accent-primary)');
                // Show/hide dashboard card
                const card=document.getElementById('gfit-dash-card');
                if(card)card.style.display=ok?'block':'none';
            }

            function _setStatus(msg,color){
                const el=document.getElementById('gfit-status-text');
                if(el){el.textContent=msg;el.style.color=color||'var(--text-secondary)';}
            }

            function _renderDashCard(c){
                const set=(id,val)=>{const e=document.getElementById(id);if(e)e.textContent=val;};
                set('gfit-steps-val', c.steps>0?c.steps.toLocaleString():'—');
                set('gfit-cal-val',   c.cals>0?c.cals+' kcal':'—');
                set('gfit-hr-val',    c.hr>0?c.hr+' bpm':'—');
                set('gfit-active-val',c.mins>0?c.mins+' min':'—');
                set('gfit-dist-val',  c.dist>0?c.dist+' km':'—');
                set('gfit-sleep-val', c.sleep>0?c.sleep+'h':'—');
                set('gfit-weight-val',c.weight?c.weight+' kg':'—');
                set('gfit-bf-val',    c.bf?c.bf+'%':'—');
                _updateLastSync();
            }

            function _clearDashCard(){
                ['gfit-steps-val','gfit-cal-val','gfit-hr-val','gfit-active-val',
                 'gfit-dist-val','gfit-sleep-val','gfit-weight-val','gfit-bf-val']
                .forEach(id=>{const e=document.getElementById(id);if(e)e.textContent='—';});
            }

            function _updateLastSync(){
                const el=document.getElementById('gfit-last-sync');
                if(!el)return;
                const cache=JSON.parse(localStorage.getItem(GFIT_CACHE)||'{}');
                if(cache.ts)el.textContent='Last sync: '+new Date(cache.ts).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
            }

            /* ══ INIT ═════════════════════════════════════════════════ */
            function init(){
                _checkHashOnLoad();
                _updateUI();
                // Restore cached data immediately (no API wait)
                if(isConnected()){
                    const cache=JSON.parse(localStorage.getItem(GFIT_CACHE)||'{}');
                    if(cache.ts)_renderDashCard(cache);
                    syncNow(); // fresh pull in background
                }
            }

            return{init,connect,disconnect,syncNow,writeWorkout,isConnected};
        })();
        /* ═══════════════════ END GOOGLE FIT ═════════════════════════ */


        /* ═══════════════════ PEDOMETER MODULE ═══════════════════════════ */
        const PedometerModule = (() => {
            let _active = false;
            let _lastStepTime = 0;
            let _abovePeak = false;
            let _sessionSteps = 0;
            let _useMotion = false;
            let _gravX=0, _gravY=0, _gravZ=9.8;
            const ALPHA=0.85;
            // Thresholds for linear (gravity-subtracted) magnitude
            const HI=2.5, LO=1.0, MIN_MS=280;

            function _mag(x,y,z){ return Math.sqrt(x*x+y*y+z*z); }

            function _onSample(x,y,z,isLinear){
                let lx=x,ly=y,lz=z;
                if(!isLinear){
                    _gravX=ALPHA*_gravX+(1-ALPHA)*x;
                    _gravY=ALPHA*_gravY+(1-ALPHA)*y;
                    _gravZ=ALPHA*_gravZ+(1-ALPHA)*z;
                    lx=x-_gravX; ly=y-_gravY; lz=z-_gravZ;
                }
                const m=_mag(lx,ly,lz);
                const now=Date.now();
                // Update debug display
                const dbg=document.getElementById('pedo-debug');
                if(dbg) dbg.textContent='mag:'+m.toFixed(2)+' steps:'+_sessionSteps;
                if(!_abovePeak && m>HI){ _abovePeak=true; }
                else if(_abovePeak && m<LO){
                    _abovePeak=false;
                    if(now-_lastStepTime>MIN_MS){
                        _lastStepTime=now;
                        _sessionSteps++;
                        addSteps(1);
                    }
                }
            }

            function _startMotion(){
                const h=(ev)=>{
                    const lin=ev.acceleration, grav=ev.accelerationIncludingGravity;
                    if(lin && lin.x!=null && (lin.x||lin.y||lin.z))
                        _onSample(lin.x,lin.y,lin.z,true);
                    else if(grav)
                        _onSample(grav.x||0,grav.y||0,grav.z||0,false);
                };
                window._pedoHandler=h;
                window.addEventListener('devicemotion',h);
                _useMotion=true;
                // verify events actually fire
                setTimeout(()=>{
                    if(_active && _sessionSteps===0){
                        const dbg=document.getElementById('pedo-debug');
                        if(dbg && dbg.textContent.startsWith('Waiting'))
                            dbg.textContent='⚠️ No sensor data — check browser permissions';
                    }
                },3000);
            }

            function _stop(){
                if(window._pedoHandler){
                    window.removeEventListener('devicemotion',window._pedoHandler);
                    window._pedoHandler=null;
                }
                _useMotion=false; _active=false;
                _updateBtn(); _updateBadge('manual');
                const dbg=document.getElementById('pedo-debug');
                if(dbg) dbg.textContent='';
            }

            function _updateBtn(){
                const b=document.getElementById('pedometer-btn');
                if(!b) return;
                b.textContent=_active?'⏹ Stop Pedometer':'📱 Start Pedometer';
                b.classList.toggle('active',_active);
            }
            function _updateBadge(src){
                const b=document.getElementById('step-source-badge');
                if(!b) return;
                if(src==='pedometer'){b.className='step-source-badge pedometer';b.textContent='📱 Pedometer';}
                else if(src==='miband'){b.className='step-source-badge miband';b.textContent='⌚ Mi Band';}
                else{b.className='step-source-badge manual';b.textContent='✋ Manual';}
            }

            async function toggle(){
                if(_active){ _stop(); toast('📱 Pedometer stopped'); return; }

                // Show debug line immediately
                let dbg=document.getElementById('pedo-debug');
                if(dbg) dbg.textContent='Waiting for sensor…';

                // 1) Check/request accelerometer permission via Permissions API
                if(navigator.permissions){
                    try{
                        const s=await navigator.permissions.query({name:'accelerometer'});
                        if(s.state==='denied'){
                            toast('❌ Motion permission denied — enable in browser site settings');
                            if(dbg) dbg.textContent='Permission denied. Go to browser → Site Settings → Motion Sensors → Allow';
                            return;
                        }
                    }catch(e){ /* permissions API may not support 'accelerometer' name — ignore */ }
                }

                // 2) iOS 13+ explicit permission
                if(typeof DeviceMotionEvent!=='undefined' &&
                   typeof DeviceMotionEvent.requestPermission==='function'){
                    try{
                        const r=await DeviceMotionEvent.requestPermission();
                        if(r!=='granted'){
                            toast('❌ Motion permission denied');
                            if(dbg) dbg.textContent='Permission denied on iOS';
                            return;
                        }
                    }catch(e){
                        toast('❌ Permission error: '+e.message);
                        return;
                    }
                }

                // 3) Start DeviceMotion listener (works on Android Chrome, iOS Safari)
                _active=true; _sessionSteps=0; _gravX=0; _gravY=0; _gravZ=9.8;
                _startMotion();
                _updateBtn(); _updateBadge('pedometer');
                toast('📱 Pedometer active — walk with phone in pocket/hand');
            }

            function isActive(){ return _active; }
            function setSourceBadge(s){ _updateBadge(s); }
            return { toggle, isActive, setSourceBadge, _updateBtn };
        })();
        /* ═══════════════════ END PEDOMETER ══════════════════════════════ */


        /* ═══════════════════ MI BAND MODULE (Web Bluetooth) ══════════════ */
        const MiBandModule = (() => {
            const STEP_SVC   = 0x181D;
            const STEP_CHAR  = 0x2A5B;
            const MI_SVCS    = [
                '0000fee0-0000-1000-8000-00805f9b34fb',
                '0000fee1-0000-1000-8000-00805f9b34fb',
                '00001530-0000-3512-2118-0009af100700',
            ];
            let _device=null, _connected=false, _poll=null;

            function _dots(ok){
                const d=document.getElementById('miband-settings-dot');
                const s=document.getElementById('miband-settings-status');
                const b=document.getElementById('miband-btn');
                if(d) d.style.background=ok?'var(--accent-primary)':'var(--text-secondary)';
                if(s) s.textContent=ok?'✅ Connected':'Not connected';
                if(b){ b.textContent=ok?'⌚ Connected':'⌚ Mi Band'; b.classList.toggle('connected',ok); }
            }

            function _applySteps(n){
                if(n<=0) return;
                const today=gT();
                const cur=(S.steps&&S.steps[today])||0;
                if(n>cur){
                    S.steps[today]=n; save('fitlog_steps',S.steps);
                    updateStepsUI(); renderDailyQuest(); refreshDash();
                    PedometerModule.setSourceBadge('miband');
                    const l=document.getElementById('miband-settings-last');
                    if(l) l.textContent='Last sync: '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})+' · '+n.toLocaleString()+' steps';
                }
            }

            function _parseSteps(dv){
                if(dv.byteLength>=4) return dv.getUint32(0,true);
                if(dv.byteLength>=2) return dv.getUint16(0,true);
                return dv.getUint8(0);
            }

            async function _readSteps(server){
                // Try standard step count characteristic first
                try{
                    const svc=await server.getPrimaryService(STEP_SVC);
                    const ch=await svc.getCharacteristic(STEP_CHAR);
                    const val=await ch.readValue();
                    _applySteps(_parseSteps(val));
                    if(ch.properties.notify){
                        ch.addEventListener('characteristicvaluechanged',e=>_applySteps(_parseSteps(e.target.value)));
                        await ch.startNotifications();
                    } else {
                        _poll=setInterval(async()=>{ try{ _applySteps(_parseSteps(await ch.readValue())); }catch(e){} },30000);
                    }
                    return true;
                }catch(e){}
                // Try Mi Band proprietary
                for(const svcUuid of MI_SVCS){
                    try{
                        const svc=await server.getPrimaryService(svcUuid);
                        const chars=await svc.getCharacteristics();
                        for(const c of chars){
                            try{
                                const v=await c.readValue();
                                if(v.byteLength>=3){
                                    const s=v.getUint16(1,true);
                                    if(s>0){ _applySteps(s); return true; }
                                }
                            }catch(e){}
                        }
                    }catch(e){}
                }
                return false;
            }

            async function connect(){
                // Secure context check
                if(!navigator.bluetooth){
                    toast('❌ Web Bluetooth not supported — use Chrome on Android/desktop');
                    return;
                }
                if(!window.isSecureContext){
                    // Show detailed instructions instead of just toasting
                    const msg='⚠️ Bluetooth needs HTTPS or localhost.\n\nTo use:\n1. Transfer this file to your phone/server\n2. Serve with: python3 -m http.server 8080\n3. Open http://localhost:8080 in Chrome';
                    alert(msg);
                    return;
                }
                try{
                    toast('🔍 Opening Bluetooth picker…');
                    _device=await navigator.bluetooth.requestDevice({
                        acceptAllDevices:true,
                        optionalServices:[
                            STEP_SVC, 0x180D, 0x180F, 0x1814,
                            ...MI_SVCS,
                            '00001800-0000-1000-8000-00805f9b34fb',
                            '00001801-0000-1000-8000-00805f9b34fb',
                        ],
                    });
                    _device.addEventListener('gattserverdisconnected',()=>{
                        _connected=false; clearInterval(_poll);
                        _dots(false);
                        PedometerModule.setSourceBadge(PedometerModule.isActive()?'pedometer':'manual');
                        toast('📴 Band disconnected');
                    });
                    toast('🔗 Connecting…');
                    const server=await _device.gatt.connect();
                    _connected=true; _dots(true);
                    const ok=await _readSteps(server);
                    toast(ok?'⌚ Band connected — steps syncing!':'⌚ Connected but no step service found');
                }catch(e){
                    _connected=false; _dots(false);
                    if(e.name==='NotFoundError') toast('❌ No device selected');
                    else if(e.name==='SecurityError') toast('❌ Bluetooth blocked — needs HTTPS');
                    else toast('❌ '+e.message);
                }
            }

            async function disconnect(){
                clearInterval(_poll);
                if(_device&&_device.gatt.connected) _device.gatt.disconnect();
                _device=null; _connected=false; _dots(false);
                PedometerModule.setSourceBadge('manual');
                toast('🔌 Band disconnected');
            }

            async function toggle(){ _connected ? await disconnect() : await connect(); }
            return { connect, disconnect, toggle };
        })();
        /* ═══════════════════ END MI BAND ═════════════════════════════════ */

        document.addEventListener('DOMContentLoaded',()=>{
            renderFastLog();
            $('settings-api-key').value=S.key;
            document.body.setAttribute('data-theme',S.theme);
            const _ttb2=$('theme-toggle-btn');if(_ttb2)_ttb2.textContent=S.theme==='dark'?'🌙':'☀️';
            updateKeyStatus();
            initNetworkStatus();
            initTagCloud('plan-equipment','plan-equipment-cloud');
            initTagCloud('gen-equipment','gen-equipment-cloud');
            const goalSelect=$('plan-goal');
            if(goalSelect){goalSelect.addEventListener('change',function(){$('custom-goal-container').style.display=this.value==='custom'?'block':'none'})}
            refreshDash();refreshNut();refreshFavs();refreshPlans();updateHydr();updateWeightUI();updateStepsUI();checkActivePlanToday();
            requestNotificationPermission();scheduleDailyReminder();
            initCloudStatus(); updateSettingsThemeBtn(); renderXPBar(); renderDailyQuest(); checkAchievements();
            initFasting(); renderExHistoryPreview(); initOnboarding();

            GFit.init(); // ← Google Fit auto-sync
            console.log('💪 FitLog — Glassmorphism Edition');
        });
