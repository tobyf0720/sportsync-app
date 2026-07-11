'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const confettiKeyframes = `@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } } @keyframes confettiFall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } } @keyframes toastIn { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } } @keyframes toastOut { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-20px); opacity: 0; } }`



const confettiColors = ['#a855f7', '#06b6d4', '#22c55e', '#eab308', '#ef4444', '#f97316', '#3b82f6', '#10b981']
const theme = (dark: string, light: string) => lightMode ? light : dark

const getStorage = (key: string, fallback: any) => {
  if (typeof window === 'undefined') return fallback
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch { return fallback }
}

const setStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

const getStorageRaw = (key: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback
  try { return localStorage.getItem(key) || fallback } catch { return fallback }
}

const setStorageRaw = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(key, value) } catch {}
}

const supabase = createClient(
  'https://qzmcrjsgitpmntddttfk.supabase.co',
  'sb_publishable_hY5Qxqx6sqFntkDTkr_OoA_HYwe_mDc'
)

const sports = [
  { name: 'Football', emoji: '⚽', color: '#22c55e', available: true },
  { name: 'Gym', emoji: '🏋️', color: '#a855f7', available: true },
  { name: 'Tennis', emoji: '🎾', color: '#eab308', available: true },
  { name: 'Running', emoji: '🏃', color: '#06b6d4', available: true },
  { name: 'Swimming', emoji: '🏊', color: '#3b82f6', available: true },
  { name: 'Basketball', emoji: '🏀', color: '#f97316', available: true },
  { name: 'Cycling', emoji: '🚴', color: '#10b981', available: true },
{ name: 'Golf', emoji: '⛳', color: '#84cc16', available: true },
{ name: 'Boxing', emoji: '🥊', color: '#ef4444', available: true },
{ name: 'Rugby', emoji: '🏉', color: '#f59e0b', available: true },
{ name: 'Cricket', emoji: '🏏', color: '#06b6d4', available: true },
];

const trainingPrograms = [
  {
    id: 'couch-to-5k',
    title: 'Couch to 5K',
    emoji: '🏃',
    color: '#06b6d4',
    duration: '8 weeks',
    level: 'Beginner',
    sport: 'Running',
    description: 'Go from zero to running 5K in 8 weeks. 3 runs per week with proper warm-up and cool-down.',
    sessions: [
      { week: 1, day: 1, title: 'Brisk 5min walk warm-up, then Run 1min / Walk 90sec x8, 5min walk cool-down', detail: 'Total: 30 mins. Run at conversational pace. Focus on landing softly.' },
      { week: 1, day: 2, title: 'Brisk 5min walk, Run 1min / Walk 90sec x8, 5min walk + stretch', detail: 'Same structure. Consistency builds the habit. Stretch hamstrings and calves after.' },
      { week: 1, day: 3, title: 'Brisk 5min walk, Run 1min / Walk 90sec x8, 5min walk cool-down', detail: 'Week 1 complete. Notice how your breathing settles faster between intervals.' },
      { week: 2, day: 1, title: 'Brisk 5min walk, Run 90sec / Walk 2min x7, 5min walk + stretch', detail: 'Slightly longer runs. Keep effort at 6/10 — you should be able to talk.' },
      { week: 2, day: 2, title: 'Brisk 5min walk, Run 90sec / Walk 2min x7, 5min walk cool-down', detail: 'Focus on breathing rhythm: in for 3 steps, out for 2. Stay relaxed.' },
      { week: 2, day: 3, title: 'Brisk 5min walk, Run 90sec / Walk 2min x7, 5min walk + full stretch', detail: 'Your legs are adapting. Foam roll if you have one — it helps recovery.' },
      { week: 3, day: 1, title: 'Brisk 5min walk, Run 90sec / Walk 90sec x7, then Run 3min / Walk 3min x2, 5min cool-down', detail: 'Mixed session. The 3min blocks are your first taste of longer running.' },
      { week: 3, day: 2, title: 'Brisk 5min walk, Run 2min / Walk 90sec x6, 5min walk + stretch', detail: 'Building stamina. Keep your shoulders relaxed and arms swinging forward/back.' },
      { week: 3, day: 3, title: 'Brisk 5min walk, Run 2min / Walk 90sec x6, 5min walk + full body stretch', detail: 'Week 3 done. You have run more this week than you ever have before.' },
      { week: 4, day: 1, title: 'Brisk 5min walk, Run 3min / Walk 90sec x5, 5min cool-down walk', detail: 'Big step up. Slow your pace slightly to handle the longer intervals.' },
      { week: 4, day: 2, title: 'Brisk 5min walk, Run 5min / Walk 2min x3, then Run 3min, 5min walk + stretch', detail: 'Your first 5-minute continuous runs. Mental strength matters now.' },
      { week: 4, day: 3, title: 'Brisk 5min walk, Run 5min / Walk 2min x3, Run 3min, 5min cool-down + stretch', detail: 'One month complete! You are a runner now. Celebrate the milestone.' },
      { week: 5, day: 1, title: 'Brisk 5min walk, Run 8min / Walk 2min x3, 5min cool-down walk', detail: 'Three 8-minute blocks. Find a steady rhythm. Do not go out too fast.' },
      { week: 5, day: 2, title: 'Brisk 5min walk, Run 8min / Walk 2min x3, 5min cool-down + stretch', detail: 'Same as Monday. Aim for consistent pace across all three blocks.' },
      { week: 5, day: 3, title: 'Brisk 5min walk, Run 10min / Walk 2min x2, Run 5min, 5min cool-down', detail: 'Longest session yet: 25 minutes of total running. You are building serious endurance.' },
      { week: 6, day: 1, title: 'Brisk 5min walk, Run 12min / Walk 2min x2, Run 5min, 5min cool-down + stretch', detail: 'Two 12-minute blocks. Think about your form when you get tired.' },
      { week: 6, day: 2, title: 'Brisk 5min walk, Run 15min / Walk 2min, Run 10min, 5min cool-down', detail: 'Almost at continuous running. Your body knows what to do now.' },
      { week: 6, day: 3, title: 'Brisk 5min walk, Run 18min / Walk 2min, Run 10min, 5min cool-down + stretch', detail: '28 minutes of running. The walking break is now just a brief reset.' },
      { week: 7, day: 1, title: 'Brisk 5min walk, Run 22min continuous, 5min cool-down walk', detail: 'No walking breaks. Settle into a sustainable pace. You have earned this.' },
      { week: 7, day: 2, title: 'Brisk 5min walk, Run 25min continuous, 5min cool-down + stretch', detail: 'Focus on economy: short strides, quiet feet, relaxed upper body.' },
      { week: 7, day: 3, title: 'Brisk 5min walk, Run 28min continuous, 5min cool-down + full stretch', detail: 'Three continuous runs this week. You are a completely different athlete now.' },
      { week: 8, day: 1, title: 'Brisk 5min walk, Run 30min continuous, 5min cool-down walk', detail: 'This is roughly 5K pace for most beginners. Do not worry about speed.' },
      { week: 8, day: 2, title: 'Brisk 5min walk, Run 20min easy + 4 x 30sec strides, 5min cool-down + stretch', detail: 'Taper session. Strides are short accelerations — fast but relaxed. Not sprints.' },
      { week: 8, day: 3, title: '🏆 5K GRADUATION RUN! Warm up 5min walk + light jog, Run 5K, walk cool-down + celebrate!', detail: 'You did it! Do not worry about time — finishing is the achievement. Welcome to running.' },
    ]
  },
  {
    id: 'strength-basics',
    title: '12-Week Strength Foundation',
    emoji: '🏋️',
    color: '#a855f7',
    duration: '12 weeks',
    level: 'Beginner-Intermediate',
    sport: 'Gym',
    description: 'Push/Pull/Legs split with proper warm-ups, working sets, accessories, and deload weeks. 3 workouts per week.',
    sessions: [
      { week: 1, day: 1, title: 'PUSH: Warm-up (band pull-aparts, arm circles) → Bench Press 3x8 → Overhead Press 3x8 → Incline Dumbbell Press 3x10 → Tricep Pushdown 3x12 → Lateral Raise 3x15 → Stretch', detail: 'Learn the movements. Light weight. Focus on bar path and controlled tempo (2sec down, 1sec up).' },
      { week: 1, day: 2, title: 'PULL: Warm-up (cat-cow, scapular pulls) → Deadlift 3x8 → Bent-Over Row 3x8 → Lat Pulldown 3x10 → Face Pull 3x15 → Barbell Curl 3x10 → Dead hang 60sec', detail: 'Hip hinge practice. Keep back flat. Drive through heels on deadlift. Dead hang decompresses spine.' },
      { week: 1, day: 3, title: 'LEGS: Warm-up (bodyweight squats, leg swings) → Squat 3x8 → Romanian Deadlift 3x8 → Leg Press 3x10 → Walking Lunges 3x10/leg → Calf Raise 3x15 → Stretch quads/hamstrings', detail: 'Full range of motion. Break parallel on squats. Keep chest up throughout.' },
      { week: 2, day: 1, title: 'PUSH: Warm-up → Bench Press 3x8 (+2.5kg) → OHP 3x8 → Dips (assisted or bodyweight) 3xMax → Cable Flye 3x12 → Lateral Raise 3x15 → Overhead Tricep Extension 3x12 → Stretch', detail: 'First weight increase. Dips build serious chest and tricep strength. Control the descent.' },
      { week: 2, day: 2, title: 'PULL: Warm-up → Deadlift 3x8 (+2.5kg) → Pull-ups (or assisted/lat pulldown) 3xMax → Seated Cable Row 3x10 → Reverse Flye 3x15 → Hammer Curl 3x10 → Forearm roller 2x → Stretch', detail: 'Pull-ups are a goal exercise. Use bands or machine for assistance. Record your max reps.' },
      { week: 2, day: 3, title: 'LEGS: Warm-up → Squat 3x8 (+2.5kg) → Romanian Deadlift 3x8 → Bulgarian Split Squat 3x8/leg → Leg Curl 3x12 → Seated Calf Raise 3x15 → Hip flexor stretch 60sec/side', detail: 'Bulgarian splits challenge balance and unilateral strength. Use bodyweight if needed initially.' },
      { week: 3, day: 1, title: 'PUSH: Warm-up → Bench Press 4x6 → OHP 4x6 → Incline Dumbbell 3x8 → Skull Crusher 3x10 → Lateral Raise 3x12 → Push-ups to failure x1 → Stretch', detail: 'Heavier sets, fewer reps. Skull crushers isolate triceps — keep elbows pointed at ceiling.' },
      { week: 3, day: 2, title: 'PULL: Warm-up → Deadlift 4x6 → Pendlay Row 4x6 → Chin-ups 3xMax → T-Bar Row 3x8 → Preacher Curl 3x10 → Reverse Curl 3x12 → Stretch lats', detail: 'Pendlay rows: explosive pull from dead stop. Chin-ups target biceps more than pull-ups.' },
      { week: 3, day: 3, title: 'LEGS: Warm-up → Squat 4x6 → Front Squat 3x8 → Leg Press 3x10 → Glute Bridge 3x12 (weighted) → Standing Calf Raise 3x20 → Foam roll quads + IT band', detail: 'Front squat demands core stability and upright posture. Cross arms or use clean grip.' },
      { week: 4, day: 1, title: 'DELOAD PUSH: Light warm-up → Bench 3x5 @60% → OHP 3x5 @60% → Dips 2x8 → Light Lateral Raise 2x15 → Full upper body stretch 10min', detail: 'Recovery week. Weight should feel easy. Focus on perfect form and mind-muscle connection.' },
      { week: 4, day: 2, title: 'DELOAD PULL: Light warm-up → Deadlift 3x5 @60% → Lat Pulldown 3x8 light → Face Pull 2x15 → Bicep Curl 2x10 light → Yoga/stretching 15min', detail: 'Active recovery. Practise movement patterns without fatigue. Foam roll back and hamstrings.' },
      { week: 4, day: 3, title: 'DELOAD LEGS: Bodyweight warm-up → Squat 3x5 @60% → Lunges 2x8/leg → Light Leg Press 2x10 → Full lower body mobility routine 15min', detail: 'Rest your CNS. You will come back stronger next week. Sleep and nutrition matter now.' },
      { week: 5, day: 1, title: 'PUSH: Warm-up → Bench Press 5x5 → OHP 5x5 → Incline DB Press 3x8 → Weighted Dips 3x6-8 → Lateral Raise 4x12 → Tricep Rope Pushdown 3x12 → Stretch', detail: 'Strength phase. Add weight each session if form allows. Record all working weights.' },
      { week: 5, day: 2, title: 'PULL: Warm-up → Deadlift 5x5 → Weighted Pull-ups 3x5 (or lat pulldown heavy) → Barbell Row 4x6 → Face Pull 3x15 → Barbell Curl 3x8 → Dead hang + stretch', detail: 'Weighted pull-ups: start with 2.5kg added. Deadlift should feel strong and controlled.' },
      { week: 5, day: 3, title: 'LEGS: Warm-up → Squat 5x5 → Romanian Deadlift 4x8 → Bulgarian Split Squat 3x8/leg (add weight) → Leg Extension 3x12 → Calf Raise 4x15 → Stretch + foam roll', detail: 'Bulgarian splits with dumbbells now. This is the hardest leg day so far. Embrace it.' },
      { week: 6, day: 1, title: 'PUSH: Warm-up → Bench 5x5 (+2.5-5kg) → OHP 5x5 → Decline DB Press 3x8 → Close-Grip Bench 3x8 → Lateral Raise 4x12 → Tricep Kickback 3x12 → Stretch', detail: 'Close-grip bench targets triceps. Hands shoulder-width. Keep elbows tucked.' },
      { week: 6, day: 2, title: 'PULL: Warm-up → Sumo Deadlift 4x5 → Pendlay Row 5x5 → Lat Pulldown (wide grip) 3x8 → Cable Face Pull 3x15 → Concentration Curl 3x10 → Reverse Grip Curl 3x12 → Stretch', detail: 'Sumo stance: wider feet, hands inside knees. Different stimulus for glutes and hips.' },
      { week: 6, day: 3, title: 'LEGS: Warm-up → Squat 5x5 → Hack Squat 3x8 → Lying Leg Curl 3x12 → Hip Thrust 3x10 (heavy) → Donkey Calf Raise 3x15 → Pigeon stretch 60sec/side', detail: 'Hip thrusts build glute power that carries over to squats and deadlifts. Squeeze hard at top.' },
      { week: 7, day: 1, title: 'PUSH: Warm-up → Bench Press 3x3 (heavy) → OHP 3x3 (heavy) → Floor Press 3x5 → Incline Flye 3x10 → Lateral Raise 3x12 → JM Press 3x8 → Stretch shoulders', detail: 'Heavy triples. Spotter recommended for bench. Floor press protects shoulders at heavy weights.' },
      { week: 7, day: 2, title: 'PULL: Warm-up → Deadlift 3x3 (heavy) → Weighted Chin-ups 3x3 → Snatch-Grip Row 3x8 → Straight-Arm Pulldown 3x12 → Incline Dumbbell Curl 3x10 → Wrist roller 3x → Stretch', detail: 'Peak strength week. Snatch grip: hands wide, pull to lower chest. Hits upper back hard.' },
      { week: 7, day: 3, title: 'LEGS: Warm-up → Squat 3x3 (heavy) → Trap Bar Deadlift 3x5 → Leg Press (heavy) 3x8 → Glute-Ham Raise 3x10 → Calf Raise 4x15 → Full lower body stretch 10min', detail: 'Trap bar deadlift is easier on lower back. Drive through the floor like a jump.' },
      { week: 8, day: 1, title: 'DELOAD PUSH: Warm-up → Bench 3x5 @50% → OHP 3x5 @50% → Dips 2x8 → Light Flyes 2x12 → Full upper body mobility 15min', detail: 'Second deload. Your joints and CNS need this. Focus on sleep and nutrition this week.' },
      { week: 8, day: 2, title: 'DELOAD PULL: Light stretching → Deadlift 3x5 @50% → Light Lat Pulldown 2x10 → Face Pull 2x15 → Yoga flow 15min', detail: 'Active recovery. Move through full range of motion without load. Foam roll tight areas.' },
      { week: 8, day: 3, title: 'DELOAD LEGS: Light warm-up → Squat 3x5 @50% → Walking Lunges 2x10 → Light Leg Curl 2x12 → Full lower body mobility + foam rolling 15min', detail: 'You have completed 8 weeks of consistent training. This is an achievement in itself.' },
      { week: 9, day: 1, title: 'PUSH: Warm-up → Bench 5x3 (heavy) → OHP 5x3 → Spoto Press 3x5 → Incline DB 3x8 → Lateral Raise 4x12 → Overhead Extension 3x10 → Push-ups 2xMax → Stretch', detail: 'Spoto press: pause 1 inch above chest for 2 seconds. Builds bottom-end bench strength.' },
      { week: 9, day: 2, title: 'PULL: Warm-up → Deadlift 5x3 (heavy) → Weighted Pull-ups 4x3 → Meadows Row 3x8 → Rear Delt Flye 3x15 → Barbell Curl 4x8 → Farmer walks 3x30sec → Stretch', detail: 'Meadows row: landmine attachment, single-arm row. Great for lat isolation. Farmer walks build grip.' },
      { week: 9, day: 3, title: 'LEGS: Warm-up → Squat 5x3 (heavy) → Pause Squat 3x5 (3sec pause at bottom) → Leg Press 3x10 → Glute-Ham Raise 3x10 → Standing Calf 4x15 → Stretch + ice if needed', detail: 'Pause squats eliminate momentum. You will feel weaker — that is the point. Pure strength building.' },
      { week: 10, day: 1, title: 'PUSH: Warm-up → Bench Press 3x1 (heavy single practice) → OHP 3x1 → Close-Grip Bench 3x5 → Cable Flye 3x12 → Lateral Raise 3x12 → Dips 3xMax → Stretch', detail: 'Practise heavy singles. This is dress rehearsal for test week. Nail your setup and commands.' },
      { week: 10, day: 2, title: 'PULL: Warm-up → Deadlift 3x1 (heavy single practice) → Barbell Row 3x5 → Weighted Chin-ups 3x3 → Face Pull 3x15 → Spider Curl 3x10 → Grip squeezes 3xMax → Stretch', detail: 'Deadlift singles: perfect your wedge and pull. No rounding. This is technique under load.' },
      { week: 10, day: 3, title: 'LEGS: Warm-up → Squat 3x1 (heavy single practice) → Romanian Deadlift 3x5 → Bulgarian Split Squat 3x6/leg → Leg Extension 3x12 → Calf Raise 3x15 → Full stretch', detail: 'Final heavy leg session. Visualise your max attempts. Confidence comes from preparation.' },
      { week: 11, day: 1, title: 'TAPER PUSH: Light warm-up → Bench 3x3 @70% → OHP 3x3 @70% → Dips 2x8 → Light Lateral Raise 2x15 → Full upper body stretch + mobility', detail: 'Taper begins. Reduce volume by 50%. Keep intensity moderate. No failure sets this week.' },
      { week: 11, day: 2, title: 'TAPER PULL: Light warm-up → Deadlift 3x3 @70% → Lat Pulldown 2x10 light → Face Pull 2x15 → Light curls 2x10 → Full body mobility 15min', detail: 'Short session. Your body is supercompensating. Sleep 8+ hours every night this week.' },
      { week: 11, day: 3, title: 'TAPER LEGS: Light warm-up → Squat 3x3 @70% → Walking Lunges 2x8 → Light Leg Curl 2x12 → Foam rolling + stretching 20min', detail: 'Final session before test week. Eat well, hydrate, visualise success. You are ready.' },
      { week: 12, day: 1, title: '🏆 TEST DAY 1: Full warm-up → Bench Press 1RM → Overhead Press 1RM → Light accessories + celebrate!', detail: 'Work up in small jumps: empty bar x10, 40% x5, 60% x3, 80% x1, 90% x1, then attempt PR. Record everything.' },
      { week: 12, day: 2, title: '🏆 TEST DAY 2: Full warm-up → Deadlift 1RM → Barbell Row 1RM → Light stretching + celebrate!', detail: 'Same warm-up protocol. Rest 3-5 minutes between max attempts. Compare to your starting numbers.' },
      { week: 12, day: 3, title: '🏆 TEST DAY 3: Full warm-up → Squat 1RM → Celebrate + record all PRs!', detail: 'Final test. You have completed 12 weeks of dedicated training. Compare Day 1 numbers to today. The progress is real.' },
    ]
  },
  {
    id: 'swim-fit',
    title: 'Swim Fit 4-Week Builder',
    emoji: '🏊',
    color: '#3b82f6',
    duration: '4 weeks',
    level: 'Intermediate',
    sport: 'Swimming',
    description: 'Build swimming endurance and technique with structured pool sessions. 3 swims per week.',
    sessions: [
      { week: 1, day: 1, title: 'Warm-up: 200m easy free → Drill: 4x50m catch-up drill → Main: 8x50m free (rest 30sec) → Cool-down: 200m easy backstroke', detail: 'Catch-up drill: one arm waits at front until other completes full stroke. Improves body position and length.' },
      { week: 1, day: 2, title: 'Warm-up: 200m choice → Drill: 4x50m fingertip drag → Main: 4x100m free (rest 45sec, hold steady pace) → Cool-down: 200m easy free', detail: 'Fingertip drag: drag fingers along surface during recovery. Keeps elbows high and promotes relaxed arms.' },
      { week: 1, day: 3, title: 'Warm-up: 200m easy → Drill: 6x25m kick with board → Main: 10x25m sprint (rest 25sec, max effort) → Cool-down: 300m very easy mixed strokes', detail: 'Kick from hips, not knees. Small fast kicks. Sprints build speed and anaerobic fitness.' },
      { week: 2, day: 1, title: 'Warm-up: 300m easy free → Drill: 4x50m single-arm drill (alternate arms) → Main: 10x50m free (rest 25sec, descend pace 1-5 then 6-10) → Cool-down: 200m easy', detail: 'Single-arm drill: one arm extended, swim with other arm only. Teaches balance and pull efficiency.' },
      { week: 2, day: 2, title: 'Warm-up: 300m choice → Main: 5x100m free (rest 30sec, aim for negative split each 100) → Pull buoy: 4x50m (focus on catch) → Cool-down: 200m easy', detail: 'Negative split: second 50m faster than first. Pull buoy isolates upper body — feel the water.' },
      { week: 2, day: 3, title: 'Warm-up: 200m easy → Drill: 8x25m alternating sprint/easy → Main: 12x25m sprint (rest 20sec, from dive or push) → Cool-down: 300m easy + stretch on pool deck', detail: 'Practise explosive starts. Streamline off the wall — tight body line reduces drag significantly.' },
      { week: 3, day: 1, title: 'Warm-up: 400m easy free → Main: 5x100m free (rest 25sec, hold target pace ±2sec) → Kick: 4x50m with fins → Cool-down: 200m easy backstroke', detail: 'Pace control is the goal. Use the pool clock or a watch. Consistency across all 5 reps.' },
      { week: 3, day: 2, title: 'Warm-up: 400m mixed → Main: Pyramid — 100m, 200m, 300m, 200m, 100m (rest 30sec between) → Pull: 4x50m with paddles → Cool-down: 200m easy', detail: 'Pyramid builds endurance. Start controlled on the way up, push harder on the way down.' },
      { week: 3, day: 3, title: 'Warm-up: 200m easy → Main: 8x50m pace work (rest 20sec, aim for identical times across all 8) → 4x25m sprint → Cool-down: 300m easy + stretch', detail: 'Pacing precision. If times vary by more than 3 seconds, focus harder on feel and stroke count.' },
      { week: 4, day: 1, title: 'Warm-up: 300m easy → Main: 6x100m free (rest 25sec, hold best pace) → 4x50m kick fast → Cool-down: 200m easy', detail: 'Final push week. Give everything to the main set. You have built the fitness for this.' },
      { week: 4, day: 2, title: 'Warm-up: 200m easy → Drill: 4x50m technique focus → Main: 4x50m sprint, 200m easy swim (repeat twice) → Cool-down: 200m + stretch', detail: 'Taper session. Keep speed work but reduce overall volume. Feel fresh and fast.' },
      { week: 4, day: 3, title: '🏆 ENDURANCE TEST: Warm-up 400m easy → Swim 1500m continuous at best sustainable pace → Cool-down 200m + celebrate!', detail: 'You have trained for this. Pace the first 500m conservatively, build through the middle 500m, empty the tank on the final 500m.' },
    ]
  },
  {
    id: 'football-preseason',
    title: 'Football Pre-Season 6-Week Prep',
    emoji: '⚽',
    color: '#22c55e',
    duration: '6 weeks',
    level: 'Intermediate',
    sport: 'Football',
    description: 'Complete match preparation: technical skills, tactical awareness, conditioning, and match practice.',
    sessions: [
      { week: 1, day: 1, title: 'Technical: 10min dynamic warm-up + ball mastery (toe taps, sole rolls, V-cuts 5min each) → Passing: short passes pairs 10min, long balls 10min → Shooting: 20 shots from edge of box, focus on placement → 10min small-sided possession game → Cool-down stretch', detail: 'Foundation session. Ball mastery builds close control. Shoot with instep for accuracy, not power.' },
      { week: 1, day: 2, title: 'Conditioning: 15min warm-up jog + dynamic stretches → Fartlek run: 5min easy, 2min tempo, repeat x4 (28min total) → 5min cool-down jog → Full body stretch 10min', detail: 'Fartlek = speed play. Vary pace naturally like a match. Builds aerobic base and recovery between sprints.' },
      { week: 1, day: 3, title: 'Technical + Tactical: 10min ball mastery warm-up → Dribbling: cone weave 10min, 1v1 take-on practice 10min → Crossing + Finishing: cross from wide, finish first-time 20 reps → 6v6 small-sided game 20min → Cool-down', detail: 'Focus on first touch out of feet. When crossing, look up to pick a target. Driven crosses are hardest to defend.' },
      { week: 2, day: 1, title: 'Passing Focus: 10min rondo (5v2 keep-ball) → Passing patterns: wall passes, overlaps, third-man runs 15min → Long diagonal switches 10min → Shooting: first-time finishes from cutbacks 20 reps → 8v8 possession game 15min', detail: 'Rondo sharpens quick passing and pressing. Third-man runs: pass to teammate who lays off to a runner — unmarkable when timed right.' },
      { week: 2, day: 2, title: 'Speed + Agility: 15min warm-up + ladder drills (in-outs, ickey shuffle, lateral) → 10x30m sprints (walk back recovery) → 5x shuttle runs (5-10-5 drill) → 10min cool-down jog + stretch', detail: 'Ladder drills improve foot speed. Shuttle runs simulate match change of direction. Full recovery between sprints maintains quality.' },
      { week: 2, day: 3, title: 'Defending + Set Pieces: 10min warm-up → 1v1 defending: jockey, delay, tackle 15min → Heading: attacking and defensive headers 10min → Free kicks: direct shots 15 attempts, curled + driven → Corners: inswingers and outswingers 10 each → 7v7 scrimmage 20min', detail: 'Defending is about patience. Jockey to delay, tackle when they take a heavy touch. Headers: attack the ball, do not let it hit you.' },
      { week: 3, day: 1, title: 'Finishing Clinic: 15min warm-up + passing combinations → Finishing circuit: (1) 1v1 vs keeper x10, (2) first-time shots from pull-backs x10, (3) volleys from crosses x10, (4) headers from corners x10 → 20min small-sided game, every goal counts double', detail: 'Variety of finishes. In 1v1s, commit the keeper then slot past. Volleys: keep your head steady and knee over the ball.' },
      { week: 3, day: 2, title: 'Match Endurance: 10min warm-up → Interval running: 4min run @75% / 3min jog recovery x5 sets → 5min cool-down → 10min core circuit: planks, Russian twists, leg raises', detail: 'Match-specific conditioning. Football is repeated high-intensity efforts, not steady-state running. Core strength protects against injury.' },
      { week: 3, day: 3, title: 'Tactical Session: 15min warm-up + possession rondo → Attacking shape: build from back, midfield rotations 20min → Defensive shape: pressing triggers, compact block 15min → Transition drill: attack to defence and back x15 reps → 9v9 scrimmage 25min', detail: 'Understand your role in each phase. Transitions win matches — the 5 seconds after losing/winning the ball are crucial.' },
      { week: 4, day: 1, title: 'Combination Play: 10min warm-up → Overlap + underlap drills 15min → Through ball timing: midfield splitting passes 15min → Give-and-go patterns around the box 10min → Shooting: edge of box after combination 20 reps → 20min match simulation', detail: 'Combinations break down organised defences. The pass creates the space, not the dribble. Move immediately after passing.' },
      { week: 4, day: 2, title: 'Power + Strength: 10min warm-up → Plyometrics: box jumps, bounding, lateral hops 15min → Resistance band: lateral walks, monster walks, sprint resistance 10min → Bodyweight circuit: squats, lunges, press-ups, burpees 4 rounds → Stretch + foam roll', detail: 'Plyometrics build explosive power for sprinting and jumping. Land softly. Quality over quantity — stop when form fades.' },
      { week: 4, day: 3, title: 'Full Practice Match: 20min warm-up + technical activation → 11v11 full-field match 60min with proper positions, offsides, set pieces → Cool-down + team debrief', detail: 'Treat this like a real game. Warm-up properly, play at match intensity, practise communication. Track your stats honestly.' },
      { week: 5, day: 1, title: 'Advanced Shooting: 10min warm-up → Long-range shooting: 25 yards, laces through ball 20 reps → Curlers: inside foot, far corner 15 reps each side → Volleys + half-volleys from crosses 20 reps → Penalties: 10 under pressure (miss = sprint) → Small-sided finishing game 15min', detail: 'Long shots: plant foot beside ball, strike through centre, follow through fully. Curlers: wrap foot around ball, head over it to keep it down.' },
      { week: 5, day: 2, title: 'High-Intensity Conditioning: 10min warm-up → 10x60m sprints (walk back) → 8x30m sprints with change of direction → 4x suicide runs (penalty box to halfway and back) → 10min cool-down jog + stretch', detail: 'This is the hardest conditioning session. Embrace the discomfort. Match fitness is built here. Full recovery between efforts.' },
      { week: 5, day: 3, title: 'Pre-Match Tactical Run-Through: 15min warm-up + rondo → Set piece routines: corners, free kicks, throw-ins 20min → Shape walk-through: attacking patterns, defensive setup 15min → 20min light scrimmage (70% intensity, avoid injuries) → Stretch + recovery', detail: 'Game week. Rehearse everything at walking pace first, then build speed. No unnecessary risks. Hydrate well.' },
      { week: 6, day: 1, title: 'Match Preparation: 10min warm-up → Technical sharpening: passing, dribbling, shooting 20min → Tactical briefing: opponent analysis, key battles 10min → 15min light possession game → Set piece review 10min → Cool-down + mental prep', detail: 'Visualise your performance. What will you do when you get the ball? Where will you be when they have it? Preparation creates confidence.' },
      { week: 6, day: 2, title: 'Light Activation: 10min dynamic warm-up → Ball work: keep ball in pairs, one-touch passing 10min → Light jog + dynamic stretches 10min → 6x30m stride-throughs (build to 80 speed, not sprinting) → 10min stretching + foam rolling', detail: 'Taper session. Keep touches sharp but legs fresh. Stride-throughs maintain neuromuscular readiness without fatigue.' },      { week: 6, day: 2, title: 'Light Activation: 10min dynamic warm-up → Ball work: keepy-uppies, one-touch passing pairs 10min → Light jog + dynamic stretches 10min → 6x30m stride-throughs (build to 80% speed, not sprinting) → 10min stretching + foam rolling', detail: 'Taper session. Keep touches sharp but legs fresh. Stride-throughs maintain neuromuscular readiness without fatigue.' },
      { week: 6, day: 3, title: '🏆 MATCH DAY! Warm-up: 20min structured (jog, dynamic, passing, shooting, sprints) → Play your match → Cool-down: 10min light jog + full body stretch → Reflect and recover', detail: 'Trust your preparation. You have done the work over 6 weeks. Hydrate before, during, after. Enjoy it — this is why you trained.' },
    ]
  },
  {
    id: 'boxing-foundations',
    title: 'Boxing Foundations 4-Week Program',
    emoji: '🥊',
    color: '#ef4444',
    duration: '4 weeks',
    level: 'Beginner',
    sport: 'Boxing',
    description: 'Learn the sweet science from stance to sparring. Footwork, combinations, defence, and fight conditioning.',
    sessions: [
      { week: 1, day: 1, title: 'Foundations: 5min jump rope warm-up → Shadow boxing 3x3min rounds (stance, jab only, focus on extension and recovery) → Heavy bag 3x3min (jab only, practise range finding) → Core: 3x20 crunches, 3x30sec plank → Stretch shoulders, hips, calves', detail: 'Your stance is everything. Lead foot pointing at opponent, rear foot at 45°. Chin down, hands high. The jab controls distance, sets up everything, and scores points. Master it first.' },
      { week: 1, day: 2, title: 'Jab-Cross: 5min jump rope → Shadow 3x3min (jab-cross, focus on hip rotation for the cross) → Heavy bag 3x3min (1-2 combinations, power comes from legs and hips) → Footwork drill: forward/back/side steps 3x2min → Stretch', detail: 'The cross (straight right for orthodox) generates power from the ground up. Push off rear foot, rotate hips, extend arm straight. Recover quickly to guard. Never drop your jab hand when throwing the cross.' },
      { week: 1, day: 3, title: 'Footwork + Conditioning: 10min jump rope (mix single-leg, double-unders if possible) → Footwork drills: ladder 10min, cone pivots 5min, ring movement 5min → Shadow boxing 4x2min (jab-cross + movement) → Core circuit 10min → Full body stretch', detail: 'Stay on the balls of your feet. Never cross your legs when moving laterally. Small, quick steps maintain balance. A moving target is harder to hit — constant slight movement.' },
      { week: 2, day: 1, title: 'Adding the Hook: 5min jump rope → Shadow 4x3min (1-2-3: jab-cross-lead hook, focus on short compact hook) → Heavy bag 4x3min (1-2-3 combinations, dig hooks to body and head) → Defence drill: partner throws jabs, you slip outside 3x2min → Core + stretch', detail: 'The hook is a short, powerful punch. Elbow at 90°, pivot on lead foot, rotate hips and shoulders together. Do not wind up — power comes from rotation, not a big swing. Hook to the body opens up the head later.' },
      { week: 2, day: 2, title: 'Defence Day: 5min jump rope → Shadow 3x3min (focus on defensive movement after every combo) → Slip line drill: rope at shoulder height, slip under moving forward/back 4x2min → Partner drill: catch/parry jabs, roll under hooks 4x2min → Heavy bag 3x2min (hit and move) → Stretch', detail: 'Defence is about seeing the punch coming. Watch the opponent chest/shoulders, not their eyes. Slips are small movements — just enough to miss the punch. Rolls are U-shaped movements under hooks. After every defensive move, you should be in position to counter.' },
      { week: 2, day: 3, title: 'Conditioning: 10min jump rope intervals (30sec fast/30sec easy) → Shadow boxing 4x3min (increasing intensity each round) → Heavy bag 4x3min (high output, minimum rest) → Bodyweight circuit: 10 burpees, 20 mountain climbers, 10 squat jumps x3 rounds → Full stretch', detail: 'Boxing fitness is about repeated high output with incomplete recovery. Keep hands up even when exhausted — that is when most get hit. Breathe out sharply with each punch.' },
      { week: 3, day: 1, title: 'Combinations + Flow: 5min jump rope → Shadow 4x3min (fluid combinations: 1-2-3-2, 1-2-5-2, 1-3-2, 1-2-3-6) → Heavy bag 4x3min (work each combo for a full round) → Speed: double-end bag or rapid fire on heavy bag 3x2min → Core + stretch', detail: 'Combinations should flow, not be robotic. Each punch sets up the next. The uppercut (5 and 6) comes from the legs — drop your weight slightly then drive up through the target. Mix head and body in every combination.' },
      { week: 3, day: 2, title: 'Pad Work Focus: 5min warm-up → Pad work with partner/coach 6x3min rounds (call combinations, react to pad holder movements) → Defence counters: slip and counter, roll and hook, parry and cross 3x2min → Heavy bag 2x3min freestyle → Stretch', detail: 'Pad work bridges technique and sparring. React to the pads — do not pre-plan every punch. If the pad holder moves, adjust your feet. Communication with your pad holder is essential.' },
      { week: 3, day: 3, title: 'Controlled Sparring Prep: 10min jump rope + shadow → Technical sparring 4x3min (50% intensity, focus on defence and clean punches, no ego) → Review: watch footage or discuss what worked/did not → Light bag work 2x3min → Core + stretch', detail: 'This is learning, not fighting. Focus on one thing each round: Round 1 — jab and move, Round 2 — defence and counters, Round 3 — body work, Round 4 — put it together. Leave ego outside the ring.' },
      { week: 4, day: 1, title: 'Power Development: 5min jump rope → Shadow 3x3min (focus on sitting down on punches — bend knees, rotate fully) → Heavy bag 5x3min (power shots: 1-2, 2-3, 3-4, body shots, finish every round with 10sec max output) → Medicine ball throws 3x10 → Stretch', detail: 'Power comes from technique and leverage, not muscle. Sit down on your punches by bending your knees slightly. Full hip and shoulder rotation. The heavy bag should bend, not just swing.' },
      { week: 4, day: 2, title: 'Full Arsenal + Conditioning: 10min jump rope → Shadow 5x3min (all punches, all defences, constant movement) → Heavy bag 5x3min (freestyle, mix everything, 100% output final 20sec each round) → Conditioning finisher: 5 burpees, 10 punches, 5 squat jumps x5 rounds → Stretch', detail: 'This is the hardest training session. Push through fatigue while maintaining technique. In a fight, you will be tired — train yourself to be dangerous even when exhausted.' },
      { week: 4, day: 3, title: '🏆 SPARRING SHOWCASE: 10min warm-up → 6x3min sparring rounds at 70-80% intensity with full protective gear → Cool-down + constructive feedback → Celebrate completing the program!', detail: 'Apply everything you have learned. Work behind your jab. Move your head after every exchange. Breathe. This is the culmination of 4 weeks of dedicated training. Win or learn — either way, you have grown.' },
    ]
  },
  {
    id: 'basketball-skills',
    title: 'Basketball Skills Accelerator',
    emoji: '🏀',
    color: '#f97316',
    duration: '4 weeks',
    level: 'All Levels',
    sport: 'Basketball',
    description: 'Complete skill development: shooting, ball handling, finishing, defence, and game IQ.',
    sessions: [
      { week: 1, day: 1, title: 'Shooting Foundations: 10min dynamic warm-up + form shooting close to basket (50 makes, focus on straight elbow, soft wrist, follow-through frozen until ball hits) → Free throws: 25 with pre-shot routine → Mid-range: 5 spots, 10 makes each → Cool-down + stretch', detail: 'Build your shot from close range out. Hold your follow-through until the ball goes through the net — this grooves proper mechanics. Same routine on every free throw. Consistency is everything.' },
      { week: 1, day: 2, title: 'Ball Handling: 10min warm-up → Stationary dribbling: pound dribble (waist high, hard) each hand 2min, crossovers 2min, between legs 2min, behind back 2min → Cone weave: full court x5, protect the ball with off-arm → Two-ball dribbling 5min → Finishing: Mikan drill 20 makes each side → Stretch', detail: 'Pound the ball hard — soft dribbles get stolen. Keep your head up, eyes forward. Off-arm protects the ball like a shield. Mikan drill builds ambidextrous finishing.' },
      { week: 1, day: 3, title: 'Finishing + Footwork: 10min warm-up → Layup series: regular, reverse, inside-hand, outside-hand (10 makes each side) → Euro step: 15 reps each side, sell the first step with shoulders → Jump stop + pivot series: front pivot, reverse pivot into shot 15 reps → 1v1 from wing, 3 dribble max, 10 possessions → Stretch', detail: 'Finish with either hand from either side. The euro step is about changing direction to avoid the defender, not traveling. Jump stops give you options — you can shoot, pass, or pivot.' },
      { week: 2, day: 1, title: 'Game-Speed Shooting: 10min warm-up + form shooting → Catch-and-shoot: receive pass from partner, shoot immediately 5 spots x10 makes each → Off-screen shooting: curl off imaginary screen into jumper 5 spots x8 → 3PT shooting: 5 spots, 5 makes each (or 10 from comfortable range) → Free throws: 20 under fatigue → Stretch', detail: 'Game shots at game speed. Set your feet before catching — be ready to shoot on the catch. Off screens, run tight to the imaginary screener, shoulder to shoulder. Sprint into your shot.' },
      { week: 2, day: 2, title: 'Advanced Handles: 10min warm-up + stationary dribbling → Combo moves: crossover into between legs, between legs into behind back, behind back into spin move 10min → Full court speed dribble with moves at each line (crossover at free throw, between legs at half, behind back at far free throw, spin at baseline) x5 → 1v1 full court dribble tag 5min → Stretch', detail: 'Combine moves seamlessly. The best ball handlers change speed and direction unpredictably. Sell each move with your eyes and shoulders — make the defender believe the fake.' },
      { week: 2, day: 3, title: 'Defensive Foundations: 10min warm-up → Defensive slides: sideline to sideline x5 (stay low, hands active, do not cross feet) → Closeout drill: sprint to offensive player, short choppy steps, hands high 15 reps → 1v1 defence: 10 possessions, focus on staying in front → Help defence rotations: shell drill 10min → Stretch', detail: 'Defence wins games. Stay in a low athletic stance. Close out under control — do not fly past the shooter. Talk constantly on defence. The best defenders take pride in getting stops.' },
      { week: 3, day: 1, title: 'Off-Dribble Shooting: 10min warm-up → Pull-up jumpers: dribble into shot from elbow, both directions 15 makes each → Step-back: dribble into step-back jumper 10 makes each side → Pick and roll shooting: come off screen, read defence, pull-up or attack 15 reps → Free throws under pressure (miss = 5 push-ups) 20 attempts → Stretch', detail: 'Creating your own shot separates good scorers from great ones. The step-back creates space — push off front foot, land balanced. Off the pick, read the defender: if they go under, shoot. If they chase, attack the rim.' },
      { week: 3, day: 2, title: 'Passing + Decision Making: 10min warm-up → Passing drills: chest pass, bounce pass, overhead pass, one-hand push pass 50 reps each → Passing on the move: 3-man weave full court x10 → Fast break decision making: 2v1, 3v2 situations 20 reps → Pick and roll reads: pass to roller, pop, or opposite wing 20 reps → Stretch', detail: 'Great passers make teammates better. Lead your receiver — pass where they will be, not where they are. In transition, make the simple pass. The extra pass often creates the best shot.' },
      { week: 3, day: 3, title: 'Live Play + IQ: 10min warm-up + skill review → 3v3 half-court: 10 games to 3 baskets, rotate teams → 1v1 tournament: 10 games, first to 2 → Situational scrimmage: down 2 with 30 seconds, up 2 with 30 seconds etc 15min → Free throws + cool-down', detail: 'Apply your skills under pressure. In 3v3, spacing is critical — keep the floor balanced. Communicate on defence. In clutch situations, stay calm and make the right play, not the hero play.' },
      { week: 4, day: 1, title: 'Shooting Mastery: 10min warm-up + form shooting → Shooting gauntlet: make 5 from each of 7 spots (both corners, both wings, both elbows, top) moving between each — time yourself → 50 3PT makes (track attempts) → Off-dribble series: pull-up, step-back, sidestep 10 makes each → 25 free throws to finish → Stretch', detail: 'Track your makes vs attempts for honest feedback. Your shooting percentage tells the truth. The gauntlet simulates moving without the ball and shooting from different spots — game realistic.' },
      { week: 4, day: 2, title: 'Complete Player Workout: 10min warm-up → Ball handling 5min → Shooting 10min → Finishing 10min → Defence 10min → Free throws 10 → Conditioning: 17s drill (sprint sideline to sideline 17 times in under 1 minute)', detail: 'Full skills workout. Touch everything. The 17s drill is a basketball conditioning classic — it tests your fitness and mental toughness at the end of a long session.' },
      { week: 4, day: 3, title: '🏆 5v5 FULL GAME: Proper warm-up → Full court 5v5, 4x10min quarters → Track your stats: points, assists, rebounds, steals, turnovers → Cool-down + reflect on your 4-week journey', detail: 'This is your showcase. Play smart, play hard, play together. After the game, compare how you played to Week 1. The improvement is real. You are a more complete player.' },
    ]
  },
  {
    id: 'cycling-endurance',
    title: 'Cycling Endurance Builder',
    emoji: '🚴',
    color: '#10b981',
    duration: '6 weeks',
    level: 'Intermediate',
    sport: 'Cycling',
    description: 'Build serious cycling fitness: endurance, climbing, threshold power, and century readiness.',
    sessions: [
      { week: 1, day: 1, title: 'Base Ride: 25km at Zone 2 (conversational pace, 60-70% max HR) → Focus on smooth pedalling, cadence 85-95rpm → 5min cool-down easy spin', detail: 'Zone 2 is your foundation. You should be able to talk in full sentences. This builds mitochondrial density and fat-burning capacity. Smooth circles — no stomping.' },
      { week: 1, day: 2, title: 'Hill Introduction: 10km warm-up easy → Find a moderate hill (4-6% grade): 6x2min seated climbs at steady effort, recover spinning down → 5km cool-down easy → Stretch hamstrings, quads, glutes, lower back', detail: 'Stay seated for these climbs. Keep cadence above 65rpm. Hands on hoods, relaxed grip. Breathe rhythmically. The descent is your recovery — soft pedal, do not coast completely.' },
      { week: 1, day: 3, title: 'Weekend Endurance: 45km at Zone 2 → Practise eating: consume 30-60g carbs per hour (banana, energy bar, gels) → Drink 500-750ml water with electrolytes → Finish with 5min easy spin', detail: 'Long ride nutrition matters as much as fitness. Eat before you are hungry, drink before you are thirsty. If you bonk (hit the wall), you went too hard or under-fuelled. Record what you ate and how you felt.' },
      { week: 2, day: 1, title: 'Tempo Ride: 30km at Zone 3 (brisk pace, breathing deeper but controlled, 75-85% max HR) → 5min easy spin warm-up and cool-down → Cadence focus: hold 90rpm throughout', detail: 'Zone 3 = comfortably hard. You can speak in short sentences. This is your cruising pace for faster group rides. Maintain aero position where safe.' },
      { week: 2, day: 2, title: 'Hill Repeats: 10km warm-up → Find hill (5-8% grade): 8x2min climbs, alternating seated (even reps) and standing (odd reps) → Recover spinning down → 5km cool-down', detail: 'Standing climbs: hands on hoods, bike rocks slightly, weight over pedals. Seated: slide back on saddle, engage glutes. Out of saddle on steepest sections only — it uses more energy.' },
      { week: 2, day: 3, title: 'Weekend Endurance: 60km with 400m elevation → Zone 2 pace on flats, steady effort on climbs → Fuel: eat every 45min, drink regularly → Negative split: second 30km faster than first 30km if feeling good → 5min cool-down spin', detail: 'Negative splitting teaches pacing. Most riders start too fast and fade. Hold back early, finish strong. Record your moving time and average speed.' },
      { week: 3, day: 1, title: 'Cadence + Efficiency: 10km warm-up → Main set: 5x (5min at 100-110rpm high cadence, 3min at 70-80rpm low cadence) → Focus on smooth pedal stroke in both ranges → 5km cool-down', detail: 'High cadence spares your muscles but taxes your cardiovascular system. Low cadence builds strength. Training both makes you a complete cyclist. No bouncing in the saddle at high rpm.' },
      { week: 3, day: 2, title: 'Threshold Intervals: 10km warm-up → 3x10min at Zone 4 (hard, can only say a few words, 85-95% max HR) with 5min easy spin between → 5km cool-down → Stretch + refuel immediately after', detail: 'Threshold training raises the pace you can sustain. These hurt but are the most effective session for getting faster. Pace evenly within each interval — do not start too hard and fade.' },
      { week: 3, day: 3, title: 'Weekend Endurance: 75km rolling terrain → Practise group riding skills if with others: drafting, pace line, hand signals → Fuel every 40min → Aim to feel strong at the finish → 5min cool-down + full stretch', detail: 'Drafting saves 20-30% energy. Stay 1-2 feet behind the wheel ahead. Do not overlap wheels — that causes crashes. Point out hazards for riders behind you.' },
      { week: 4, day: 1, title: 'Recovery Week: 25km very easy Zone 1-2 spin → No hard efforts → Focus on enjoyment and light movement → Stretch and foam roll after', detail: 'Deload week. Your body builds fitness during recovery, not during training. Sleep extra, eat well, stay hydrated. You will feel stronger next week.' },
      { week: 4, day: 2, title: 'Sprint Session: 10km warm-up → 8x15sec max effort sprints from slow speed (big gear, accelerate hard) with full 3-4min recovery → 5km cool-down → Do not attempt on busy roads', detail: 'Sprints build explosive power and fast-twitch recruitment. Safe location essential. Start in a moderate gear seated, stand and accelerate hard. Full recovery between efforts.' },
      { week: 4, day: 3, title: 'Social Ride: 50km at conversational pace with friends or solo → Coffee stop allowed → Enjoy the ride, no performance pressure', detail: 'Not every ride needs to be training. Social rides build bike-handling skills and remind you why you love cycling. Still counts towards your weekly volume.' },
      { week: 5, day: 1, title: 'Over-Under Intervals: 10km warm-up → 4x8min (2min at threshold + 30sec surge above threshold + 2min threshold + 30sec surge) with 4min easy between → 5km cool-down', detail: 'Simulates race conditions: steady hard pace with attacks. The surges train your body to clear lactate while still working hard. Mental toughness required.' },
      { week: 5, day: 2, title: 'Big Climbing Day: Plan a route with 1000m+ total elevation → Pace climbs at threshold, recover on descents and flats → Fuel heavily: eat every 30min → Enjoy the views at the top → 5km easy spin cool-down', detail: 'This is your biggest climbing day. Pace the first climb conservatively — you have more climbing ahead. Use your gears. Standing and seated positions to use different muscles.' },
      { week: 5, day: 3, title: 'Weekend Endurance: 90km long ride → Goal: complete the distance comfortably → Zone 2 mostly, steady on any climbs → Practise century nutrition plan → 5min cool-down + refuel with proper meal within 1 hour', detail: 'Dress rehearsal for the century. Test your kit, nutrition, and pacing. Nothing new on ride day. If anything chafes or hurts, address it before next week.' },
      { week: 6, day: 1, title: 'Taper: 30km easy Zone 2 spin → 4x30sec gentle accelerations (not sprints) to keep legs open → Clean and lube your bike → Lay out all kit for the century', detail: 'Taper week. Reduce volume by 50%. Carbo-load: increase carb intake 2-3 days before the century. Check tyres, brakes, chain. Charge your lights and computer.' },
      { week: 6, day: 2, title: 'Short Activation: 20km very easy → 3x1min at century goal pace, 3min easy between → Check bike is working perfectly → Early night, 8+ hours sleep', detail: 'Keep legs moving without fatigue. Visualise the ride: the start, the middle, the tough parts, the finish. Mental preparation is as important as physical.' },
      { week: 6, day: 3, title: '🏆 CENTURY RIDE: 100km! Start easy, pace conservatively for first 50km → Build through 50-80km if feeling good → Empty the tank final 20km if you have it → Celebrate at the finish — you are a century rider!', detail: 'You have trained for 6 weeks for this. Start slower than you think you need to. Eat and drink on schedule from kilometre one. The halfway point is 80km mentally — save energy for the end. Smile for the finish photo.' },
    ]
  },
  {
    id: 'tennis-match-ready',
    title: 'Tennis Match Ready 4-Week Program',
    emoji: '🎾',
    color: '#eab308',
    duration: '4 weeks',
    level: 'Intermediate',
    sport: 'Tennis',
    description: 'Complete match preparation: serve, groundstrokes, volleys, footwork, tactics, and mental game.',
    sessions: [
      { week: 1, day: 1, title: 'Serve + Groundstrokes: 10min dynamic warm-up (arm circles, leg swings, light jog) → Serve practice: 60 balls, focus on consistent toss (same height, same place), smooth motion → Forehand: crosscourt rallies 20min, target deep corner → Backhand: crosscourt 20min → 20 serves mixing placement → Cool-down stretch', detail: 'The toss is the most important part of the serve. If your toss is consistent, your serve will be consistent. Hold the ball in your fingertips, release at eye level, arm fully extended. For groundstrokes, focus on depth — past the service line is the target.' },
      { week: 1, day: 2, title: 'Net Game + Movement: 10min warm-up → Volley drills: partner feeds from baseline, you volley from net 20min (focus on punch, short backswing) → Overhead practice: 15 smashes from service line → Footwork: split step drill 10min, spider drill 5 reps → Approach shots: hit deep to corner, follow to net 15 reps → Stretch', detail: 'Volleys use a continental grip (like holding a hammer). Punch through the ball — the pace comes from the opponent. Split step every time your opponent hits — it loads your legs to move in any direction.' },
      { week: 1, day: 3, title: 'Match Play + Analysis: 10min warm-up + light rally → Play a practice set, focusing on consistency over winners → Track unforced errors (write them down) → After: identify your 3 most common errors → 10min serving practice on your weakest spot → Stretch', detail: 'Data does not lie. If you made 20 unforced errors on your backhand, that is what you practise next week. Winners feel great but consistency wins matches at the recreational level.' },
      { week: 2, day: 1, title: 'Serve Precision + Returns: 10min warm-up → Serve targets: place cones in wide, body, T positions — 10 serves to each target from deuce and ad sides (60 total) → Return practice: partner serves, you focus on short backswing and deep returns 30 reps → Point patterns: serve +1 (serve then attack first groundstroke) 20 reps → Stretch', detail: 'Serving to targets makes your serve a weapon, not just a starter. The return of serve is the second most important shot — a deep return neutralises the server advantage. Short backswing, block the ball deep.' },
      { week: 2, day: 2, title: 'Aggressive Groundstrokes: 10min warm-up → Inside-out forehand: run around backhand, hit forehand to opponent backhand corner 20 reps → Down-the-line: from crosscourt rally, change direction down the line 20 reps each wing → Approach + volley combination: deep shot, follow in, finish volley 20 reps → Point simulation: crosscourt until short ball, then attack 15min → Stretch', detail: 'The inside-out forehand is one of the most powerful patterns in tennis. Changing direction down the line from a crosscourt rally is high risk — do it off a shorter, easier ball. Patience builds the point.' },
      { week: 2, day: 3, title: 'Fitness + Mental Toughness: 10min warm-up → Tennis-specific conditioning: 30sec sprint, 30sec jog, 30sec side shuffle, 30sec rest x8 rounds → Shadow swings with racket: 3x2min full intensity footwork + swings → Play tiebreaks: 3 tiebreaks against partner, track your mental state → Stretch + reflect', detail: 'Tennis fitness is about repeated short sprints with quick recovery. Mental toughness in tiebreaks: focus on one point at a time. Breathe between points. Control what you can control — your effort and attitude.' },
      { week: 3, day: 1, title: 'Serve Dominance: 10min warm-up → 100 serves: 25 flat (power), 25 slice (wide), 25 kick (body/safety), 25 choice (mix) → Second serve focus: 30 high-spin serves that clear the net safely and kick up → Serve + volley: serve and rush net 20 reps → Stretch shoulders thoroughly', detail: 'A reliable second serve is essential. Use topspin or slice to bring the ball down into the box with margin over the net. A weak second serve gets attacked. Your second serve should be different from your first — more spin, less pace, higher net clearance.' },
      { week: 3, day: 2, title: 'Defence to Offence: 10min warm-up → Defensive drills: partner attacks, you defend deep and high 15min → Counter-attack: from defensive position, when you get a shorter ball, attack it 20 reps → Lob + passing shot practice: when opponent approaches net, lob or pass 20 reps → Match scenario: start each point on defence 20 points → Stretch', detail: 'Defence keeps you in points. High, deep balls give you time to recover. The transition from defence to offence wins matches — recognise the short ball early and step in to attack.' },
      { week: 3, day: 3, title: 'Full Match + Tactical Review: 10min warm-up → Best of 3 sets practice match with full warm-up and cool-down → During changeovers, write notes on what is working/not working → After match: review notes, identify patterns → 10min cool-down hit + stretch', detail: 'Play at match intensity. Practise your between-point routines. Use changeovers to analyse and adjust. Are you losing points from the baseline or at net? On your serve or return? The answers guide your training.' },
      { week: 4, day: 1, title: 'Weapon Development: 10min warm-up → Identify your best shot — spend 30min making it even better (pace, placement, consistency) → Identify your weakest shot — spend 20min on targeted improvement drills → Combine: use your weapon to set up points, protect your weakness 15min → 50 serves mixing all types → Stretch', detail: 'Your weapon is the shot that wins you points or sets up easy finishes. Your weakness is the shot opponents target. You do not need to make your weakness a weapon — just make it reliable enough to stay in points.' },
      { week: 4, day: 2, title: 'Pre-Match Preparation: 10min warm-up → Light hitting: focus on timing and feel, not intensity 20min → 30 serves at 70% pace → 15 returns → Volley + overhead light practice 10min → Visualisation: mentally play through your match, seeing yourself executing shots successfully → Stretch + hydrate', detail: 'The day before competition is about feeling good, not training hard. Light, rhythmic hitting. Build your pre-match routine: what you eat, how you warm up, what you think about. Trust your preparation.' },
      { week: 4, day: 3, title: '🏆 COMPETITION DAY! Full warm-up routine (jog, dynamic, rally, serves, returns) → Play your match → Win or learn — debrief afterwards → Cool-down stretch + refuel → Celebrate completing the program!', detail: 'You have put in 4 weeks of dedicated work. Stick to your routines. Between points, control your breathing. Between games, hydrate. Between sets, reflect and adjust. Whatever the result, you are a better player than when you started.' },
    ]
  },
  {
    id: 'golf-scratch',
    title: 'Golf: Breaking 90 in 6 Weeks',
    emoji: '⛳',
    color: '#84cc16',
    duration: '6 weeks',
    level: 'Intermediate',
    sport: 'Golf',
    description: 'Complete scoring system: driving, iron play, short game, putting, course management, and mental approach.',
    sessions: [
      { week: 1, day: 1, title: 'Driving + Alignment: 10min warm-up (stretching, light swings) → Alignment setup: use alignment sticks on ground, practise aligning feet/hips/shoulders parallel to target 10min → Driving range: 40 balls, focus on straight shots and fairway finding, not distance → Record: how many fairways would you have hit? → Putting green: 20min short putts (3-6 feet)', detail: 'Poor alignment causes more missed fairways than poor swings. Lay a club or alignment stick along your toe line pointing at your target. Your feet, hips, and shoulders should all be parallel to that line. Fairways hit is the single biggest stat that correlates to lower scores.' },
      { week: 1, day: 2, title: 'Putting Fundamentals: 10min warm-up → Grip and setup check: eyes over ball, arms hanging naturally, ball position slightly forward → 3-foot circle drill: place 6 balls around hole at 3 feet, must make all before moving back → 6-foot drill: 10 in a row from 6 feet → Lag putting: from 30 feet, get every ball within 3 feet (do 20) → Record your stats', detail: 'Putting is 40% of your score. Short putts save more strokes than long drives ever will. Rock your shoulders like a pendulum — no wrist break. Eyes directly over the ball. Same tempo on every stroke.' },
      { week: 1, day: 3, title: 'Chipping + Pitching: 10min warm-up → Chipping technique: weight forward, hands ahead, use 8-iron through sand wedge → Landing spot drill: pick a spot 1 metre onto green, land every chip there, let ball release to hole (30 chips) → Pitching: 20-40 yard shots, focus on distance control (20 balls) → Bunker basics: 10 practice swings in sand, then 10 bunker shots → Stretch', detail: 'Chip with different clubs — 8-iron runs more, sand wedge stops quicker. The key to chipping is controlling the landing spot, not the hole. Let the ball roll like a putt. In bunkers, hit the sand 2 inches behind the ball and accelerate through.' },
      { week: 2, day: 1, title: 'Iron Play Distance Control: 10min warm-up → Pick 3 clubs (e.g. 7-iron, 9-iron, pitching wedge) → Hit 10 balls with each, record carry distance for every shot → Calculate your average distance per club → Now practise hitting to specific yardages: pick a target, hit 10 balls trying to land within 5 yards → Stretch', detail: 'Knowing your exact distances removes guesswork. Most amateurs overestimate how far they hit each club. Write down your averages and trust them on the course. A smooth 7-iron that goes 140 yards on the green beats a hard 7-iron that misses.' },
      { week: 2, day: 2, title: 'Putting Distance Control: 10min warm-up → Lag putting ladder: from 20, 30, 40, 50 feet, 5 balls from each — goal is to stop every ball within 2 feet → Uphill/downhill: find a sloping putt, practise both directions 15min → 10-foot circle: 10 balls at 10 feet, track how many you make → Finish with 20 x 3-footers for confidence', detail: 'Three-putts are scorecard killers. Speed determines line — get the pace right and you will rarely three-putt. Look at the putt from behind the hole as well as behind the ball. On long putts, imagine rolling the ball to a hula hoop around the hole.' },
      { week: 2, day: 3, title: '9-Hole Playing Lesson: Warm up properly (range, chips, putts) → Play 9 holes with a focus on course management: aim for centre of greens, no hero shots → Track: fairways hit, greens in regulation, putts, score → After round: analyse where you lost strokes → Stretch', detail: 'Playing smart drops scores faster than hitting it further. Centre of the green is never a bad miss. If you are in trouble, take your medicine — punch out sideways and save bogey rather than attempting the miracle shot that leads to triple.' },
      { week: 3, day: 1, title: 'Driving Accuracy + Course Strategy: 10min warm-up → 30 drives: imagine a 40-yard wide fairway, track how many would hit → Club selection strategy: on tight holes, use 3-wood or hybrid instead of driver — 20 balls with your fairway finder club → Pre-shot routine: build a consistent 20-second routine and repeat it before every shot → Stretch', detail: 'You do not have to hit driver on every hole. A 220-yard 3-wood in the fairway beats a 260-yard driver in the trees. Build a pre-shot routine: stand behind ball, pick target, visualise shot, approach, fire. Same routine every time reduces nerves.' },
      { week: 3, day: 2, title: 'Short Game Scoring Zone: 10min warm-up → Up-and-down challenge: from 20 yards off green, chip and putt out — track how many you get up and down out of 20 → Bunker: 20 shots from greenside bunkers, goal is to get every ball on the green → Flop shot (if comfortable): 10 high soft shots over imaginary bunker → Putting: 20 x 4-footers under pressure (miss = start over)', detail: 'The scoring zone is inside 100 yards. Getting up and down saves par when you miss the green. A good short game covers up a lot of mistakes. Pressure putting practice makes real putts feel easier.' },
      { week: 3, day: 3, title: '18-Hole Statistical Round: Full warm-up → Play 18 holes, track detailed stats: fairways, GIR, putts, up-and-downs, sand saves, penalty strokes → After: calculate strokes gained/lost in each category → Identify your #1 scoring weakness → Stretch + reflect', detail: 'This round is about gathering data, not your score. You will learn exactly where you lose strokes. Most players lose 5-8 shots per round to poor short game and putting. Those are the easiest to improve — they require practice, not athleticism.' },
      { week: 4, day: 1, title: 'Targeted Weakness Fix: Based on your 18-hole stats, spend 60% of this session on your biggest weakness → If driving: alignment, tempo, fairway finder → If irons: distance control, consistent contact → If short game: chipping/pitching focus → If putting: distance control or short putts → 40% on maintaining strengths → Stretch', detail: 'Your stats from the 18-hole round guide this session. Do not guess what to practise — let the data tell you. If you lost 8 strokes putting, spend most of this session on the green. Specific practice beats general practice every time.' },
      { week: 4, day: 2, title: 'Long Irons + Hybrids: 10min warm-up → 4-iron, 5-iron, 6-iron (or equivalent hybrids): 10 balls each, focus on sweeping contact → Low punch shot: practise keeping ball low under imaginary trees 20 balls → Fairway wood off the deck: 15 shots → Stretch', detail: 'Long irons are the hardest clubs to hit. Sweep the ball — do not try to lift it. Ball position slightly forward of centre. Smooth tempo, not extra effort. The punch shot is a valuable recovery tool for when you are in trouble.' },
      { week: 4, day: 3, title: '9-Hole Scoring Round: Warm-up → Play 9 holes with your new skills → Focus on the area you have been improving → Track stats → Set a target score for the full 18-hole test → Stretch', detail: 'Mid-program check-in. You should already see improvement in your focus area. Trust the process. Golf improvement is not linear — you will have good and bad days. Look at the trend, not individual rounds.' },
      { week: 5, day: 1, title: 'Pressure Practice: 10min warm-up → Create consequences: if you miss a fairway, 10 push-ups. If you 3-putt, 20 push-ups → Play 9 holes on range: visualise each hole, hit driver then appropriate iron → Putting pressure test: must make 10 x 4-footers in a row — start over if you miss → Stretch', detail: 'Training with consequences simulates on-course pressure. Your heart rate will rise, just like in a real round. Learning to execute when it matters is a skill — practise it. Pressure is a privilege.' },
      { week: 5, day: 2, title: 'Short Game Mastery: 10min warm-up → Chipping: 30 balls from varying lies (tight, rough, uphill, downhill) → Pitching: 20 balls from 30-60 yards, target within 10 feet → Bunker: 15 shots from different sand conditions → Putting: 18-hole putting challenge (simulate 2 putts per hole, track total putts) → Stretch', detail: 'Short game travels — it works on any course. A scratch short game can make up for a poor long game. Focus on clean contact and distance control. The hole will get in the way eventually.' },
      { week: 5, day: 3, title: 'Pre-Test Tune-Up: Full warm-up routine → Light range session: 30 balls working through the bag, focus on tempo → Short game: 15 chips, 10 bunker shots → Putting: 20 minutes on speed control → Visualise tomorrow round, hole by hole → Early night, good sleep', detail: 'Day before the big round. Do not over-practise — you cannot fix anything major now. Trust what you have built over 5+ weeks. Lay out your clothes, pack your bag, check the weather. Visualisation is powerful — see yourself hitting good shots.' },
      { week: 6, day: 1, title: 'Range Simulation: Warm-up → Play 18 holes on the range: tee shot with driver/wood, approach with appropriate iron, then imaginary chip/putt → Track virtual score → 20 minutes short game → 15 minutes putting → Stretch', detail: 'Simulating the round builds confidence and routine. Go through your full pre-shot routine on every ball. This is dress rehearsal. Visualise your home course or the course you will play for the test.' },
      { week: 6, day: 2, title: 'Light Tune-Up: 10min warm-up → 20 balls on range (just to feel contact) → 10 chips → 20 putts from varying distances → Clean clubs, pack bag, check equipment → Watch golf or read about course management → Early night', detail: 'Minimal activity. Keep your body moving but save energy. Check you have enough balls, tees, gloves, water, snacks. Lay everything out. Visualise the first tee shot. Confidence comes from preparation.' },
      { week: 6, day: 3, title: '🏆 18 HOLES: BREAK 90! Full warm-up routine → Play 18 holes with smart course management → Aim for centre of greens, lag putt for 2-putts, take your medicine from trouble → Record your score and stats → Celebrate — you have worked hard for this!', detail: 'Today is about execution, not perfection. You will hit bad shots — everyone does. Your response to bad shots determines your score. Stay present. One shot at a time. After the round, compare to your starting scores 6 weeks ago. The progress is undeniable.' },
    ]
  },
]
const suggestedWorkouts = [
  { title: 'HIIT Cardio', duration: '20min', emoji: '🔥', nav: 'gym-hub' },
  { title: 'Upper Body Strength', duration: '45min', emoji: '💪', nav: 'gym-hub' },
  { title: 'Passing Drills', duration: '30min', emoji: '⚽', nav: 'football-hub' },
  { title: 'Agility Ladder', duration: '20min', emoji: '⚡', nav: 'running-hub' },
];

function LogSession({ setActiveNav, footballSessions, setFootballSessions, addSocialPost }: any) {
  const [userPosition, setUserPosition] = useState<'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'>('Forward')
  const [sessionType, setSessionType] = useState('')
  const [matchType, setMatchType] = useState('')
  const [opponent, setOpponent] = useState('')
const [homeAway, setHomeAway] = useState('')
const [result, setResult] = useState('')
const [yourScore, setYourScore] = useState('')
const [opponentScore, setOpponentScore] = useState('')
  const [trainingContext, setTrainingContext] = useState('')
  const [duration, setDuration] = useState('')
  const [goals, setGoals] = useState('')
  const [assists, setAssists] = useState('')
  const [saves, setSaves] = useState('')
  const [blocks, setBlocks] = useState('')
  const [tackles, setTackles] = useState('')
  const [yellowCards, setYellowCards] = useState('0')
  const [redCards, setRedCards] = useState('0')
  const [shots, setShots] = useState('0')
const [shotsOnTarget, setShotsOnTarget] = useState('0')
const [keyPasses, setKeyPasses] = useState('0')
const [passAccuracy, setPassAccuracy] = useState('')
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState(7)
  const [drillInput, setDrillInput] = useState('')
  const [drillCount, setDrillCount] = useState('')
  const [drills, setDrills] = useState<{name: string, count: string}[]>([])
  const [saved, setSaved] = useState(false)
  const [aiReport, setAiReport] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [goalTypes, setGoalTypes] = useState<string[]>([])

  const addGoalType = (type: string) => {
    if (goalTypes.length < (parseInt(goals) || 0)) {
      setGoalTypes([...goalTypes, type])
    }
  }

  const generateAIReport = async () => {
    setAiLoading(true)
    setAiReport('')
    try {
      const prompt = `You are a football performance analyst. Write a short, punchy, personalised match report (3-4 sentences max) for a player based on these stats:

Player position: ${userPosition}
Match type: ${matchType || 'Match'}
Opponent: ${opponent || 'Unknown'}
Home/Away: ${homeAway || 'Unknown'}
Result: ${result || 'Unknown'} (${yourScore || 0}-${opponentScore || 0})
Goals: ${goals || 0}
Assists: ${assists || 0}
Shots: ${shots || 0}
Shots on target: ${shotsOnTarget || 0}
Key passes: ${keyPasses || 0}
Pass accuracy: ${passAccuracy || 0}%
Tackles: ${tackles || 0}
Saves: ${saves || 0}
Yellow cards: ${yellowCards || 0}
Red cards: ${redCards || 0}
Player rating: ${rating}/10
Notes: ${notes || 'None'}

Write in second person ("You played..."). Be honest but encouraging. Highlight the best moments and one area to improve. Keep it under 80 words.`

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-or-v1-8cf...0b4',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      })

      const data = await response.json()
      console.log('API response:', JSON.stringify(data))
      if (data.error) {
        setAiReport(`API Error: ${data.error.message}`)
        setAiLoading(false)
        return
      }
      const text = data.choices?.[0]?.message?.content || 'Could not generate report.'
      setAiReport(text)
    } catch (e: any) {
      setAiReport(`Error: ${e?.message || JSON.stringify(e)}`)
    }
    setAiLoading(false)
  }

  const handleAddDrill = () => {
    if (drillInput.trim()) {
      setDrills([...drills, { name: drillInput, count: drillCount }])
      setDrillInput('')
      setDrillCount('')
    }
  }

  const handleSave = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('football_sessions').insert({
        user_id: session.user.id,
        session_type: sessionType,
        position: userPosition,
        match_type: matchType,
        training_context: trainingContext,
        opponent,
home_away: homeAway,
result,
your_score: parseInt(yourScore) || 0,
opponent_score: parseInt(opponentScore) || 0,
        duration: parseInt(duration) || 0,
        goals: parseInt(goals) || 0,
      goalTypes,
        assists: parseInt(assists) || 0,
        saves: parseInt(saves) || 0,
        blocks: parseInt(blocks) || 0,
        tackles: parseInt(tackles) || 0,
        yellow_cards: parseInt(yellowCards) || 0,
        red_cards: parseInt(redCards) || 0,
        rating,
        shots: parseInt(shots) || 0,
shots_on_target: parseInt(shotsOnTarget) || 0,
key_passes: parseInt(keyPasses) || 0,
pass_accuracy: parseInt(passAccuracy) || 0,
        notes
      })
    }
    const newSession = {
      id: Date.now(),
      sessionType,
      session_type: sessionType,
      position: userPosition,
      matchType,
      match_type: matchType,
      trainingContext,
      opponent,
      homeAway,
      result,
      yourScore: parseInt(yourScore) || 0,
      opponentScore: parseInt(opponentScore) || 0,
      duration: parseInt(duration) || 0,
      goals: parseInt(goals) || 0,
      assists: parseInt(assists) || 0,
      saves: parseInt(saves) || 0,
      blocks: parseInt(blocks) || 0,
      tackles: parseInt(tackles) || 0,
      yellowCards: parseInt(yellowCards) || 0,
      redCards: parseInt(redCards) || 0,
      rating,
      shots: parseInt(shots) || 0,
      shotsOnTarget: parseInt(shotsOnTarget) || 0,
      keyPasses: parseInt(keyPasses) || 0,
      passAccuracy: parseInt(passAccuracy) || 0,
      notes,
      date: new Date().toISOString().split('T')[0]
    }
    setFootballSessions([newSession, ...(footballSessions || [])])
    if (sessionType === 'Match') {
      addSocialPost({
        sport: 'Football',
        sportColor: '#22c55e',
        emoji: '⚽',
        caption: `Played a ${matchType || 'match'} — ${yourScore}-${opponentScore} ${result || ''} · ${goals || 0} goals · ${assists || 0} assists · Rated ${rating}/10`
      })
    }
    playHaptic()
    playSound('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const suggestedRating = Math.min(10, Math.max(1,
    6 +
    ((parseInt(goals) || 0) * 0.9) +
    ((parseInt(assists) || 0) * 0.6) +
    ((parseInt(shotsOnTarget) || 0) * 0.15) +
    ((parseInt(keyPasses) || 0) * 0.2) +
    ((parseInt(passAccuracy) || 0) >= 85 ? 0.5 : 0) +
    ((parseInt(tackles) || 0) * 0.15) +
    ((parseInt(saves) || 0) * 0.25) -
    ((parseInt(yellowCards) || 0) * 0.4) -
    ((parseInt(redCards) || 0) * 1.5)
  )).toFixed(1)

  const applySuggestedRating = () => {
    setRating(Number(suggestedRating));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        
        {sessionType === 'Match' && parseInt(goals) > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ background: '#13131f', border: '1px solid #22c55e35', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#22c55e', letterSpacing: '0.5px' }}>🎯 GOAL TYPE TAGGING ({goalTypes.length}/{goals})</span>
                <button onClick={() => setGoalTypes([])} style={{ background: 'none', border: 'none', color: '#666', fontSize: '11px', cursor: 'pointer' }}>Reset</button>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Header', 'Volley', 'Long Range', 'Penalty', 'Free Kick', 'Tap-in'].map((type) => {
                  const count = goalTypes.filter(t => t === type).length;
                  return (
                    <button key={type} onClick={() => addGoalType(type)} style={{ background: count > 0 ? '#22c55e20' : '#0a0a0f', border: `1px solid ${count > 0 ? '#22c55e' : '#1e1e30'}`, color: count > 0 ? '#22c55e' : '#aaa', borderRadius: '10px', padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>
                      {type} {count > 0 ? `x${count}` : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <button onClick={() => setActiveNav('football-hub')} style={{ background: 'none', border: 'none', color: '#22c55e', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log a Session</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px' }}>Record your football session</p>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>YOUR POSITION</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'] as const).map((pos) => (
              <button key={pos} onClick={() => setUserPosition(pos)} style={{ background: userPosition === pos ? '#22c55e20' : '#13131f', border: `1.5px solid ${userPosition === pos ? '#22c55e' : '#1e1e30'}`, borderRadius: '10px', color: userPosition === pos ? '#22c55e' : '#666', padding: '10px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{pos}</button>
            ))}
          </div>
        </div>

        {/* Session Type */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>SESSION TYPE</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Training', 'Drill', 'Match'].map((type) => (
              <button key={type} onClick={() => { setSessionType(type); setMatchType(''); setTrainingContext('') }} style={{ background: sessionType === type ? '#22c55e20' : '#13131f', border: `1.5px solid ${sessionType === type ? '#22c55e' : '#1e1e30'}`, borderRadius: '10px', color: sessionType === type ? '#22c55e' : '#666', padding: '10px 18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
            ))}
          </div>
        </div>

        {/* Training or Drill — context */}
        {sessionType === 'Training' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>TRAINING CONTEXT</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['With Club', 'Personal'].map((ctx) => (
                <button key={ctx} onClick={() => setTrainingContext(ctx)} style={{ background: trainingContext === ctx ? '#22c55e20' : '#13131f', border: `1.5px solid ${trainingContext === ctx ? '#22c55e' : '#1e1e30'}`, borderRadius: '10px', color: trainingContext === ctx ? '#22c55e' : '#666', padding: '10px 18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{ctx}</button>
              ))}
            </div>
          </div>
        )}

        {/* Match — match type */}
        {sessionType === 'Match' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>MATCH TYPE</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['5-a-side', 'Sunday League', 'Kickabout'].map((type) => (
                <button key={type} onClick={() => setMatchType(type)} style={{ background: matchType === type ? '#22c55e20' : '#13131f', border: `1.5px solid ${matchType === type ? '#22c55e' : '#1e1e30'}`, borderRadius: '10px', color: matchType === type ? '#22c55e' : '#666', padding: '10px 18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
              ))}
            </div>
          </div>
        )}

        {/* Match Overview */}
        {sessionType === 'Match' && (
          <div style={{
            background: 'linear-gradient(135deg, #13131f, #10101a)',
            border: '1px solid #22c55e25',
            borderLeft: '4px solid #22c55e',
            borderRadius: '20px',
            padding: '18px',
            marginBottom: '22px'
          }}>
            <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>
              MATCH OVERVIEW
            </div>

            <input value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="Opponent / team name" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' }} />

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {['Home', 'Away', 'Neutral'].map((type) => (
                <button key={type} onClick={() => setHomeAway(type)} style={{ background: homeAway === type ? '#22c55e20' : '#0a0a0f', border: `1.5px solid ${homeAway === type ? '#22c55e' : '#1e1e30'}`, borderRadius: '20px', color: homeAway === type ? '#22c55e' : '#666', padding: '7px 13px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>{type}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <input value={yourScore} onChange={(e) => {
                const v = e.target.value
                setYourScore(v)
                if (v !== '' && opponentScore !== '') {
                  const ys = parseInt(v) || 0
                  const os = parseInt(opponentScore) || 0
                  setResult(ys > os ? 'Win' : ys < os ? 'Loss' : 'Draw')
                }
              }} placeholder="Your score" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', boxSizing: 'border-box' }} />
              <input value={opponentScore} onChange={(e) => {
                const v = e.target.value
                setOpponentScore(v)
                if (yourScore !== '' && v !== '') {
                  const ys = parseInt(yourScore) || 0
                  const os = parseInt(v) || 0
                  setResult(ys > os ? 'Win' : ys < os ? 'Loss' : 'Draw')
                }
              }} placeholder="Their score" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Win', 'Draw', 'Loss'].map((r) => (
                <button key={r} onClick={() => setResult(r)} style={{ background: result === r ? '#22c55e20' : '#0a0a0f', border: `1.5px solid ${result === r ? '#22c55e' : '#1e1e30'}`, borderRadius: '20px', color: result === r ? '#22c55e' : '#666', padding: '7px 13px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>{r}</button>
              ))}
            </div>
          </div>
        )}

        {/* Position */}
        {sessionType !== '' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>POSITION</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Goalkeeper', 'Defender', 'Midfielder', 'Forward'].map((pos: any) => (
                <button
                  key={pos}
                  onClick={() => setUserPosition(pos)}
                  style={{
                    background: userPosition === pos ? '#22c55e20' : '#13131f',
                    border: `1.5px solid ${userPosition === pos ? '#22c55e' : '#1e1e30'}`,
                    borderRadius: '20px',
                    color: userPosition === pos ? '#22c55e' : '#666',
                    padding: '7px 13px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Duration */}
        {sessionType !== '' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>DURATION (minutes)</label>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="60" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
          </div>
        )}

        {/* Match Performance Stats */}
        {sessionType === 'Match' && (
          <div style={{
            background: 'linear-gradient(135deg, #13131f, #10101a)',
            border: '1px solid #22c55e25',
            borderLeft: '4px solid #22c55e',
            borderRadius: '20px',
            padding: '18px',
            marginBottom: '22px',
            boxShadow: '0 0 25px rgba(34,197,94,0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: '900', letterSpacing: '0.8px' }}>
                  PERFORMANCE
                </div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>
                  Tap + or − to update your match stats
                </div>
              </div>
              <div style={{ fontSize: '26px' }}>📊</div>
            </div>

            {[
              ...(userPosition === 'Goalkeeper' ? [
                { label: 'Saves', emoji: '🧤', value: saves, setter: setSaves }
              ] : []),
              ...(userPosition === 'Defender' ? [
                { label: 'Blocks', emoji: '🧱', value: blocks, setter: setBlocks },
                { label: 'Tackles', emoji: '🛡️', value: tackles, setter: setTackles }
              ] : []),
              ...((userPosition === 'Forward' || userPosition === 'Midfielder') ? [
                { label: 'Goals', emoji: '⚽', value: goals, setter: setGoals },
                { label: 'Shots', emoji: '🎯', value: shots, setter: setShots },
                { label: 'On Target', emoji: '🥅', value: shotsOnTarget, setter: setShotsOnTarget },
                { label: 'Assists', emoji: '🅰️', value: assists, setter: setAssists }
              ] : []),
              { label: 'Yellow Cards', emoji: '🟨', value: yellowCards, setter: setYellowCards },
              { label: 'Red Cards', emoji: '🟥', value: redCards, setter: setRedCards }
            ].map((stat: any) => (
              <div key={stat.label} style={{
                background: '#0a0a0f',
                border: '1px solid #1e1e30',
                borderRadius: '16px',
                padding: '14px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '900' }}>{stat.emoji} {stat.label}</div>
                  <div style={{ color: '#666', fontSize: '11px', marginTop: '3px' }}>Match stat</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={() => stat.setter(String(Math.max(0, (parseInt(stat.value) || 0) - 1)))} style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid #ef444450', background: '#ef444415', color: '#ef4444', fontSize: '20px', fontWeight: '900', cursor: 'pointer' }}>−</button>
                  <div style={{ minWidth: '28px', textAlign: 'center', color: '#22c55e', fontSize: '22px', fontWeight: '900' }}>{stat.value || 0}</div>
                  <button onClick={() => stat.setter(String((parseInt(stat.value) || 0) + 1))} style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid #22c55e50', background: '#22c55e15', color: '#22c55e', fontSize: '20px', fontWeight: '900', cursor: 'pointer' }}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

{(sessionType === 'Training' || sessionType === 'Drill') && (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>DRILLS COMPLETED</label>
    {drills.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        {drills.map((d, i) => (
          <div key={i} style={{ background: '#13131f', border: '1px solid #1e1e30', borderLeft: '3px solid #22c55e', borderRadius: '10px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>{d.name}</span>
            {d.count && <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: '700' }}>{d.count} reps</span>}
          </div>
        ))}
      </div>
    )}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
      {[
        { label: 'Finishing', emoji: '⚽' },
        { label: 'Free Kicks', emoji: '🎯' },
        { label: 'Corners', emoji: '📐' },
        { label: 'Penalties', emoji: '🥅' },
        { label: 'Dribbling', emoji: '🔄' },
        { label: 'Passing', emoji: '👟' },
        { label: 'Defending', emoji: '🛡️' },
        { label: 'Agility', emoji: '⚡' },
        { label: 'Fitness', emoji: '💪' },
      ].map((cat) => (
        <button key={cat.label} onClick={() => setDrillInput(cat.emoji + ' ' + cat.label)} style={{ background: drillInput === cat.emoji + ' ' + cat.label ? '#22c55e20' : '#13131f', border: `1.5px solid ${drillInput === cat.emoji + ' ' + cat.label ? '#22c55e' : '#1e1e30'}`, borderRadius: '20px', color: drillInput === cat.emoji + ' ' + cat.label ? '#22c55e' : '#666', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{cat.emoji} {cat.label}</button>
      ))}
    </div>
    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
      <input value={drillInput} onChange={(e) => setDrillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddDrill()} placeholder="Or type custom drill" style={{ flex: 1, background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
      <input value={drillCount} onChange={(e) => setDrillCount(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddDrill()} placeholder="Reps" style={{ width: '70px', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
    </div>
    <button onClick={handleAddDrill} style={{ width: '100%', background: '#22c55e15', border: '1.5px solid #22c55e40', borderRadius: '10px', color: '#22c55e', padding: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>+ Add Drill</button>
  </div>
)}

{/* Passing */}
{sessionType === 'Match' && (
  <div style={{
    background: '#13131f',
    border: '1px solid #1e1e30',
    borderRadius: '18px',
    padding: '18px',
    marginBottom: '20px'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '14px'
    }}>
      <div>
        <div style={{
          fontWeight: '900',
          fontSize: '14px'
        }}>
          🎯 Passing Accuracy
        </div>

        <div style={{
          color: '#666',
          fontSize: '11px',
          marginTop: '2px'
        }}>
          Estimate your passing %
        </div>
      </div>

      <div style={{
        color: '#22c55e',
        fontWeight: '900',
        fontSize: '26px'
      }}>
        {passAccuracy || 0}%
      </div>
    </div>

    <input
      type="range"
      min="0"
      max="100"
      step="1"
      value={passAccuracy || 0}
      onChange={(e)=>setPassAccuracy(e.target.value)}
      style={{
        width:'100%'
      }}
    />
  </div>
)}

{sessionType === 'Match' && (
  <div style={{
    background: 'linear-gradient(135deg, #13131f, #10101a)',
    border: '1px solid #22c55e25',
    borderLeft: '4px solid #22c55e',
    borderRadius: '20px',
    padding: '18px',
    marginBottom: '20px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
      <div>
        <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: '900' }}>🤖 AI MATCH REPORT</div>
        <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>
          {opponent ? `vs ${opponent}` : 'Add opponent'} · {homeAway || 'Home/Away'} · {result || 'Result'}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ color: '#22c55e', fontSize: '28px', fontWeight: '900' }}>{suggestedRating}</div>
        <div style={{ color: '#666', fontSize: '10px', fontWeight: '700' }}>Suggested</div>
      </div>
    </div>

    {aiReport && (
      <div style={{ background: '#0a0a0f', border: '1px solid #22c55e30', borderRadius: '14px', padding: '14px', marginBottom: '14px', color: '#ddd', fontSize: '13px', lineHeight: '1.6' }}>
        {aiReport}
      </div>
    )}

    {aiLoading && (
      <div style={{ background: '#0a0a0f', borderRadius: '14px', padding: '14px', marginBottom: '14px', color: '#555', fontSize: '13px', textAlign: 'center' }}>
        ✍️ Writing your match report...
      </div>
    )}

    <div style={{ display: 'flex', gap: '10px' }}>
      <button onClick={generateAIReport} disabled={aiLoading} style={{
        flex: 1,
        background: aiLoading ? '#1a1a2e' : 'linear-gradient(135deg, #22c55e, #16a34a)',
        border: 'none',
        borderRadius: '12px',
        color: aiLoading ? '#555' : 'white',
        padding: '12px',
        fontSize: '13px',
        fontWeight: '900',
        cursor: aiLoading ? 'default' : 'pointer'
      }}>
        {aiLoading ? '...' : aiReport ? '🔄 Regenerate' : '✨ Generate Report'}
      </button>
      <button onClick={applySuggestedRating} style={{
        background: '#22c55e15',
        border: '1.5px solid #22c55e40',
        borderRadius: '12px',
        color: '#22c55e',
        padding: '12px 16px',
        fontSize: '13px',
        fontWeight: '900',
        cursor: 'pointer'
      }}>
        Use Rating
      </button>
    </div>
  </div>
)}
{/* Rating */}
{sessionType === 'Match' && (
  <div style={{ marginBottom: '24px' }}>
    <label style={{
      fontSize: '13px',
      color: '#aaa',
      fontWeight: '600',
      display: 'block',
      marginBottom: '10px'
    }}>
      MATCH RATING
    </label>

    <div style={{
      background: '#13131f',
      border: '1.5px solid #1e1e30',
      borderRadius: '14px',
      padding: '18px'
    }}>
      <div style={{
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: '900',
        color:
          rating >= 8 ? '#22c55e'
          : rating >= 6 ? '#f59e0b'
          : '#ef4444',
        marginBottom: '14px'
      }}>
        {rating.toFixed(1)}
      </div>

      <input
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        style={{
          width: '100%'
        }}
      />
    </div>
  </div>
)}
        {/* Notes */}
        {sessionType !== '' && (
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>NOTES</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the session go?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' }} />
          </div>
        )}

        {/* High-Level Feature: Error & Match Precision Auditing */}
        {sessionType === 'Match' && (
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
            <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: '800', marginBottom: '12px', letterSpacing: '0.5px' }}>⚠️ DISCIPLINE & ERRORS</div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#ccc' }}>Yellow Cards</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => setYellowCards(String(Math.max(0, parseInt(yellowCards || '0') - 1)))} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#eab30815', border: 'none', color: '#eab308', fontWeight: '700', cursor: 'pointer' }}>-</button>
                <span style={{ color: '#fff', minWidth: '20px', textAlign: 'center', fontSize: '14px', fontWeight: '700' }}>{yellowCards}</span>
                <button onClick={() => setYellowCards(String(parseInt(yellowCards || '0') + 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#eab30815', border: 'none', color: '#eab308', fontWeight: '700', cursor: 'pointer' }}>+</button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#ccc' }}>Red Cards</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => setRedCards(String(Math.max(0, parseInt(redCards || '0') - 1)))} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ef444415', border: 'none', color: '#ef4444', fontWeight: '700', cursor: 'pointer' }}>-</button>
                <span style={{ color: '#fff', minWidth: '20px', textAlign: 'center', fontSize: '14px', fontWeight: '700' }}>{redCards}</span>
                <button onClick={() => setRedCards(String(parseInt(redCards || '0') + 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ef444415', border: 'none', color: '#ef4444', fontWeight: '700', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          </div>
        )}

        {/* Save */}
        {sessionType !== '' && (
          <button onClick={handleSave} style={{ width: '100%', background: saved ? '#16a34a' : 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px #22c55e40' }}>
            {saved ? '✓ Session Saved!' : 'Save Session'}
          </button>
        )}
      </div>
    </div>
  )
}

function LogTennisSession({ setActiveNav, tennisSessions, setTennisSessions, addSocialPost }: any) {
  const [sessionType, setSessionType] = useState('')
  const [duration, setDuration] = useState('')
  const [focus, setFocus] = useState('')
  const [serves, setServes] = useState('')
  const [forehands, setForehands] = useState('')
  const [backhands, setBackhands] = useState('')
  const [volleys, setVolleys] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  // High-Level Feature State Additions
  const [courtSurface, setCourtSurface] = useState('Hard')
  const [doubleFaults, setDoubleFaults] = useState('0')
  const [unforcedErrors, setUnforcedErrors] = useState('0')

  const handleSave = async () => {
    const newSession = {
      id: Date.now(),
      sessionType,
      duration: parseInt(duration) || 0,
      focus,
      serves: parseInt(serves) || 0,
      forehands: parseInt(forehands) || 0,
      backhands: parseInt(backhands) || 0,
      volleys: parseInt(volleys) || 0,
      notes,
      date: new Date().toISOString().split('T')[0]
    }
  
    setTennisSessions([newSession, ...tennisSessions])
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('tennis_sessions').insert({
        user_id: session.user.id,
        session_type: sessionType,
        duration: parseInt(duration) || 0,
        focus,
        serves: parseInt(serves) || 0,
        forehands: parseInt(forehands) || 0,
        backhands: parseInt(backhands) || 0,
        volleys: parseInt(volleys) || 0,
        notes
      })
    }
    addSocialPost({
      sport: 'Tennis',
      sportColor: '#eab308',
      emoji: '🎾',
      caption: `Logged a ${sessionType || 'tennis session'} focused on ${focus || 'training'} — ${duration || 0} mins, ${serves || 0} serves and ${forehands || 0} forehands.`
    })
  
    playHaptic()
    playSound('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('tennis-hub')} style={{ background: 'none', border: 'none', color: '#eab308', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log Tennis Session</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 28px' }}>Track your tennis practice or match</p>

        <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>SESSION TYPE</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Practice', 'Singles Match', 'Doubles Match', 'Coaching'].map((type) => (
            <button key={type} onClick={() => setSessionType(type)} style={{ background: sessionType === type ? '#eab30820' : '#13131f', border: `1.5px solid ${sessionType === type ? '#eab308' : '#1e1e30'}`, borderRadius: '10px', color: sessionType === type ? '#eab308' : '#666', padding: '10px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
          ))}
        </div>

        {/* High-Level Feature: Court Surface Context Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '700', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>COURT SURFACE</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px' }}>
            {['Hard', 'Clay', 'Grass', 'Indoor'].map((surface) => (
              <button key={surface} onClick={() => setCourtSurface(surface)} style={{ background: courtSurface === surface ? '#eab30815' : '#13131f', border: `1px solid ${courtSurface === surface ? '#eab308' : '#1e1e30'}`, borderRadius: '10px', color: courtSurface === surface ? '#eab308' : '#666', padding: '8px 4px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>{surface}</button>
            ))}
          </div>
        </div>

        {sessionType && (
          <>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>DURATION</label>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="60 minutes" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', marginBottom: '20px', boxSizing: 'border-box' }} />

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>MAIN FOCUS</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['Serve', 'Forehand', 'Backhand', 'Footwork', 'Volleys', 'Match Play'].map((f) => (
                <button key={f} onClick={() => setFocus(f)} style={{ background: focus === f ? '#eab30820' : '#13131f', border: `1.5px solid ${focus === f ? '#eab308' : '#1e1e30'}`, borderRadius: '20px', color: focus === f ? '#eab308' : '#666', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{f}</button>
              ))}
            </div>

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>SHOT COUNT / PRACTICE VOLUME</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {[
                ['Serves', serves, setServes],
                ['Forehands', forehands, setForehands],
                ['Backhands', backhands, setBackhands],
                ['Volleys', volleys, setVolleys],
              ].map(([label, value, setter]: any) => (
                <div key={label}>
                  <label style={{ fontSize: '11px', color: '#666', display: 'block', marginBottom: '6px' }}>{label}</label>
                  <input value={value} onChange={(e) => setter(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>NOTES</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What felt good? What needs work?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', marginBottom: '28px' }} />

            <button onClick={handleSave} style={{ width: '100%', background: saved ? '#ca8a04' : 'linear-gradient(135deg, #eab308, #ca8a04)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px #eab30840' }}>
              {saved ? '✓ Tennis Session Saved!' : 'Save Session'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
function TennisMatches({ setActiveNav, tennisResults, setTennisResults }: { setActiveNav: (nav: string) => void, tennisResults: any[], setTennisResults: any }) {
  const [tab, setTab] = useState<'matches' | 'results'>('matches')
  const [showAdd, setShowAdd] = useState(false)

  const [matches, setMatches] = useState([
    { id: 1, opponent: 'Alex', type: 'Singles', date: 'Fri 14 Jun', time: '6pm' },
    { id: 2, opponent: 'Jamie & Sam', type: 'Doubles', date: 'Sun 16 Jun', time: '10am' },
  ])

  const [results, setResults] = useState([
    { opponent: 'Ben', type: 'Singles', date: 'Wed 5 Jun', score: '6-3, 6-4', outcome: 'win', aces: 4, doubleFaults: 2 },
    { opponent: 'Charlie', type: 'Singles', date: 'Mon 3 Jun', score: '4-6, 6-3, 8-10', outcome: 'loss', aces: 2, doubleFaults: 5 },
  ])

  const [opponent, setOpponent] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [score, setScore] = useState('')
  const [aces, setAces] = useState('')
  const [doubleFaults, setDoubleFaults] = useState('')

  const addMatch = () => {
    if (!opponent || !type || !date) return
    setMatches([...matches, { id: Date.now(), opponent, type, date, time }])
    setOpponent('')
    setType('')
    setDate('')
    setTime('')
    setShowAdd(false)
  }

  const saveResult = (match: any) => {
    const outcome = score.startsWith('6') || score.includes('6-') ? 'win' : 'loss'

    const newResult = {
      opponent: match.opponent,
      type: match.type,
      date: match.date,
      score,
      outcome,
      aces: parseInt(aces) || 0,
      doubleFaults: parseInt(doubleFaults) || 0,
    }
    
    setResults([newResult, ...results])
    setTennisResults([newResult, ...tennisResults])

    setMatches(matches.filter((m) => m.id !== match.id))
    setScore('')
    setAces('')
    setDoubleFaults('')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('tennis-hub')} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px' }}>Tennis Matches</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Fixtures and results</p>
          </div>
          {tab === 'matches' && (
            <button onClick={() => setShowAdd(!showAdd)} style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none', borderRadius: '12px', color: 'white', padding: '10px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>+ Add</button>
          )}
        </div>

        <div style={{ display: 'flex', background: '#13131f', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
          {(['matches', 'results'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, background: tab === t ? '#1e1e35' : 'none', border: tab === t ? '1px solid #2a2a40' : '1px solid transparent', borderRadius: '10px', color: tab === t ? 'white' : '#555', padding: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>

        {tab === 'matches' && showAdd && (
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
            <input value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="Opponent name" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' }} />

            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              {['Singles', 'Doubles'].map((m) => (
                <button key={m} onClick={() => setType(m)} style={{ background: type === m ? '#06b6d420' : '#0a0a0f', border: `1.5px solid ${type === m ? '#06b6d4' : '#1e1e30'}`, borderRadius: '8px', color: type === m ? '#06b6d4' : '#666', padding: '8px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{m}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box' }} />
              <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>

            <button onClick={addMatch} style={{ width: '100%', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Add Match</button>
          </div>
        )}

        {tab === 'matches' && matches.map((match) => (
          <div key={match.id} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', marginBottom: '12px' }}>
            <div style={{ fontWeight: '700', fontSize: '15px' }}>vs {match.opponent}</div>
            <div style={{ color: '#555', fontSize: '12px', marginTop: '2px', marginBottom: '12px' }}>{match.type} · {match.date} · {match.time}</div>

            <input value={score} onChange={(e) => setScore(e.target.value)} placeholder="Score e.g. 6-4, 3-6, 10-8" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '13px', marginBottom: '10px', boxSizing: 'border-box' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <input value={aces} onChange={(e) => setAces(e.target.value)} placeholder="Aces" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box' }} />
              <input value={doubleFaults} onChange={(e) => setDoubleFaults(e.target.value)} placeholder="Double faults" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>

            <button onClick={() => saveResult(match)} style={{ width: '100%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>Save Result</button>
          </div>
        ))}

        {tab === 'results' && results.map((result, i) => (
          <div key={i} style={{ background: '#13131f', border: `1px solid ${result.outcome === 'win' ? '#22c55e25' : '#ef444425'}`, borderLeft: `4px solid ${result.outcome === 'win' ? '#22c55e' : '#ef4444'}`, borderRadius: '14px', padding: '16px 20px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>vs {result.opponent}</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{result.type} · {result.date}</div>
              </div>
              <span style={{ background: result.outcome === 'win' ? '#22c55e' : '#ef4444', color: 'white', fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '20px', height: 'fit-content' }}>{result.outcome.toUpperCase()}</span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '12px' }}>{result.score}</div>
            <div style={{ display: 'flex', gap: '14px', marginTop: '10px', color: '#aaa', fontSize: '12px' }}>
              <span>🎯 {result.aces} aces</span>
              <span>⚠️ {result.doubleFaults} double faults</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
function BasketballStats({ setActiveNav, basketballSessions, setBasketballSessions }: any) {
  const gameSessions = basketballSessions.filter((s: any) => s.sessionType === 'Game')

  const totalSessions = basketballSessions.length
  const totalGames = gameSessions.length
  const totalPoints = basketballSessions.reduce((sum: number, s: any) => sum + (s.points || 0), 0)
  const totalAssists = basketballSessions.reduce((sum: number, s: any) => sum + (s.assists || 0), 0)
  const totalRebounds = basketballSessions.reduce((sum: number, s: any) => sum + (s.rebounds || 0), 0)
  const totalSteals = basketballSessions.reduce((sum: number, s: any) => sum + (s.steals || 0), 0)
  const totalBlocks = basketballSessions.reduce((sum: number, s: any) => sum + (s.blocks || 0), 0)
  const shotsMade = basketballSessions.reduce((sum: number, s: any) => sum + (s.shotsMade || 0), 0)
  const shotsTaken = basketballSessions.reduce((sum: number, s: any) => sum + (s.shotsTaken || 0), 0)

  const ppg = totalGames > 0 ? (totalPoints / totalGames).toFixed(1) : '0.0'
  const apg = totalGames > 0 ? (totalAssists / totalGames).toFixed(1) : '0.0'
  const rpg = totalGames > 0 ? (totalRebounds / totalGames).toFixed(1) : '0.0'
  const fgPct = shotsTaken > 0 ? Math.round((shotsMade / shotsTaken) * 100) : 0

  const bestGame = gameSessions.length > 0
    ? gameSessions.reduce((best: any, s: any) => (s.points || 0) > (best.points || 0) ? s : best, gameSessions[0])
    : null

    const basketballResults = basketballSessions.filter((s: any) => s.result)
const basketballStreak = (() => {
  if (!basketballResults || basketballResults.length === 0) return null
  let count = 1
  const first = basketballResults[0].result
  for (let i = 1; i < basketballResults.length; i++) {
    if (basketballResults[i].result === first) count++
    else break
  }
  return { type: first, count }
})()
    
    const handleDeleteSession = async (sessionId: any) => {
      setBasketballSessions(basketballSessions.filter((s: any) => s.id !== sessionId))
      await supabase.from('basketball_sessions').delete().eq('id', sessionId)
    }

    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
        <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
  
        <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
          <button onClick={() => setActiveNav('basketball-hub')} style={{ background: 'none', border: 'none', color: '#f97316', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
  
          <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>Basketball Stats</h1>
          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px' }}>Your performance across games and training</p>
{basketballStreak && (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: basketballStreak.type === 'Win' ? '#22c55e15' : '#ef444415', border: `1px solid ${basketballStreak.type === 'Win' ? '#22c55e40' : '#ef444440'}`, borderRadius: '20px', padding: '6px 14px', marginBottom: '16px' }}>
    <span style={{ fontSize: '16px' }}>{basketballStreak.type === 'Win' ? '🔥' : '❄️'}</span>
    <span style={{ fontSize: '13px', fontWeight: '800', color: basketballStreak.type === 'Win' ? '#22c55e' : '#ef4444' }}>
      {basketballStreak.count} {basketballStreak.type.toUpperCase()} STREAK
    </span>
  </div>
)}
  
          <div style={{ background: '#13131f', border: '1px solid #f9731625', borderLeft: '4px solid #f97316', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#f97316', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>📅 THIS SEASON</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Sessions', value: totalSessions, color: '#f97316' },
                { label: 'Games', value: totalGames, color: '#22c55e' },
                { label: 'Win Rate', value: totalGames > 0 ? `${Math.round((basketballSessions.filter((s:any) => s.sessionType === 'Game' && s.result === 'Win').length / totalGames) * 100)}%` : '0%', color: '#06b6d4' },
                { label: 'Points', value: totalPoints, color: '#f97316' },
                { label: 'Assists', value: totalAssists, color: '#06b6d4' },
                { label: 'Rebounds', value: totalRebounds, color: '#a855f7' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ color: stat.color, fontSize: '18px', fontWeight: '900' }}>{stat.value}</div>
                  <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '3px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
  
          <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '900', marginBottom: '16px' }}>📈 WEEKLY LOAD — LAST 6 WEEKS</div>
            {(() => {
              const weeks: { label: string, count: number }[] = []
              for (let i = 5; i >= 0; i--) {
                const weekStart = new Date()
                weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7)
                weekStart.setHours(0, 0, 0, 0)
                const weekEnd = new Date(weekStart)
                weekEnd.setDate(weekEnd.getDate() + 7)
                const count = basketballSessions.filter((s: any) => {
                  const d = new Date(s.date)
                  return d >= weekStart && d < weekEnd
                }).length
                weeks.push({ label: `W${6 - i}`, count })
              }
              const max = Math.max(...weeks.map(w => w.count), 1)
              return (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                  {weeks.map((week, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: '800' }}>{week.count > 0 ? week.count : ''}</div>
                      <div style={{ width: '100%', background: week.count > 0 ? 'linear-gradient(180deg, #f97316, #ea580c)' : '#1e1e30', borderRadius: '6px 6px 0 0', height: `${Math.max((week.count / max) * 60, week.count > 0 ? 8 : 4)}px` }} />
                      <div style={{ fontSize: '10px', color: '#555', fontWeight: '600' }}>{week.label}</div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
  
          {basketballSessions.length > 0 && (
            <div style={{ background: 'linear-gradient(135deg, #13131f, #10101a)', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
              <div style={{ color: '#eab308', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🏆 PERSONAL BESTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Most Points in a Game', value: bestGame ? bestGame.points || 0 : 0, emoji: '🏀', color: '#f97316' },
                  { label: 'Most Assists in a Game', value: gameSessions.length > 0 ? Math.max(...gameSessions.map((s:any) => s.assists || 0)) : 0, emoji: '🅰️', color: '#06b6d4' },
                  { label: 'Most Rebounds in a Game', value: gameSessions.length > 0 ? Math.max(...gameSessions.map((s:any) => s.rebounds || 0)) : 0, emoji: '💪', color: '#a855f7' },
                  { label: 'Best FG%', value: `${fgPct}%`, emoji: '🎯', color: '#22c55e' },
                ].map((pb) => (
                  <div key={pb.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0f', border: `1px solid ${pb.color}20`, borderRadius: '12px', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>{pb.emoji}</span>
                      <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>{pb.label}</span>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: '900', color: pb.color }}>{pb.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        <div style={{ background: '#13131f', border: '1px solid #f9731625', borderLeft: '4px solid #f97316', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', color: '#f97316', fontWeight: '900', marginBottom: '12px' }}>OVERVIEW</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Sessions', value: totalSessions, color: '#f97316' },
              { label: 'Games', value: totalGames, color: '#22c55e' },
              { label: 'FG%', value: `${fgPct}%`, color: '#06b6d4' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '13px', padding: '13px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '22px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #22c55e25', borderLeft: '4px solid #22c55e', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', color: '#22c55e', fontWeight: '900', marginBottom: '12px' }}>GAME AVERAGES</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { label: 'PPG', value: ppg, color: '#f97316' },
              { label: 'APG', value: apg, color: '#06b6d4' },
              { label: 'RPG', value: rpg, color: '#a855f7' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '13px', padding: '13px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '22px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', color: '#06b6d4', fontWeight: '900', marginBottom: '12px' }}>TOTALS</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Points', value: totalPoints, color: '#f97316' },
              { label: 'Assists', value: totalAssists, color: '#06b6d4' },
              { label: 'Rebounds', value: totalRebounds, color: '#a855f7' },
              { label: 'Steals', value: totalSteals, color: '#22c55e' },
              { label: 'Blocks', value: totalBlocks, color: '#ef4444' },
              { label: 'Shots', value: `${shotsMade}/${shotsTaken}`, color: '#eab308' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '13px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '20px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', color: '#a855f7', fontWeight: '900', marginBottom: '12px' }}>BEST GAME</div>

          {bestGame ? (
            <div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#f97316' }}>{bestGame.points || 0} points</div>
              <div style={{ color: '#aaa', fontSize: '13px', marginTop: '6px' }}>
                {bestGame.assists || 0} assists · {bestGame.rebounds || 0} rebounds · {bestGame.date || 'No date'}
              </div>
            </div>
          ) : (
            <div style={{ color: '#666', fontSize: '13px' }}>Log a game to see your best performance.</div>
          )}
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 14px' }}>Recent Sessions</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {basketballSessions.length === 0 && (
            <div onClick={() => setActiveNav('log-basketball')} style={{ background: '#13131f', border: '1px solid #f9731625', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏀</div>
              <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#f97316' }}>Ready to hit the court?</div>
              <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first basketball session to see stats here</div>
              <span style={{ background: '#f9731615', border: '1px solid #f9731640', borderRadius: '20px', color: '#f97316', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Session →</span>
            </div>
          )}

          {basketballSessions.slice(0, 6).map((session: any) => (
            <div key={session.id} style={{ background: '#13131f', border: '1px solid #f9731625', borderLeft: '4px solid #f97316', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ fontWeight: '800', fontSize: '14px' }}>{session.sessionType || 'Basketball Session'}</div>
                <div style={{ color: '#555', fontSize: '12px' }}>{session.date || ''}</div>
              </div>
              <div style={{ color: '#666', fontSize: '12px', marginBottom: '6px' }}>
                {session.sessionType === 'Game'
                  ? `${session.points || 0} pts · ${session.assists || 0} ast · ${session.rebounds || 0} reb`
                  : `${session.duration || 0} mins`}
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {session.focus && <span style={{ background: '#f9731615', border: '1px solid #f9731630', borderRadius: '20px', color: '#f97316', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{session.focus}</span>}
                {session.sessionType === 'Game' && session.shotsMade !== undefined && <span style={{ background: '#22c55e15', border: '1px solid #22c55e30', borderRadius: '20px', color: '#22c55e', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>FG: {session.shotsMade}/{session.shotsTaken}</span>}
                {session.steals > 0 && <span style={{ background: '#06b6d415', border: '1px solid #06b6d430', borderRadius: '20px', color: '#06b6d4', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{session.steals} stl</span>}
              </div>
              </div>
              <button onClick={() => handleDeleteSession(session.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function BasketballFixtures({ setActiveNav }: any) {
  const [tab, setTab] = useState<'upcoming' | 'results'>('upcoming')
  const [showAdd, setShowAdd] = useState(false)
  const [showResult, setShowResult] = useState<number | null>(null)

  const [fixtures, setFixtures] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('basketballFixtures')
  return saved ? JSON.parse(saved) : []
})
  const [results, setResults] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('basketballResults')
  return saved ? JSON.parse(saved) : []
})
useEffect(() => {
  localStorage.setItem('basketballFixtures', JSON.stringify(fixtures))
}, [fixtures])

useEffect(() => {
  localStorage.setItem('basketballResults', JSON.stringify(results))
}, [results])

  const [opponent, setOpponent] = useState('')
  const [gameType, setGameType] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [yourScore, setYourScore] = useState('')
  const [theirScore, setTheirScore] = useState('')
  const [points, setPoints] = useState('')
  const [assists, setAssists] = useState('')
  const [rebounds, setRebounds] = useState('')

  const addFixture = () => {
    if (!opponent || !gameType || !date) return

    setFixtures([
      { id: Date.now(), opponent, gameType, date, time },
      ...fixtures
    ])

    setOpponent('')
    setGameType('')
    setDate('')
    setTime('')
    setShowAdd(false)
  }

  const saveResult = (fixture: any) => {
    const ys = parseInt(yourScore) || 0
    const ts = parseInt(theirScore) || 0

    const outcome = ys > ts ? 'win' : ys < ts ? 'loss' : 'draw'
    const color = outcome === 'win' ? '#22c55e' : outcome === 'loss' ? '#ef4444' : '#f59e0b'

    setResults([
      {
        ...fixture,
        yourScore: ys,
        theirScore: ts,
        outcome,
        color,
        points: parseInt(points) || 0,
        assists: parseInt(assists) || 0,
        rebounds: parseInt(rebounds) || 0
      },
      ...results
    ])

    setFixtures(fixtures.filter((f) => f.id !== fixture.id))
    setYourScore('')
    setTheirScore('')
    setPoints('')
    setAssists('')
    setRebounds('')
    setShowResult(null)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('basketball-hub')} style={{ background: 'none', border: 'none', color: '#f97316', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', margin: 0 }}>Basketball Fixtures</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: '4px 0 0' }}>Games and results</p>
          </div>

          {tab === 'upcoming' && (
            <button onClick={() => setShowAdd(!showAdd)} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: '12px', color: 'white', padding: '10px 14px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
              + Add
            </button>
          )}
        </div>

        <div style={{ display: 'flex', background: '#13131f', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
          {(['upcoming', 'results'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, background: tab === t ? '#1e1e35' : 'none', border: tab === t ? '1px solid #2a2a40' : '1px solid transparent', borderRadius: '10px', color: tab === t ? 'white' : '#555', padding: '10px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', textTransform: 'capitalize' }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'upcoming' && showAdd && (
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '18px', marginBottom: '18px' }}>
            <input value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="Opponent/team name" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', marginBottom: '10px', boxSizing: 'border-box' }} />

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {['5v5', '3v3', '1v1', 'Scrimmage'].map((type) => (
                <button key={type} onClick={() => setGameType(type)} style={{ background: gameType === type ? '#f9731620' : '#0a0a0f', border: `1.5px solid ${gameType === type ? '#f97316' : '#1e1e30'}`, borderRadius: '8px', color: gameType === type ? '#f97316' : '#666', padding: '8px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  {type}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', boxSizing: 'border-box' }} />
              <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', boxSizing: 'border-box' }} />
            </div>

            <button onClick={addFixture} style={{ width: '100%', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: '10px', color: 'white', padding: '12px', fontWeight: '900', cursor: 'pointer' }}>
              Add Fixture
            </button>
          </div>
        )}

        {tab === 'upcoming' && fixtures.length === 0 && (
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '18px', color: '#666' }}>
            No upcoming basketball fixtures yet.
          </div>
        )}

        {tab === 'upcoming' && fixtures.map((fixture) => (
          <div key={fixture.id} style={{ background: '#13131f', border: '1px solid #1e1e30', borderLeft: '4px solid #f97316', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '800' }}>vs {fixture.opponent}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{fixture.gameType} · {fixture.date} · {fixture.time}</div>
              </div>

              <button onClick={() => setShowResult(showResult === fixture.id ? null : fixture.id)} style={{ background: '#22c55e15', border: '1px solid #22c55e40', borderRadius: '8px', color: '#22c55e', padding: '7px 10px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>
                Log Result
              </button>
            </div>

            {showResult === fixture.id && (
              <div style={{ borderTop: '1px solid #1e1e30', marginTop: '14px', paddingTop: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input value={yourScore} onChange={(e) => {
  const v = e.target.value
  setYourScore(v)

  if (v !== '' && opponentScore !== '') {
    const ys = parseInt(v) || 0
    const os = parseInt(opponentScore) || 0
    setResult(ys > os ? 'Win' : ys < os ? 'Loss' : 'Draw')
  }
}} placeholder="Your score" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', boxSizing: 'border-box' }} />
                  <input value={theirScore} onChange={(e) => setTheirScore(e.target.value)} placeholder="Their score" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <input value={points} onChange={(e) => setPoints(e.target.value)} placeholder="Points" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '10px', boxSizing: 'border-box' }} />
                  <input value={assists} onChange={(e) => setAssists(e.target.value)} placeholder="Assists" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '10px', boxSizing: 'border-box' }} />
                  <input value={rebounds} onChange={(e) => setRebounds(e.target.value)} placeholder="Rebounds" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '10px', boxSizing: 'border-box' }} />
                </div>

                <button onClick={() => saveResult(fixture)} style={{ width: '100%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '10px', color: 'white', padding: '12px', fontWeight: '900', cursor: 'pointer' }}>
                  Save Result
                </button>
              </div>
            )}
          </div>
        ))}

        {tab === 'results' && results.length === 0 && (
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '18px', color: '#666' }}>
            No basketball results yet.
          </div>
        )}

        {tab === 'results' && results.map((result, i) => (
          <div key={i} style={{ background: '#13131f', border: `1px solid ${result.color}25`, borderLeft: `4px solid ${result.color}`, borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <div style={{ fontWeight: '800' }}>vs {result.opponent}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{result.gameType} · {result.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '900', fontSize: '22px' }}>{result.yourScore}–{result.theirScore}</div>
                <div style={{ color: result.color, fontSize: '11px', fontWeight: '900' }}>{result.outcome.toUpperCase()}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', color: '#aaa', fontSize: '12px', flexWrap: 'wrap' }}>
              <span>🏀 {result.points} pts</span>
              <span>🅰️ {result.assists} ast</span>
              <span>💪 {result.rebounds} reb</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
function SuggestedBasketballSessions({ setActiveNav, setSelectedBasketballCategory }: any) {
  const categories = [
    { label: 'Shooting', emoji: '🎯', color: '#f97316', desc: 'Improve form, range, catch-and-shoot and free throws' },
    { label: 'Ball Handling', emoji: '🌀', color: '#06b6d4', desc: 'Handles, weak hand, combos, pressure control' },
    { label: 'Finishing', emoji: '💥', color: '#22c55e', desc: 'Layups, contact finishes, footwork and floaters' },
    { label: 'Defence', emoji: '🛡️', color: '#a855f7', desc: 'Footwork, closeouts, slides and 1v1 defending' },
    { label: 'Conditioning', emoji: '⚡', color: '#ef4444', desc: 'Basketball fitness, sprints, agility and explosiveness' },
    { label: 'Team Training', emoji: '👥', color: '#eab308', desc: 'Passing, spacing, pick and roll, game IQ' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('basketball-hub')} style={{ background: 'none', border: 'none', color: '#f97316', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px' }}>Basketball Training</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose an area to improve</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => {
                setSelectedBasketballCategory(cat.label)
                setActiveNav('basketball-session-detail')
              }}
              style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{cat.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '900', fontSize: '16px' }}>{cat.label}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '4px', lineHeight: '1.4' }}>{cat.desc}</div>
              </div>
              <div style={{ color: cat.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function BasketballSessionDetail({ category, setActiveNav }: any) {
  const sessionData: any = {
    Shooting: {
      emoji: '🎯',
      color: '#f97316',
      sections: [
        {
          title: 'Form & Rhythm',
          drills: [
            {
              name: 'Close Form Shooting',
              setup: 'Stand 2–3 metres from the basket and shoot with perfect technique. Focus on balance, elbow position, follow-through and soft touch.',
              reps: '50 makes',
              tip: 'Do not move back until your form feels smooth. This builds your base.'
            },
            {
              name: '5 Spot Mid-Range',
              setup: 'Shoot from both corners, both wings and the top. Take your time and reset your feet before every shot.',
              reps: '5 makes from each spot',
              tip: 'Keep your feet square and land in the same place you jumped from.'
            }
          ]
        },
        {
          title: 'Game-Speed Shooting',
          drills: [
            {
              name: 'Catch and Shoot',
              setup: 'Start without the ball, move into space, catch, set your feet quickly and shoot.',
              reps: '30 shots',
              tip: 'Your feet should be ready before the ball reaches your hands.'
            },
            {
              name: 'Free Throw Pressure',
              setup: 'Shoot 10 free throws at the end of the session while tired. Record your score.',
              reps: '3 rounds of 10',
              tip: 'Use the same routine every time. Free throws are about rhythm.'
            }
          ]
        }
      ]
    },

    'Ball Handling': {
      emoji: '🌀',
      color: '#06b6d4',
      sections: [
        {
          title: 'Control',
          drills: [
            {
              name: 'Pound Dribbles',
              setup: 'Dribble hard at waist height using one hand. Keep your knees bent, chest up and eyes forward.',
              reps: '2 mins each hand',
              tip: 'The ball should feel controlled, not loose. Strong dribbles are harder to steal.'
            },
            {
              name: 'Weak Hand Only',
              setup: 'Use only your weaker hand for basic dribbles, crossovers and layup approaches.',
              reps: '8 minutes',
              tip: 'Weak hand work feels awkward at first, but it makes you much harder to defend.'
            }
          ]
        },
        {
          title: 'Game Moves',
          drills: [
            {
              name: 'Cone Attack',
              setup: 'Place 5 cones in a line. Attack each cone with a different move: crossover, between legs, behind back, hesitation.',
              reps: '5 rounds',
              tip: 'Change pace after the move. The burst is what beats the defender.'
            },
            {
              name: 'Combo Into Finish',
              setup: 'Use two dribble moves, then attack the basket and finish with either hand.',
              reps: '20 finishes',
              tip: 'Do not do moves for no reason. Each move should create space.'
            }
          ]
        }
      ]
    },

    Finishing: {
      emoji: '💥',
      color: '#22c55e',
      sections: [
        {
          title: 'Layup Package',
          drills: [
            {
              name: 'Both-Hand Layups',
              setup: 'Alternate right-hand and left-hand layups from both sides of the basket.',
              reps: '25 makes each hand',
              tip: 'Being able to finish with both hands makes you much more unpredictable.'
            },
            {
              name: 'Reverse Layups',
              setup: 'Attack the baseline and finish on the opposite side of the rim.',
              reps: '20 makes',
              tip: 'Use the rim to protect the ball from defenders.'
            }
          ]
        },
        {
          title: 'Advanced Finishing',
          drills: [
            {
              name: 'Euro-Step Finishes',
              setup: 'Attack the basket, step one way, then step the other way to finish around an imaginary defender.',
              reps: '15 each side',
              tip: 'Sell the first step with your shoulders, not just your feet.'
            },
            {
              name: 'Contact Finishing',
              setup: 'Have a partner bump you lightly with a pad or body contact as you finish.',
              reps: '20 finishes',
              tip: 'Stay balanced. Do not fade away from contact.'
            }
          ]
        }
      ]
    },

    Defence: {
      emoji: '🛡️',
      color: '#a855f7',
      sections: [
        {
          title: 'Footwork',
          drills: [
            {
              name: 'Defensive Slides',
              setup: 'Slide from sideline to sideline while staying low. Do not let your feet cross.',
              reps: '5 sets of 30 seconds',
              tip: 'Low hips and active hands make you much harder to beat.'
            },
            {
              name: 'Closeout Drill',
              setup: 'Sprint towards a shooter, slow down with short choppy steps, hands high, then slide to cut off the drive.',
              reps: '12 reps',
              tip: 'Do not fly past the shooter. Arrive under control.'
            }
          ]
        },
        {
          title: '1v1 Defence',
          drills: [
            {
              name: 'Mirror Drill',
              setup: 'Partner moves side to side while you mirror them in a defensive stance.',
              reps: '5 rounds of 45 seconds',
              tip: 'React with your feet first. Do not reach.'
            },
            {
              name: 'Recovery Sprint',
              setup: 'Start beaten by one step, sprint back into position and force the attacker wide.',
              reps: '10 reps',
              tip: 'Recover the angle before trying to block or steal.'
            }
          ]
        }
      ]
    },

    Conditioning: {
      emoji: '⚡',
      color: '#ef4444',
      sections: [
        {
          title: 'Basketball Fitness',
          drills: [
            {
              name: 'Suicide Runs',
              setup: 'Sprint to each court line and back. Rest fully between sets so every rep is high quality.',
              reps: '5 rounds',
              tip: 'Basketball fitness is repeated sprints, not slow jogging.'
            },
            {
              name: 'Shuttle Sprints',
              setup: 'Sprint 10 metres, back, 20 metres, back, 30 metres, back.',
              reps: '4 rounds',
              tip: 'Explode out of every turn. Low body position helps acceleration.'
            }
          ]
        },
        {
          title: 'Explosiveness',
          drills: [
            {
              name: 'Jump Circuit',
              setup: 'Do squat jumps, lateral bounds and single-leg hops.',
              reps: '3 rounds',
              tip: 'Land softly. Control matters more than just jumping high.'
            },
            {
              name: 'Defensive Slide Intervals',
              setup: 'Slide hard for 20 seconds, rest for 20 seconds.',
              reps: '8 rounds',
              tip: 'Keep your stance low even when tired.'
            }
          ]
        }
      ]
    },

    'Team Training': {
      emoji: '👥',
      color: '#eab308',
      sections: [
        {
          title: 'Passing & Movement',
          drills: [
            {
              name: 'Pass and Cut',
              setup: 'Pass to a teammate, cut hard to the basket, then reset. Practise timing and spacing.',
              reps: '10 minutes',
              tip: 'Never stand still after passing. Movement creates opportunities.'
            },
            {
              name: 'Fast Break Passing',
              setup: 'Run 3-man fast breaks, focusing on quick decisions and accurate passes.',
              reps: '12 reps',
              tip: 'Pass ahead of the runner, not directly at them.'
            }
          ]
        },
        {
          title: 'Game IQ',
          drills: [
            {
              name: 'Pick and Roll',
              setup: 'Practise ball handler and screener roles. Read whether to drive, pass, roll or pop.',
              reps: '15 minutes',
              tip: 'Wait for the screen to be set before using it.'
            },
            {
              name: 'Small-Sided Scrimmage',
              setup: 'Play 3v3 or 4v4 with a focus on spacing, communication and quick decisions.',
              reps: '20 minutes',
              tip: 'Talk constantly. Good teams communicate before problems happen.'
            }
          ]
        }
      ]
    }
  }

  const data = sessionData[category]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('basketball-plans')} style={{ background: 'none', border: 'none', color: data.color, fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{ width: '58px', height: '58px', borderRadius: '50%', border: `2.5px solid ${data.color}`, background: `${data.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: `0 0 18px ${data.color}40` }}>
            {data.emoji}
          </div>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: '900', margin: 0 }}>{category}</h1>
            <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>Basketball development drills</p>
          </div>
        </div>

        {data.sections.map((section: any) => (
          <div key={section.title} style={{ marginBottom: '26px' }}>
            <h2 style={{ color: data.color, fontSize: '13px', fontWeight: '900', letterSpacing: '1px', margin: '0 0 14px', textTransform: 'uppercase' }}>
              {section.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {section.drills.map((drill: any) => (
                <div key={drill.name} style={{ background: '#13131f', border: `1px solid ${data.color}25`, borderLeft: `4px solid ${data.color}`, borderRadius: '16px', padding: '16px 18px' }}>
                  <div style={{ fontWeight: '900', fontSize: '15px', marginBottom: '8px' }}>{drill.name}</div>
                  <div style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.5', marginBottom: '10px' }}>{drill.setup}</div>
                  <div style={{ display: 'inline-block', background: `${data.color}18`, border: `1px solid ${data.color}35`, color: data.color, borderRadius: '999px', padding: '5px 10px', fontSize: '11px', fontWeight: '900', marginBottom: '10px' }}>
                    📋 {drill.reps}
                  </div>
                  <div style={{ background: '#0a0a0f', border: `1px solid ${data.color}25`, borderRadius: '12px', padding: '10px', color: '#888', fontSize: '12px', lineHeight: '1.5' }}>
                    <strong style={{ color: data.color }}>💡 Coaching tip:</strong> {drill.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
function FixturesPage({ setActiveNav, footballSessions, setFootballSessions }: { setActiveNav: (nav: string) => void, footballSessions: any[], setFootballSessions: any }) {
  const [tab, setTab] = useState<'upcoming' | 'results'>('upcoming')
  const [showAddFixture, setShowAddFixture] = useState(false)
  const [showLogResult, setShowLogResult] = useState<number | null>(null)

  const matches = footballSessions.filter((s: any) => s.sessionType === 'Match' || s.session_type === 'Match')

  const [fixtures, setFixtures] = useState<any[]>([])

  const results = matches.map((s: any) => ({
    opponent: s.opponent || 'Unknown',
    type: s.matchType || s.match_type || 'Match',
    date: s.date || 'Recent',
    outcome: (s.result || '').toLowerCase(),
    scoreFor: s.yourScore || s.your_score || 0,
    scoreAgainst: s.opponentScore || s.opponent_score || 0,
    goals: s.goals || 0,
    assists: s.assists || 0,
    yellowCards: s.yellowCards || s.yellow_cards || 0,
    redCards: s.redCards || s.red_cards || 0,
    color: s.result === 'Win' ? '#22c55e' : s.result === 'Loss' ? '#ef4444' : '#f59e0b'
  }))

  const [opponent, setOpponent] = useState('')
  const [matchType, setMatchType] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [scoreFor, setScoreFor] = useState('')
  const [scoreAgainst, setScoreAgainst] = useState('')
  const [rGoals, setRGoals] = useState('')
  const [rAssists, setRAssists] = useState('')
  const [rYellow, setRYellow] = useState('0')
  const [rRed, setRRed] = useState('0')

  const handleAddFixture = () => {
    if (opponent && matchType && date) {
      setFixtures([...fixtures, { id: Date.now(), opponent, type: matchType, date, time, color: '#22c55e', result: null }])
      setOpponent(''); setMatchType(''); setDate(''); setTime('')
      setShowAddFixture(false)
    }
  }

  const handleLogResult = async (fixture: any) => {
    const sf = parseInt(scoreFor.trim()) || 0
    const sa = parseInt(scoreAgainst.trim()) || 0
    const outcome = sf > sa ? 'Win' : sf < sa ? 'Loss' : 'Draw'
    
    const newSession = {
      id: Date.now(),
      sessionType: 'Match',
      session_type: 'Match',
      matchType: fixture.type,
      match_type: fixture.type,
      opponent: fixture.opponent,
      yourScore: sf,
      opponentScore: sa,
      result: outcome,
      goals: parseInt(rGoals) || 0,
      assists: parseInt(rAssists) || 0,
      yellowCards: parseInt(rYellow) || 0,
      redCards: parseInt(rRed) || 0,
      date: fixture.date || new Date().toISOString().split('T')[0]
    }
    
    setFootballSessions([newSession, ...(footballSessions || [])])
    setFixtures(fixtures.filter(f => f.id !== fixture.id))
    setScoreFor(''); setScoreAgainst(''); setRGoals(''); setRAssists(''); setRYellow('0'); setRRed('0')
    setShowLogResult(null)
  }

  const outcomeColor: Record<string, string> = { win: '#22c55e', loss: '#ef4444', draw: '#f59e0b' }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>

        <button onClick={() => setActiveNav('football-hub')} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px' }}>Fixtures</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Games and results</p>
          </div>
          {tab === 'upcoming' && (
            <button onClick={() => setShowAddFixture(!showAddFixture)} style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none', borderRadius: '12px', color: 'white', padding: '10px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>+ Add</button>
          )}
        </div>

        {/* Personal Bests */}
<div style={{
  background: '#13131f',
  border: '1px solid #f59e0b25',
  borderLeft: '4px solid #f59e0b',
  borderRadius: '20px',
  padding: '18px',
  marginBottom: '22px'
}}>
  <div style={{ color: '#f59e0b', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>
    PERSONAL BESTS
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
    {[
      { label: 'Best Rating', value: bestRating.toFixed ? bestRating.toFixed(1) : bestRating, color: '#eab308' },
      { label: 'Most Goals', value: mostGoals, color: '#22c55e' },
      { label: 'Most Assists', value: mostAssists, color: '#06b6d4' },
      { label: 'Most Shots', value: mostShots, color: '#ef4444' },
      { label: 'Best Passing', value: `${bestPassing}%`, color: '#a855f7' },
      { label: 'Key Passes', value: mostKeyPasses, color: '#f59e0b' },
    ].map((stat) => (
      <div key={stat.label} style={{
        background: '#0a0a0f',
        border: `1px solid ${stat.color}25`,
        borderRadius: '14px',
        padding: '14px',
        textAlign: 'center'
      }}>
        <div style={{ color: stat.color, fontSize: '20px', fontWeight: '900' }}>{stat.value}</div>
        <div style={{ color: '#666', fontSize: '10px', fontWeight: '800', marginTop: '4px' }}>{stat.label}</div>
      </div>
    ))}
  </div>
</div>
        
        {/* Position Breakdown */}
<div style={{
  background: '#13131f',
  border: '1px solid #06b6d425',
  borderLeft: '4px solid #06b6d4',
  borderRadius: '20px',
  padding: '18px',
  marginBottom: '22px'
}}>
  <div style={{ color: '#06b6d4', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>
    POSITION BREAKDOWN
  </div>

  {positionStats.length === 0 ? (
    <div style={{ color: '#666', fontSize: '13px' }}>Log matches in different positions to see this.</div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {positionStats.map((p: any) => (
        <div key={p.pos} style={{
          background: '#0a0a0f',
          border: '1px solid #1e1e30',
          borderRadius: '14px',
          padding: '14px'
        }}>
          <div style={{ fontSize: '14px', fontWeight: '900', marginBottom: '10px' }}>{p.pos}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Games', value: p.matches, color: '#06b6d4' },
              { label: 'G', value: p.goals, color: '#22c55e' },
              { label: 'A', value: p.assists, color: '#a855f7' },
              { label: 'Avg', value: p.rating, color: '#eab308' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#13131f', borderRadius: '10px', padding: '9px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '15px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '9px', fontWeight: '800', marginTop: '3px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        {/* Recent Match Reports */}
<div style={{
  background: '#13131f',
  border: '1px solid #22c55e25',
  borderLeft: '4px solid #22c55e',
  borderRadius: '20px',
  padding: '18px',
  marginBottom: '22px'
}}>
  <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>
    RECENT MATCH REPORTS
  </div>

  {recentMatches.length === 0 ? (
    <div style={{ color: '#666', fontSize: '13px' }}>
      Log a match to see your latest reports here.
    </div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {recentMatches.map((match: any, i: number) => (
        <div key={i} style={{
          background: '#0a0a0f',
          border: '1px solid #1e1e30',
          borderRadius: '14px',
          padding: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '900' }}>
                {match.opponent ? `vs ${match.opponent}` : 'Match'}
              </div>
              <div style={{ color: '#666', fontSize: '11px', marginTop: '3px' }}>
                {match.home_away || 'Venue'} · {match.position || 'Position'}
              </div>
            </div>

            <div style={{
              background: match.result === 'Win' ? '#22c55e20' : match.result === 'Loss' ? '#ef444420' : '#f59e0b20',
              border: `1px solid ${match.result === 'Win' ? '#22c55e' : match.result === 'Loss' ? '#ef4444' : '#f59e0b'}40`,
              color: match.result === 'Win' ? '#22c55e' : match.result === 'Loss' ? '#ef4444' : '#f59e0b',
              borderRadius: '20px',
              padding: '5px 9px',
              fontSize: '10px',
              fontWeight: '900'
            }}>
              {match.result || 'Result'}
            </div>
          </div>

          <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Score', value: `${match.your_score || 0}-${match.opponent_score || 0}`, color: '#22c55e' },
              { label: 'Rating', value: match.rating ? match.rating.toFixed?.(1) || match.rating : '0.0', color: '#eab308' },
              { label: 'G/A', value: `${match.goals || 0}/${match.assists || 0}`, color: '#06b6d4' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#13131f', borderRadius: '10px', padding: '9px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '15px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '9px', fontWeight: '800', marginTop: '3px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
        
<div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#06b6d4', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>📅 THIS SEASON</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'Played', value: matches.length, color: '#06b6d4' },
              { label: 'Won', value: matches.filter((s: any) => s.result === 'Win').length, color: '#22c55e' },
              { label: 'Lost', value: matches.filter((s: any) => s.result === 'Loss').length, color: '#ef4444' },
              { label: 'Goals', value: matches.reduce((sum: number, s: any) => sum + (s.goals || 0), 0), color: '#22c55e' },
              { label: 'Assists', value: matches.reduce((sum: number, s: any) => sum + (s.assists || 0), 0), color: '#f59e0b' },
              { label: 'Avg Rating', value: matches.length > 0 ? (matches.reduce((sum: number, s: any) => sum + (s.rating || 0), 0) / matches.length).toFixed(1) : '0.0', color: '#eab308' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '20px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '3px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          {matches.length > 0 && (
            <div style={{ background: '#0a0a0f', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: '700', marginBottom: '8px' }}>GOALS PER GAME</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, height: '6px', background: '#1e1e30', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min((totalGoals / matches.length) * 50, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #22c55e, #06b6d4)', borderRadius: '999px' }} />
                </div>
                <div style={{ color: '#22c55e', fontWeight: '900', fontSize: '14px' }}>{(totalGoals / matches.length).toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>

<div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '900', marginBottom: '16px' }}>📈 TRAINING LOAD — LAST 6 WEEKS</div>
          {(() => {
            const weeks: { label: string, count: number }[] = []
            for (let i = 5; i >= 0; i--) {
              const weekStart = new Date()
              weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7)
              weekStart.setHours(0, 0, 0, 0)
              const weekEnd = new Date(weekStart)
              weekEnd.setDate(weekEnd.getDate() + 7)
              const count = footballSessions.filter((s: any) => {
                const d = new Date(s.date)
                return d >= weekStart && d < weekEnd
              }).length
              const label = `W${6 - i}`
              weeks.push({ label, count })
            }
            const max = Math.max(...weeks.map(w => w.count), 1)
            return (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                {weeks.map((week, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: '800' }}>{week.count > 0 ? week.count : ''}</div>
                    <div style={{ width: '100%', background: week.count > 0 ? 'linear-gradient(180deg, #a855f7, #7c3aed)' : '#1e1e30', borderRadius: '6px 6px 0 0', height: `${Math.max((week.count / max) * 60, week.count > 0 ? 8 : 4)}px`, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: '10px', color: '#555', fontWeight: '600' }}>{week.label}</div>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
{matches.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, #13131f, #10101a)', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#eab308', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🏆 PERSONAL BESTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Best Rating', value: `${bestRating}/10`, emoji: '⭐', color: '#eab308' },
                { label: 'Most Goals in a Match', value: mostGoals, emoji: '⚽', color: '#22c55e' },
                { label: 'Most Assists in a Match', value: mostAssists, emoji: '🅰️', color: '#06b6d4' },
                { label: 'Most Shots in a Match', value: mostShots, emoji: '🎯', color: '#f97316' },
                { label: 'Best Passing %', value: `${bestPassing}%`, emoji: '👟', color: '#a855f7' },
                { label: 'Most Key Passes', value: mostKeyPasses, emoji: '🔑', color: '#ef4444' },
              ].map((pb) => (
                <div key={pb.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0f', border: `1px solid ${pb.color}20`, borderRadius: '12px', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{pb.emoji}</span>
                    <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>{pb.label}</span>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '900', color: pb.color }}>{pb.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#13131f', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
          {(['upcoming', 'results'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, background: tab === t ? '#1e1e35' : 'none', border: tab === t ? '1px solid #2a2a40' : '1px solid transparent', borderRadius: '10px', color: tab === t ? 'white' : '#555', padding: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize' }}>{t === 'upcoming' ? 'Upcoming' : 'Results'}</button>
          ))}
        </div>

        {/* Add Fixture Form */}
        {tab === 'upcoming' && showAddFixture && (
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
            <input value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="Opponent name" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
              {['5-a-side', 'Sunday League', 'Kickabout'].map((type) => (
                <button key={type} onClick={() => setMatchType(type)} style={{ background: matchType === type ? '#06b6d420' : '#0a0a0f', border: `1.5px solid ${matchType === type ? '#06b6d4' : '#1e1e30'}`, borderRadius: '8px', color: matchType === type ? '#06b6d4' : '#666', padding: '6px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date (e.g. Thu 12 Jun)" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box' }} />
              <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time (e.g. 7pm)" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <button onClick={handleAddFixture} style={{ width: '100%', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Add Fixture</button>
          </div>
        )}

        {/* Upcoming Fixtures */}
        {tab === 'upcoming' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {fixtures.length === 0 && <p style={{ color: '#444', textAlign: 'center', marginTop: '40px' }}>No upcoming fixtures</p>}
            {fixtures.map((fixture) => (
              <div key={fixture.id}>
                <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: showLogResult === fixture.id ? '16px' : '0' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#06b6d4', flexShrink: 0, boxShadow: '0 0 8px #06b6d4' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '15px' }}>vs {fixture.opponent}</div>
                      <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{fixture.type} · {fixture.date} · {fixture.time}</div>
                    </div>
                    <button onClick={() => setShowLogResult(showLogResult === fixture.id ? null : fixture.id)} style={{ background: '#22c55e15', border: '1px solid #22c55e40', borderRadius: '8px', color: '#22c55e', padding: '6px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Log Result</button>
                  </div>

                  {showLogResult === fixture.id && (
                    <div style={{ borderTop: '1px solid #1e1e30', paddingTop: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                        <div>
                          <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>YOUR SCORE</label>
                          <input value={scoreFor} onChange={(e) => setScoreFor(e.target.value)} placeholder="0" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '20px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>THEIR SCORE</label>
                          <input value={scoreAgainst} onChange={(e) => setScoreAgainst(e.target.value)} placeholder="0" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '20px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                        <div>
                          <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>YOUR GOALS</label>
                          <input value={rGoals} onChange={(e) => setRGoals(e.target.value)} placeholder="0" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>ASSISTS</label>
                          <input value={rAssists} onChange={(e) => setRAssists(e.target.value)} placeholder="0" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                        <div>
                          <label style={{ fontSize: '11px', color: '#eab308', display: 'block', marginBottom: '6px' }}>🟨 YELLOW CARDS</label>
                          <input value={rYellow} onChange={(e) => setRYellow(e.target.value)} placeholder="0" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #eab30840', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', color: '#ef4444', display: 'block', marginBottom: '6px' }}>🟥 RED CARDS</label>
                          <input value={rRed} onChange={(e) => setRRed(e.target.value)} placeholder="0" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #ef444440', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                      <button onClick={() => handleLogResult(fixture)} style={{ width: '100%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>Save Result</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {tab === 'results' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {results.length === 0 && <p style={{ color: '#444', textAlign: 'center', marginTop: '40px' }}>No results yet</p>}
            {results.map((result, i) => (
              <div key={i} style={{ background: '#13131f', border: `1px solid ${result.color}25`, borderLeft: `4px solid ${result.color}`, borderRadius: '14px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>vs {result.opponent}</div>
                    <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{result.type} · {result.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: '800' }}>{result.scoreFor}–{result.scoreAgainst}</div>
                    <span style={{ background: outcomeColor[result.outcome], color: 'white', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '20px' }}>{result.outcome.toUpperCase()}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {result.goals > 0 && <span style={{ fontSize: '12px', color: '#aaa' }}>⚽ {result.goals} goal{result.goals !== 1 ? 's' : ''}</span>}
                  {result.assists > 0 && <span style={{ fontSize: '12px', color: '#aaa' }}>🅰️ {result.assists} assist{result.assists !== 1 ? 's' : ''}</span>}
                  {result.yellowCards > 0 && <span style={{ fontSize: '12px', color: '#eab308' }}>🟨 {result.yellowCards}</span>}
                  {result.redCards > 0 && <span style={{ fontSize: '12px', color: '#ef4444' }}>🟥 {result.redCards}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DrillDetail({ category, setActiveNav }: { category: string, setActiveNav: (nav: string) => void }) {
  const content: Record<string, { emoji: string, color: string, sections: { title: string, drills: { name: string, setup: string, reps: string, tip: string }[] }[] }> = {
    Shooting: {
      emoji: '⚽', color: '#22c55e',
      sections: [
        {
          title: 'Close Range Finishing',
          drills: [
            { name: 'Near Post Rolls', setup: 'Place ball 6 yards out at an angle. Roll it across your body and finish to the near post with your instep.', reps: '3 sets of 8 each side', tip: 'Keep your head down and plant foot beside the ball. Drive through with your laces, not your toe.' },
            { name: 'Rebound Finishing', setup: 'Kick ball against a wall from 5 yards. Control the rebound in one touch and finish low across goal.', reps: '3 sets of 10', tip: 'First touch away from your body, second touch is the finish. Stay on your toes to react fast.' },
            { name: 'Cutback Drill', setup: 'Dribble to the byline, cut the ball back to the penalty spot and shoot first time.', reps: '4 sets of 6 each side', tip: 'Attack the ball with purpose. Aim for the far corner — keepers struggle to get across in time.' },
          ]
        },
        {
          title: 'Long Shots',
          drills: [
            { name: 'Strike from 25 Yards', setup: 'Place 5 balls 25 yards from goal. Strike each with your laces, aiming for the corners.', reps: '4 sets of 5', tip: 'Non-striking foot points at target. Lean slightly forward. Follow through fully — your kicking foot should finish above waist height.' },
            { name: 'Moving Ball Strike', setup: 'Have a partner roll the ball out to you from 30 yards. Strike first time on the half-volley.', reps: '3 sets of 8', tip: 'Watch the ball all the way onto your foot. Keep your ankle locked and strike through the middle of the ball.' },
            { name: 'Curling Outside the Box', setup: 'Place ball just outside the D, slightly to your stronger side. Curl to the far corner using the inside of your foot.', reps: '3 sets of 6', tip: 'Strike the outside half of the ball and follow through across your body. Head over the ball to keep it dipping.' },
          ]
        },
        {
          title: 'Penalties',
          drills: [
            { name: 'Pick Your Spot', setup: 'Before placing ball on spot, decide exactly where you are hitting it. Commit fully — no changing your mind.', reps: '10 penalties, rotate corners', tip: 'Look at the keeper once, then look at your chosen spot. A confident, firm strike to the corner beats a keeper almost every time.' },
            { name: 'Pressure Penalties', setup: 'Do 10 sprint shuttles, then immediately take a penalty. Simulates match fatigue and pressure.', reps: '5 rounds', tip: 'Control your breathing before striking. Slow your approach run — rushing causes mishits. The keeper wants you to panic.' },
            { name: 'Stutter Run', setup: 'Practice a hesitation step in your run-up to force the keeper to commit early, then place to the open side.', reps: '10 reps', tip: 'The stutter only works if your body shape stays the same. If you telegraph the hesitation it gives the keeper time to reset.' },
          ]
        },
        {
          title: '1v1 with Keeper',
          drills: [
            { name: 'Through Ball Run', setup: 'Start 35 yards out. Have a partner play you through on goal. Finish before an imaginary offside line.', reps: '3 sets of 6', tip: 'Take a touch to set yourself, then decide early — chip, slot or go round. Hesitation is your biggest enemy in a 1v1.' },
            { name: 'Keeper Rushing Drill', setup: 'Keeper starts on edge of box and rushes out as you receive. Practice lifting ball over or going around.', reps: '4 sets of 5', tip: 'When keeper rushes, chip early. When keeper holds shape, go to the side of their body with more ground to cover.' },
          ]
        },
        {
          title: 'Volleys & Headers',
          drills: [
            { name: 'Tossed Ball Volley', setup: 'Partner tosses ball chest-height from 10 yards. Strike clean volleys at goal.', reps: '3 sets of 8', tip: 'Watch the ball onto your foot. Keep your knee over the ball to keep it down. Shoulders back slightly.' },
            { name: 'Attacking Header', setup: 'Cross delivered from wide. Attack the ball at the near post, aiming to redirect to far corner.', reps: '3 sets of 8 each side', tip: 'Attack the ball — never let it hit you. Use your forehead, eyes open. Arch back and snap forward for power.' },
          ]
        },
      ]
    },
    Passing: {
      emoji: '👟', color: '#06b6d4',
      sections: [
        {
          title: 'Short Passing',
          drills: [
            { name: 'Wall Pass Combinations', setup: 'Stand 5 yards from a wall. Play one-twos continuously, alternating feet.', reps: '3 sets of 2 minutes', tip: 'Use the inside of your foot for accuracy. Weight of pass should let your partner control easily — not too hard, not too soft.' },
            { name: 'Triangle Passing', setup: 'Set up 3 cones in a triangle 8 yards apart. Pass and move to the next cone after each pass.', reps: '5 minutes continuous', tip: 'Pass then move immediately. Show for the ball at an angle — never stand behind the cone. Communication is key.' },
            { name: 'Rondo (4v1)', setup: 'Four players in a circle with one in the middle. Maintain possession with maximum 2 touches.', reps: '10 minutes, rotate middle player', tip: 'Move the ball quickly. Create passing angles by moving off the ball. The player in the middle should press intelligently, not sprint randomly.' },
          ]
        },
        {
          title: 'Long Passing',
          drills: [
            { name: 'Driven Pass Over 30 Yards', setup: 'Two players 30-35 yards apart. Drive accurate passes to feet using your instep.', reps: '4 sets of 10 each foot', tip: 'Lock ankle, lean over ball slightly, strike through the middle. Follow through fully. The ball should arrive firm and at knee height.' },
            { name: 'Switch of Play', setup: 'Set up cones across a 40-yard wide area. Practice switching the play with one touch or driven pass.', reps: '3 sets of 8 each side', tip: 'Disguise the pass — look one way, play the other. Weight should allow the receiver to run onto it, not stop and control.' },
            { name: 'Lofted Ball into Space', setup: 'Practice clipping the ball over a cone (representing a defender) into a target zone 35 yards away.', reps: '3 sets of 6 each foot', tip: 'Get underneath the ball slightly, lean back. Strike the lower half to generate lift. Land it in a 5-yard box consistently.' },
          ]
        },
        {
          title: 'Through Balls',
          drills: [
            { name: 'Timing the Run', setup: 'One player makes a diagonal run, passer times the through ball into space ahead of them.', reps: '4 sets of 8', tip: 'Pass into space, not to the player. Imagine where they will be in 2 seconds, not where they are now.' },
            { name: 'Weighted Pass Under Pressure', setup: 'Defender tracks the runner. Passer must weight the ball perfectly — too heavy and keeper gets it, too light and defender intercepts.', reps: '3 sets of 6', tip: 'Read the defensive line. A well-weighted through ball is more valuable than pace on it.' },
          ]
        },
      ]
    },
    Dribbling: {
      emoji: '🔄', color: '#a855f7',
      sections: [
        {
          title: 'Close Control',
          drills: [
            { name: 'Cone Weave', setup: 'Set 8 cones 1 yard apart in a straight line. Dribble through at pace using both feet.', reps: '5 sets, time yourself', tip: 'Use the outside and inside of both feet alternately. Keep the ball within 1 foot of your body at all times. Head up after every 3 touches.' },
            { name: 'Box Control', setup: 'In a 5x5 yard box, dribble continuously without touching the cones. Increase speed each minute.', reps: '4 sets of 90 seconds', tip: 'Small, quick touches. Change direction before reaching the cone, not after. Stay on your toes throughout.' },
            { name: 'Figure of 8', setup: 'Two cones 3 yards apart. Dribble in a figure of 8 continuously, alternating which side you attack.', reps: '5 sets of 1 minute', tip: 'Use the outside of your foot to go around the outside of each cone. Keep low centre of gravity — bend your knees.' },
          ]
        },
        {
          title: 'Beating a Defender',
          drills: [
            { name: 'Scissors into Burst', setup: 'Dribble toward a standing cone (defender). Execute a scissors feint then burst past with the outside of your foot.', reps: '3 sets of 8 each side', tip: 'Sell the feint with your shoulder and eyes. The burst after the move must be explosive — 3 fast steps to create separation.' },
            { name: 'Step Over and Go', setup: 'Approach cone at pace. Do a double step over and cut inside or outside.', reps: '4 sets of 6 each side', tip: 'Speed of the step over matters more than size. Quick feet confuse defenders. Accelerate the moment you make the cut.' },
            { name: 'Live 1v1', setup: 'Play 1v1 in a 10x15 yard channel. Attacker tries to beat defender and cross the end line.', reps: '10 rounds of 30 seconds', tip: 'Use the width of the channel. Commit the defender with your body, then explode in the opposite direction.' },
          ]
        },
        {
          title: 'Speed Dribbling',
          drills: [
            { name: '30 Yard Sprint Dribble', setup: 'Dribble at full pace over 30 yards, keeping the ball under control.', reps: '6 reps with 45 second rest', tip: 'Longer touches in open space to maintain speed. Shorten your touches as you approach a challenge. Push the ball slightly ahead of you.' },
            { name: 'Dribble and Shoot', setup: 'Start 35 yards from goal. Dribble at pace and shoot before reaching the 18-yard box.', reps: '4 sets of 5', tip: 'Set up your shooting touch early — dont arrive at the shot off balance. The last touch before shooting should position the ball perfectly.' },
          ]
        },
      ]
    },
    Agility: {
      emoji: '⚡', color: '#eab308',
      sections: [
        {
          title: 'Ladder Drills',
          drills: [
            { name: 'In-In-Out-Out', setup: 'Place agility ladder flat. Step both feet into each rung, then both feet out to the side.', reps: '4 sets down and back', tip: 'Drive your arms — footwork speed is connected to arm speed. Stay on the balls of your feet throughout. Build pace each set.' },
            { name: 'Lateral Quick Steps', setup: 'Move sideways through ladder, one foot in each rung.', reps: '4 sets each direction', tip: 'Hips stay square. Short, sharp steps. Dont look down at the ladder after the first few reps — train your spatial awareness.' },
            { name: 'Icky Shuffle', setup: 'In-out-in pattern moving laterally down the ladder.', reps: '3 sets each direction', tip: 'This is a coordination drill as much as speed. Start slow to nail the pattern, then increase pace progressively.' },
          ]
        },
        {
          title: 'Change of Direction',
          drills: [
            { name: '5-10-5 Shuttle', setup: 'Three cones 5 yards apart in a line. Sprint to one end, back past start to the other, back to middle.', reps: '6 reps with 1 minute rest', tip: 'Plant your outside foot hard to change direction. Stay low in the turns — standing up kills your momentum.' },
            { name: 'T-Drill', setup: 'Cones in a T shape — 10 yards forward, 5 yards each side. Sprint forward, shuffle left, shuffle right, backpedal.', reps: '5 reps, rest 90 seconds', tip: 'Never cross your feet on the lateral shuffle. Keep low throughout. Your time should improve each session.' },
            { name: 'Reactive Cone Touch', setup: 'Partner points to one of 4 cones randomly. Sprint and touch it, return to centre, repeat.', reps: '4 sets of 30 seconds', tip: 'React to the signal, dont anticipate. This trains your reaction time as much as your agility. Stay balanced at centre ready to go any direction.' },
          ]
        },
        {
          title: 'Explosive Speed',
          drills: [
            { name: '10 Yard Burst', setup: 'From a standing start, explode over 10 yards. Focus on first 3 steps.', reps: '8 reps with 40 second rest', tip: 'Drive your knee up on the first step. Lean forward at 45 degrees from the ground. Arms drive back and forward powerfully.' },
            { name: 'Resistance Band Sprints', setup: 'Partner holds resistance band around your waist. Sprint against resistance for 15 yards, then release.', reps: '5 reps', tip: 'The release point trains your body to accelerate further. Drive through even when it feels hard — that resistance builds explosive power.' },
            { name: 'Flying 20s', setup: 'Jog for 10 yards to build momentum, then sprint flat out for 20 yards.', reps: '6 reps with 2 minute rest', tip: 'Top end speed drill. Relax your face, hands and shoulders — tension kills speed. Pump your arms hard and drive your knees high.' },
          ]
        },
      ]
    },
    Defending: {
      emoji: '🛡️', color: '#ef4444',
      sections: [
        {
          title: 'Defensive Positioning',
          drills: [
            { name: 'Jockeying Drill', setup: 'Attacker dribbles toward you in a 10-yard channel. Stay goal-side, stay low, show them to the weak side.', reps: '4 sets of 45 seconds', tip: 'Stay on your toes in a slight crouch. Dont dive in — be patient. Your job is to delay and force a bad decision, not always to win the ball.' },
            { name: 'Tracking Runs', setup: 'Partner makes runs in behind. Practise staying goal-side while tracking the movement.', reps: '3 sets of 8 runs', tip: 'Check your shoulder constantly. Dont ball-watch. Know where the ball is AND where your runner is at all times.' },
            { name: 'Cover Shadow', setup: 'Position yourself between attacker and goal so you cut off the passing lane into them.', reps: '10 minutes of positional work', tip: 'Make yourself big. Arms out, sideways on. Force the play wide or backwards — eliminating forward options is defending well.' },
          ]
        },
        {
          title: 'Winning the Ball',
          drills: [
            { name: 'Timed Tackle', setup: 'Attacker dribbles toward you. Wait for the moment they take a heavy touch, then make your tackle.', reps: '4 sets of 8', tip: 'Tackle through the ball, not at it. Leading foot goes through the middle of the ball. Stay balanced on your standing foot.' },
            { name: 'Interception Drill', setup: 'Two attackers pass between them. Defender reads the pass and intercepts.', reps: '5 sets of 2 minutes', tip: 'Watch the passer body shape, not the ball. The moment their hips open to pass, step across the passing lane.' },
            { name: 'Aerial Duel', setup: 'Two players compete for a ball crossed from wide at various heights.', reps: '3 sets of 10', tip: 'Time your jump from 2 yards back so you reach peak height at the ball. Use your body to shield, arms out for balance.' },
          ]
        },
        {
          title: 'Pressing',
          drills: [
            { name: 'Press Trigger Drill', setup: 'Defenders press only when ball is played into feet of striker with back to goal.', reps: '10 minutes small sided', tip: 'Press as a unit — one player triggers, others cover. A disorganised press is worse than no press. Communication is everything.' },
            { name: 'Pressing Angles', setup: 'Practice approaching the ball carrier at an angle that cuts off their best option.', reps: '4 sets of 6', tip: 'Approach at an angle, not straight on. Slow your last 3 steps to stay balanced. Show them the touchline or backward pass.' },
          ]
        },
      ]
    },
    'Set Pieces': {
      emoji: '🎯', color: '#f97316',
      sections: [
        {
          title: 'Free Kicks',
          drills: [
            { name: 'Over the Wall', setup: 'Set up 3 cones as a wall 9 yards from ball. Practice getting the ball up and over then dipping into goal.', reps: '4 sets of 8', tip: 'Strike the bottom half of the ball with your instep. Follow through across your body for curl. The dip comes from topspin on the follow through.' },
            { name: 'Around the Wall', setup: 'Same setup but curl the ball around the outside of the wall to the far post.', reps: '3 sets of 8 each side', tip: 'Strike the outside half of the ball. Plant foot slightly behind and to the side. The curl is in the contact point and follow through.' },
            { name: 'Low Driven Free Kick', setup: 'Practice driving the ball through a gap in the wall along the ground.', reps: '3 sets of 6', tip: 'Keep your head and body over the ball. Strike with your laces through the middle. Accuracy beats power here.' },
          ]
        },
        {
          title: 'Corners',
          drills: [
            { name: 'Inswinging Corner', setup: 'Practice delivering corners that swing into the 6-yard box from both sides.', reps: '4 sets of 8 each side', tip: 'Aim for the 6-yard box, not the penalty spot. Pace that beats the keeper but allows attackers to attack is ideal.' },
            { name: 'Outswinging Corner', setup: 'Deliver corners that swing away from goal, designed for near post flick-ons.', reps: '3 sets of 8 each side', tip: 'Target the near post. Attackers attacking toward the ball is far more dangerous than attackers trying to redirect it.' },
            { name: 'Short Corner', setup: 'Two-player routine — short pass to create a crossing angle from a different position.', reps: '4 sets of 6', tip: 'The run from the receiver must be sharp. If they take too long the defence reorganises. Sprint onto it and deliver quickly.' },
          ]
        },
        {
          title: 'Throw-ins',
          drills: [
            { name: 'Long Throw', setup: 'Practice long throws from the touchline to reach the penalty area.', reps: '3 sets of 10', tip: 'Both feet on the ground, ball brought behind the head in a smooth arc. Arch your back and snap forward. Follow through toward your target.' },
            { name: 'Quick Throw Combinations', setup: 'Practice rapid throw-in combinations to beat a press and maintain possession.', reps: '10 minutes of pattern work', tip: 'Receiver moves away from the thrower first, then checks back. Creates space and beats the press. Quick and simple.' },
          ]
        },
      ]
    },
  }

  const cat = content[category]
  if (!cat) return null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${cat.color}20 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('suggested-drills')} style={{ background: 'none', border: 'none', color: cat.color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `2.5px solid ${cat.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', background: '#13131f', boxShadow: `0 0 16px ${cat.color}40` }}>{cat.emoji}</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{category}</h1>
        </div>

        {cat.sections.map((section) => (
          <div key={section.title} style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: cat.color, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{section.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.drills.map((drill) => (
                <div key={drill.name} style={{ background: '#13131f', border: `1px solid ${cat.color}20`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '18px' }}>
                  <div style={{ fontWeight: '800', fontSize: '15px', marginBottom: '8px' }}>{drill.name}</div>
                  <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 10px', lineHeight: '1.6' }}>{drill.setup}</p>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
                    <span style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: '20px', color: cat.color, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>📋 {drill.reps}</span>
                  </div>
                  <div style={{ background: '#0a0a0f', borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${cat.color}` }}>
                    <span style={{ fontSize: '11px', color: cat.color, fontWeight: '700' }}>💡 COACHING TIP  </span>
                    <span style={{ fontSize: '12px', color: '#888', lineHeight: '1.5' }}>{drill.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TennisDrillDetail({ category, setActiveNav }: { category: string, setActiveNav: (nav: string) => void }) {
  const content: Record<string, any> = {
    Serve: {
      emoji: '🎯',
      color: '#eab308',
      sections: [
        {
          title: 'Serve Consistency',
          drills: [
            {
              name: '50 Ball Service Box Challenge',
              setup: 'Serve 50 balls aiming only to get them in. Do not worry about power yet.',
              reps: '50 serves',
              tip: 'Your first goal is rhythm. Same ball toss, same contact point, same landing balance every time.'
            },
            {
              name: 'Second Serve Safety Drill',
              setup: 'Hit second serves with more height over the net and spin. Aim deep into the service box.',
              reps: '5 sets of 10',
              tip: 'A good second serve is not weak. It should clear the net safely and kick up enough to stop attacks.'
            },
            {
              name: 'Wide, Body, T Targets',
              setup: 'Place targets wide, body and T. Rotate between all three serve locations.',
              reps: '3 rounds of 15',
              tip: 'Serving is tactical. A body serve can be just as effective as an ace because it jams the opponent.'
            },
          ]
        },
        {
          title: 'Serve Power',
          drills: [
            {
              name: 'Loose Arm Power Drill',
              setup: 'Serve at 70% effort while keeping your arm relaxed. Build speed without forcing it.',
              reps: '30 serves',
              tip: 'Power comes from legs, rotation and timing — not just swinging your arm harder.'
            },
            {
              name: 'Leg Drive Serve',
              setup: 'Focus on bending knees and pushing up into contact.',
              reps: '4 sets of 8',
              tip: 'Imagine jumping up to the ball, not falling sideways. Your body should move up and forwards.'
            },
          ]
        },
      ]
    },

    Forehand: {
      emoji: '💥',
      color: '#22c55e',
      sections: [
        {
          title: 'Control & Consistency',
          drills: [
            {
              name: 'Crosscourt Rally Target',
              setup: 'Hit forehands crosscourt into a deep target zone. Count how many you can make in a row.',
              reps: '3 rounds of 20',
              tip: 'Crosscourt is higher percentage because the court is longer and the net is lower in the middle.'
            },
            {
              name: 'Deep Forehand Drill',
              setup: 'Aim every forehand past the service line, ideally near the baseline.',
              reps: '4 sets of 10',
              tip: 'Depth pushes opponents back. A deep average shot is often better than a risky winner attempt.'
            },
          ]
        },
        {
          title: 'Attacking Forehands',
          drills: [
            {
              name: 'Short Ball Punish',
              setup: 'Feed a short ball, step inside the baseline and attack to a corner.',
              reps: '4 sets of 8',
              tip: 'Do not overhit. Step in early, take time away, and aim with margin.'
            },
            {
              name: 'Inside-Out Forehand',
              setup: 'Run around the backhand and hit forehands into the opponent’s backhand corner.',
              reps: '3 sets of 10',
              tip: 'This is one of the strongest attacking patterns in tennis. Recover quickly after the shot.'
            },
          ]
        },
      ]
    },

    Backhand: {
      emoji: '🎾',
      color: '#06b6d4',
      sections: [
        {
          title: 'Backhand Stability',
          drills: [
            {
              name: 'Backhand Wall Rally',
              setup: 'Rally against a wall using only backhands. Keep the ball controlled.',
              reps: '5 minutes',
              tip: 'Focus on clean contact and balance. Do not lean backwards when the ball gets fast.'
            },
            {
              name: 'Crosscourt Backhand Pattern',
              setup: 'Hit repeated backhands crosscourt into a deep target.',
              reps: '4 sets of 12',
              tip: 'Most backhand mistakes come from rushing. Turn your shoulders early and give yourself space.'
            },
          ]
        },
        {
          title: 'Defensive Backhands',
          drills: [
            {
              name: 'High Ball Recovery',
              setup: 'Feed high balls to the backhand side. Loop them back deep crosscourt.',
              reps: '3 sets of 10',
              tip: 'When under pressure, height and depth are your friends. You do not need to hit a winner.'
            },
            {
              name: 'Slice Escape Drill',
              setup: 'Practise slicing low and deep when pulled wide.',
              reps: '3 sets of 8',
              tip: 'A good slice buys time and keeps the ball low so your opponent cannot attack easily.'
            },
          ]
        },
      ]
    },

    Footwork: {
      emoji: '👟',
      color: '#a855f7',
      sections: [
        {
          title: 'Court Movement',
          drills: [
            {
              name: 'Split Step Reaction',
              setup: 'Partner points left or right as you split step, then you sprint to that side.',
              reps: '4 sets of 30 seconds',
              tip: 'Split step just as your opponent hits. This makes your first move much quicker.'
            },
            {
              name: 'Recovery Cone Drill',
              setup: 'Hit or shadow a shot wide, then recover to the centre cone.',
              reps: '5 sets of 8',
              tip: 'Tennis is shot plus recovery. The recovery is what gets you ready for the next ball.'
            },
            {
              name: 'Spider Drill',
              setup: 'Start in the middle. Sprint to each corner of the court and return to centre.',
              reps: '4 rounds',
              tip: 'Stay low when changing direction. Standing upright slows you down.'
            },
          ]
        },
      ]
    },

    Volleys: {
      emoji: '🕸️',
      color: '#f97316',
      sections: [
        {
          title: 'Net Play',
          drills: [
            {
              name: 'Rapid Volley Reactions',
              setup: 'Partner feeds quick balls at the net. Block volleys back with short swings.',
              reps: '4 sets of 20',
              tip: 'Volleys are not big swings. Keep the racket out in front and punch through the ball.'
            },
            {
              name: 'Low Volley Control',
              setup: 'Feed balls below net height. Practise lifting them deep and controlled.',
              reps: '3 sets of 10',
              tip: 'Bend your knees instead of dropping the racket head. Stay compact.'
            },
            {
              name: 'Approach and Finish',
              setup: 'Hit an approach shot, move in, then finish with a volley.',
              reps: '4 sets of 6',
              tip: 'Approach shots should be deep. A weak approach gives your opponent an easy pass.'
            },
          ]
        },
      ]
    },

    Tactics: {
      emoji: '🧠',
      color: '#ef4444',
      sections: [
        {
          title: 'Point Construction',
          drills: [
            {
              name: 'Crosscourt Until Short',
              setup: 'Rally crosscourt until one ball lands short, then attack down the line.',
              reps: '10 points',
              tip: 'Do not attack too early. Build the point first, then punish the weak ball.'
            },
            {
              name: 'Serve Plus One',
              setup: 'Serve, then plan your next shot before the point starts.',
              reps: '20 points',
              tip: 'Good players do not just serve — they serve to create the next shot they want.'
            },
            {
              name: 'Defence to Attack',
              setup: 'Start each point on defence, recover deep, then attack once you get a shorter ball.',
              reps: '10 points',
              tip: 'The aim is not to win every defensive shot. The aim is to survive long enough to turn the point.'
            },
          ]
        },
      ]
    },
  }

  const cat = content[category]
  if (!cat) return null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('suggested-tennis-drills')} style={{ background: 'none', border: 'none', color: cat.color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `2.5px solid ${cat.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', background: '#13131f', boxShadow: `0 0 16px ${cat.color}40` }}>{cat.emoji}</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{category}</h1>
        </div>

        {cat.sections.map((section: any) => (
          <div key={section.title} style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: cat.color, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{section.title}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.drills.map((drill: any) => (
                <div key={drill.name} style={{ background: '#13131f', border: `1px solid ${cat.color}20`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '18px' }}>
                  <div style={{ fontWeight: '800', fontSize: '15px', marginBottom: '8px' }}>{drill.name}</div>
                  <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 10px', lineHeight: '1.6' }}>{drill.setup}</p>
                  <span style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: '20px', color: cat.color, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>📋 {drill.reps}</span>
                  <div style={{ background: '#0a0a0f', borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${cat.color}`, marginTop: '10px' }}>
                    <span style={{ fontSize: '11px', color: cat.color, fontWeight: '700' }}>💡 COACHING TIP </span>
                    <span style={{ fontSize: '12px', color: '#888', lineHeight: '1.5' }}>{drill.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
function LogSwim({ setActiveNav, swimmingSessions, setSwimmingSessions, swimmingPRs, setSwimmingPRs, addSocialPost, triggerPRToast }: any) {
  const [swimType, setSwimType] = useState('')
  const [stroke, setStroke] = useState('')
  const [poolLength, setPoolLength] = useState('25')
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [effort, setEffort] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const calculatePace = () => {
    const d = parseFloat(distance)
    const t = parseFloat(time)
    if (!d || !t) return '0:00/100m'
    const pace = t / (d / 100)
    const mins = Math.floor(pace)
    const secs = Math.round((pace - mins) * 60)
    return `${mins}:${secs.toString().padStart(2, '0')}/100m`
  }

  const calculateLengths = () => {
    const d = parseFloat(distance)
    const p = parseFloat(poolLength)
    if (!d || !p) return 0
    return Math.round(d / p)
  }

  const handleSave = async () => {
    const d = parseFloat(distance) || 0
    const t = parseFloat(time) || 0
    const pace = calculatePace()

    const newSwim = {
      id: Date.now(),
      swimType,
      stroke,
      poolLength: parseFloat(poolLength) || 25,
      distance: d,
      time: t,
      pace,
      lengths: calculateLengths(),
      effort,
      notes,
      date: new Date().toISOString().split('T')[0]
    }

    setSwimmingSessions([newSwim, ...swimmingSessions])

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('swimming_sessions').insert({
        user_id: session.user.id,
        swim_type: swimType,
        stroke,
        pool_length: parseFloat(poolLength) || 25,
        distance: d,
        time: t,
        pace,
        lengths: calculateLengths(),
        effort,
        notes
      })
    }

    addSocialPost({
      sport: 'Swimming',
      sportColor: '#3b82f6',
      emoji: '🏊',
      caption: `Logged a ${d}m ${stroke || 'swim'} session — ${t} mins, ${calculateLengths()} lengths at ${pace}.`
    })

    const newPRs = [...swimmingPRs]

    const checkPR = (label: string, targetDistance: number) => {
      if (d >= targetDistance) {
        const existing = newPRs.find((pr: any) => pr.label === label)
        if (!existing || t < existing.time) {
          if (existing) {
            existing.time = t
            existing.pace = pace
            existing.date = 'Today'
          } else {
            newPRs.push({ label, distance: targetDistance, time: t, pace, date: 'Today' })
          }
        }
      }
    }

    checkPR('100m', 100)
    checkPR('400m', 400)
    checkPR('1500m', 1500)

    const newSwimPRCount = newPRs.filter((pr: any) => {
      const existing = swimmingPRs.find((p: any) => p.label === pr.label)
      return !existing || pr.time < existing.time
    }).length

    setSwimmingPRs(newPRs)

    if (newSwimPRCount > 0 && triggerPRToast) {
      const latestPR = newPRs[newPRs.length - 1]
      triggerPRToast(
        `🏆 New ${latestPR.label} PR!`,
        `${latestPR.time} mins at ${latestPR.pace}`,
        '🏊',
        '#3b82f6'
      )
    }

    playHaptic()
    playSound('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('swimming-hub')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log Swim</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 28px' }}>Track distance, stroke, pace and lengths</p>

        <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>SWIM TYPE</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Technique', 'Endurance', 'Sprint', 'Recovery', 'Open Water'].map((type) => (
            <button key={type} onClick={() => setSwimType(type)} style={{ background: swimType === type ? '#3b82f620' : '#13131f', border: `1.5px solid ${swimType === type ? '#3b82f6' : '#1e1e30'}`, borderRadius: '10px', color: swimType === type ? '#3b82f6' : '#666', padding: '10px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
          ))}
        </div>

        {swimType && (
          <>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>MAIN STROKE</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['Freestyle', 'Breaststroke', 'Backstroke', 'Butterfly', 'Mixed'].map((s) => (
                <button key={s} onClick={() => setStroke(s)} style={{ background: stroke === s ? '#06b6d420' : '#13131f', border: `1.5px solid ${stroke === s ? '#06b6d4' : '#1e1e30'}`, borderRadius: '20px', color: stroke === s ? '#06b6d4' : '#666', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{s}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>DISTANCE M</label>
                <input value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="1000" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>TIME MINS</label>
                <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="25" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>POOL LENGTH</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['25', '33', '50'].map((p) => (
                <button key={p} onClick={() => setPoolLength(p)} style={{ background: poolLength === p ? '#22c55e20' : '#13131f', border: `1.5px solid ${poolLength === p ? '#22c55e' : '#1e1e30'}`, borderRadius: '20px', color: poolLength === p ? '#22c55e' : '#666', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{p}m</button>
              ))}
            </div>

            <div style={{ background: '#13131f', border: '1px solid #3b82f625', borderLeft: '4px solid #3b82f6', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>CALCULATED</div>
              <div style={{ color: '#3b82f6', fontSize: '24px', fontWeight: '900' }}>{calculatePace()}</div>
              <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>{calculateLengths()} lengths</div>
            </div>

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>EFFORT</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['Easy', 'Moderate', 'Hard', 'Max'].map((e) => (
                <button key={e} onClick={() => setEffort(e)} style={{ background: effort === e ? '#a855f720' : '#13131f', border: `1.5px solid ${effort === e ? '#a855f7' : '#1e1e30'}`, borderRadius: '20px', color: effort === e ? '#a855f7' : '#666', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{e}</button>
              ))}
            </div>

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>NOTES</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the swim feel?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', marginBottom: '28px' }} />

            <button onClick={handleSave} style={{ width: '100%', background: saved ? '#2563eb' : 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px #3b82f640' }}>
              {saved ? '✓ Swim Saved!' : 'Save Swim'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function SwimmingStats({ setActiveNav, swimmingSessions, setSwimmingSessions, swimmingPRs }: any) {
  const totalSwims = swimmingSessions.length

  const totalDistance = swimmingSessions.reduce(
    (sum: number, s: any) => sum + (s.distance || 0),
    0
  )

  const totalLengths = swimmingSessions.reduce(
    (sum: number, s: any) => sum + (s.lengths || 0),
    0
  )

  const totalTime = swimmingSessions.reduce(
    (sum: number, s: any) => sum + (s.time || 0),
    0
  )

  const strokeCounts = swimmingSessions.reduce((acc: any, s: any) => {
    if (s.stroke) {
      acc[s.stroke] = (acc[s.stroke] || 0) + 1
    }
    return acc
  }, {})

  const favouriteStroke =
    Object.keys(strokeCounts).sort(
      (a, b) => strokeCounts[b] - strokeCounts[a]
    )[0] || 'None'

  const longestSwim = swimmingSessions.reduce(
    (max: number, s: any) => Math.max(max, s.distance || 0),
    0
  )

  const handleDeleteSession = async (sessionId: any) => {
    setSwimmingSessions(swimmingSessions.filter((s: any) => s.id !== sessionId))
    await supabase.from('swimming_sessions').delete().eq('id', sessionId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>

        <button
          onClick={() => setActiveNav('swimming-hub')}
          style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}
        >
          ← Back
        </button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>
          Swimming Stats
        </h1>

        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
          Your swimming progress from logged sessions
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Swims', value: totalSwims, color: '#3b82f6' },
            { label: 'Distance', value: `${totalDistance}m`, color: '#06b6d4' },
            { label: 'Lengths', value: totalLengths, color: '#22c55e' },
            { label: 'Time', value: `${totalTime} min`, color: '#a855f7' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: '#13131f',
                border: `1px solid ${stat.color}25`,
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '700' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#13131f', border: '1px solid #3b82f625', borderLeft: '4px solid #3b82f6', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#3b82f6', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>📅 THIS SEASON</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'Swims', value: totalSwims, color: '#3b82f6' },
              { label: 'Distance', value: `${totalDistance}m`, color: '#06b6d4' },
              { label: 'Lengths', value: totalLengths, color: '#22c55e' },
              { label: 'Time', value: `${totalTime}m`, color: '#a855f7' },
              { label: 'Avg Dist', value: totalSwims > 0 ? `${Math.round(totalDistance / totalSwims)}m` : '0m', color: '#3b82f6' },
              { label: 'Best Stroke', value: favouriteStroke, color: '#06b6d4' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '16px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '3px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '900', marginBottom: '16px' }}>📈 WEEKLY LOAD — LAST 6 WEEKS</div>
          {(() => {
            const weeks: { label: string, distance: number }[] = []
            for (let i = 5; i >= 0; i--) {
              const weekStart = new Date()
              weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7)
              weekStart.setHours(0, 0, 0, 0)
              const weekEnd = new Date(weekStart)
              weekEnd.setDate(weekEnd.getDate() + 7)
              const distance = swimmingSessions.filter((s: any) => {
                const d = new Date(s.date)
                return d >= weekStart && d < weekEnd
              }).reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
              weeks.push({ label: `W${6 - i}`, distance })
            }
            const max = Math.max(...weeks.map(w => w.distance), 1)
            return (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                {weeks.map((week, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: '800' }}>{week.distance > 0 ? `${week.distance}` : ''}</div>
                    <div style={{ width: '100%', background: week.distance > 0 ? 'linear-gradient(180deg, #3b82f6, #2563eb)' : '#1e1e30', borderRadius: '6px 6px 0 0', height: `${Math.max((week.distance / max) * 60, week.distance > 0 ? 8 : 4)}px` }} />
                    <div style={{ fontSize: '10px', color: '#555', fontWeight: '600' }}>{week.label}</div>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
        
        <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>
          Swim Breakdown
        </h2>

        {[
          { label: 'Favourite Stroke', value: favouriteStroke, color: '#06b6d4' },
          { label: 'Longest Swim', value: `${longestSwim}m`, color: '#22c55e' },
          { label: 'Personal Records', value: swimmingPRs.length, color: '#f59e0b' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: '#13131f',
              borderLeft: `4px solid ${item.color}`,
              borderRadius: '14px',
              padding: '14px 18px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontWeight: '700' }}>{item.label}</span>
            <span style={{ color: item.color, fontWeight: '800' }}>
              {item.value}
            </span>
          </div>
        ))}

{swimmingSessions.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, #13131f, #10101a)', border: '1px solid #3b82f625', borderLeft: '4px solid #3b82f6', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#3b82f6', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🏆 PERSONAL BESTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Longest Swim', value: `${longestSwim}m`, emoji: '🌊', color: '#3b82f6' },
                { label: 'Most Lengths in a Session', value: Math.max(...swimmingSessions.map((s: any) => s.lengths || 0)), emoji: '🏊', color: '#06b6d4' },
                { label: 'Longest Session', value: `${Math.max(...swimmingSessions.map((s: any) => s.time || 0))} mins`, emoji: '⏱️', color: '#22c55e' },
                { label: 'Personal Records', value: swimmingPRs.length, emoji: '🏅', color: '#eab308' },
              ].map((pb) => (
                <div key={pb.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0f', border: `1px solid ${pb.color}20`, borderRadius: '12px', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{pb.emoji}</span>
                    <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>{pb.label}</span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: pb.color }}>{pb.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {swimmingSessions.length > 0 && (
          <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#06b6d4', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🏊 STROKE BREAKDOWN</div>
            {(['Freestyle', 'Breaststroke', 'Backstroke', 'Butterfly', 'Mixed'] as const).map((stroke) => {
              const count = swimmingSessions.filter((s: any) => s.stroke === stroke).length
              const distance = swimmingSessions.filter((s: any) => s.stroke === stroke).reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
              const percent = totalSwims > 0 ? Math.round((count / totalSwims) * 100) : 0
              const colors: Record<string, string> = { 'Freestyle': '#3b82f6', 'Breaststroke': '#22c55e', 'Backstroke': '#a855f7', 'Butterfly': '#f97316', 'Mixed': '#06b6d4' }
              const color = colors[stroke]
              if (count === 0) return null
              return (
                <div key={stroke} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                    <span style={{ color: '#aaa', fontWeight: '700' }}>{stroke}</span>
                    <span style={{ color: '#666' }}>{count} swims · {distance}m · {percent}%</span>
                  </div>
                  <div style={{ height: '7px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: '999px' }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>
          Recent Swims
        </h2>

        {swimmingSessions.length === 0 ? (
          <div onClick={() => setActiveNav('log-swim')} style={{ background: '#13131f', border: '1px solid #3b82f625', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏊</div>
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#3b82f6' }}>Ready to start swimming?</div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first swim to see stats here</div>
            <span style={{ background: '#3b82f615', border: '1px solid #3b82f640', borderRadius: '20px', color: '#3b82f6', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Swim →</span>
          </div>
        ) : (
          swimmingSessions.slice(0, 5).map((swim: any) => (
            <div
              key={swim.id}
              style={{
                background: '#13131f',
                border: '1px solid #1e1e30',
                borderLeft: '4px solid #3b82f6',
                borderRadius: '14px',
                padding: '14px 18px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>{swim.swimType}</strong>
                <span style={{ color: '#3b82f6', fontWeight: '800' }}>
                  {swim.distance}m
                </span>
              </div>

              <div style={{ color: '#666', fontSize: '12px', marginBottom: '6px' }}>{swim.time} min · {swim.pace}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {swim.stroke && (
                  <span style={{ background: '#3b82f615', border: '1px solid #3b82f630', borderRadius: '20px', color: '#3b82f6', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{swim.stroke}</span>
                )}
                {swim.swimType && (
                  <span style={{ background: '#06b6d415', border: '1px solid #06b6d430', borderRadius: '20px', color: '#06b6d4', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{swim.swimType}</span>
                )}
                {swim.effort && (
                  <span style={{ background: '#a855f715', border: '1px solid #a855f730', borderRadius: '20px', color: '#a855f7', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{swim.effort}</span>
                )}
                {swim.lengths > 0 && (
                  <span style={{ background: '#22c55e15', border: '1px solid #22c55e30', borderRadius: '20px', color: '#22c55e', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{swim.lengths} lengths</span>
                )}
                {swim.date && (
                  <span style={{ background: '#1e1e30', borderRadius: '20px', color: '#555', fontSize: '10px', fontWeight: '600', padding: '3px 8px' }}>{swim.date}</span>
                )}
              </div>
              </div>
              <button onClick={() => handleDeleteSession(swim.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SwimmingPRs({ setActiveNav, swimmingPRs }: any) {
  const prTargets = ['100m', '400m', '1500m']

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('swimming-hub')} style={{ background: 'none', border: 'none', color: '#22c55e', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Swimming PRs</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your fastest recorded swim distances</p>

        {prTargets.map((target) => {
          const pr = swimmingPRs.find((p: any) => p.label === target)

          return (
            <div key={target} style={{ background: '#13131f', border: `1px solid ${pr ? '#22c55e25' : '#1e1e30'}`, borderLeft: `4px solid ${pr ? '#22c55e' : '#444'}`, borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: '900' }}>{target}</div>
                  <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                    {pr ? `Set ${pr.date}` : 'No record yet'}
                  </div>
                </div>

                {pr ? (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#22c55e', fontSize: '22px', fontWeight: '900' }}>{pr.time} min</div>
                    <div style={{ color: '#888', fontSize: '12px' }}>{pr.pace}</div>
                  </div>
                ) : (
                  <div style={{ color: '#444', fontSize: '13px', fontWeight: '700' }}>
                    Log a swim
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <div style={{ background: '#13131f', border: '1px solid #3b82f625', borderLeft: '4px solid #3b82f6', borderRadius: '16px', padding: '18px', marginTop: '22px' }}>
          <div style={{ fontWeight: '800', marginBottom: '8px' }}>How PRs work</div>
          <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
            Log a swim of at least 100m, 400m or 1500m. SportSync will automatically save it as a PR if it is your fastest time for that distance.
          </p>
        </div>
      </div>
    </div>
  )
}

function SwimmingSessionDetail({ category, setActiveNav }: any) {
  const content: Record<string, any> = {
    Technique: {
      emoji: '🎯',
      color: '#3b82f6',
      sessions: [
        { name: 'Catch-Up Freestyle', setup: 'Swim freestyle where one arm waits in front until the other arm completes the stroke.', reps: '8 x 25m', tip: 'Improves body position, timing and long smooth strokes.' },
        { name: 'Fingertip Drag', setup: 'During freestyle recovery, lightly drag fingertips along the water surface.', reps: '6 x 25m', tip: 'Keeps elbows high and improves relaxed arm recovery.' },
        { name: 'Single Arm Freestyle', setup: 'Swim using one arm only while the other stays extended in front.', reps: '4 x 25m each arm', tip: 'Helps you feel balance, rotation and pull quality.' },
      ]
    },
    Sprint: {
      emoji: '⚡',
      color: '#eab308',
      sessions: [
        { name: '12 x 25m Sprint', setup: 'Swim 25m fast with full effort, then rest 30–45 seconds.', reps: '12 rounds', tip: 'Keep technique clean even when sprinting. Fast but messy swimming wastes energy.' },
        { name: 'Fast 50s', setup: 'Swim 50m at strong pace, rest 60 seconds.', reps: '8 x 50m', tip: 'Try to hold the same time each rep instead of fading.' },
        { name: 'Dive Start Practice', setup: 'Practise explosive push-offs or starts followed by 15m sprint.', reps: '10 reps', tip: 'The first 15m matters massively in sprint swimming.' },
      ]
    },
    Endurance: {
      emoji: '🫀',
      color: '#22c55e',
      sessions: [
        { name: 'Steady 1000m Swim', setup: 'Swim continuously at relaxed aerobic effort.', reps: '1000m', tip: 'Focus on relaxed breathing and consistent pacing.' },
        { name: '5 x 200m Aerobic', setup: 'Swim 200m steady, rest 30 seconds.', reps: '5 rounds', tip: 'Great for building endurance without losing technique.' },
        { name: 'Ladder Swim', setup: 'Swim 100m, 200m, 300m, 200m, 100m with short rests.', reps: '900m total', tip: 'Use the shorter reps to reset form before the longer blocks.' },
      ]
    },
    'Open Water': {
      emoji: '🌊',
      color: '#06b6d4',
      sessions: [
        { name: 'Sighting Practice', setup: 'Every 6–8 strokes, lift your eyes forwards briefly before turning to breathe.', reps: '10 x 50m', tip: 'Do not lift your whole head high. Small sighting keeps your hips up.' },
        { name: 'No-Wall Continuous Swim', setup: 'At each wall, turn gently instead of pushing off hard to simulate open water.', reps: '15–25 mins', tip: 'Open water has no wall push-offs, so this builds more realistic endurance.' },
        { name: 'Drafting Practice', setup: 'Swim behind or beside a partner while maintaining safe distance.', reps: '6 x 100m', tip: 'Drafting saves energy, but only works if you stay relaxed and controlled.' },
      ]
    },
    Recovery: {
      emoji: '🌿',
      color: '#a855f7',
      sessions: [
        { name: 'Easy Technique Swim', setup: 'Swim gently with perfect form and long rests.', reps: '20–30 mins', tip: 'Recovery swims should leave you feeling better than when you started.' },
        { name: 'Mixed Stroke Loosen', setup: 'Alternate 50m freestyle, 25m backstroke and 25m easy breaststroke.', reps: '4–6 rounds', tip: 'Changing stroke reduces repetitive strain and loosens the body.' },
        { name: 'Kickboard Recovery', setup: 'Use a kickboard at relaxed pace, focusing on rhythm.', reps: '8 x 25m', tip: 'Keep kicks small and steady rather than big and splashy.' },
      ]
    },
    'Race Prep': {
      emoji: '🏁',
      color: '#ef4444',
      sessions: [
        { name: 'Broken 400m', setup: 'Swim 4 x 100m at target 400m pace with 20 seconds rest.', reps: '4 x 100m', tip: 'This lets you practise race pace without fully fatiguing.' },
        { name: 'Negative Split 200m', setup: 'Swim 200m where the second 100m is faster than the first.', reps: '4 rounds', tip: 'Teaches control early and aggression late.' },
        { name: 'Race Finish Practice', setup: 'Swim 75m steady then final 25m all-out.', reps: '6 rounds', tip: 'Many races are won by holding technique when tired.' },
      ]
    },
  }

  const cat = content[category]
  if (!cat) return null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('swimming-plans')} style={{ background: 'none', border: 'none', color: cat.color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>{cat.emoji} {category}</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Useful swim sessions for this focus</p>

        {cat.sessions.map((s: any) => (
          <div key={s.name} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
            <div style={{ fontWeight: '900', fontSize: '16px', marginBottom: '8px' }}>{s.name}</div>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: '0 0 10px' }}>{s.setup}</p>
            <span style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: '20px', color: cat.color, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>📋 {s.reps}</span>
            <div style={{ background: '#0a0a0f', borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${cat.color}`, marginTop: '10px' }}>
              <span style={{ fontSize: '11px', color: cat.color, fontWeight: '700' }}>💡 COACHING TIP </span>
              <span style={{ fontSize: '12px', color: '#888' }}>{s.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuggestedSwimmingSessions({ setActiveNav }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { label: 'Technique', emoji: '🎯', color: '#3b82f6', desc: 'Improve stroke efficiency and body position' },
    { label: 'Sprint', emoji: '⚡', color: '#eab308', desc: 'Short fast repeats for speed and power' },
    { label: 'Endurance', emoji: '🫀', color: '#22c55e', desc: 'Build aerobic swim fitness' },
    { label: 'Open Water', emoji: '🌊', color: '#06b6d4', desc: 'Sighting, pacing and continuous swimming' },
    { label: 'Recovery', emoji: '🌿', color: '#a855f7', desc: 'Easy sessions to loosen up' },
    { label: 'Race Prep', emoji: '🏁', color: '#ef4444', desc: 'Race pace and strong finishing' },
  ]

  if (selectedCategory) {
    return <SwimmingSessionDetail category={selectedCategory} setActiveNav={(nav: string) => {
      if (nav === 'swimming-plans') setSelectedCategory(null)
      else setActiveNav(nav)
    }} />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('swimming-hub')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Suggested Swimming Sessions</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose what you want to improve</p>

        {categories.map((cat) => (
          <div key={cat.label} onClick={() => setSelectedCategory(cat.label)} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${cat.color}10`, marginBottom: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{cat.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cat.label}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{cat.desc}</div>
            </div>
            <div style={{ color: cat.color, fontSize: '24px' }}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}
function LogRun({ setActiveNav, runningSessions, setRunningSessions, runningPRs, setRunningPRs, addSocialPost, triggerPRToast, setSessionComparison, setShowComparison }: any) {
  const [runType, setRunType] = useState('')
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [effort, setEffort] = useState('')
  const [surface, setSurface] = useState('')
  const [notes, setNotes] = useState('')
  const [elevationGain, setElevationGain] = useState('')
  const [saved, setSaved] = useState(false)

  const calculatePace = () => {
    const d = parseFloat(distance)
    const t = parseFloat(time)
    if (!d || !t) return '0:00'
    const pace = t / d
    const mins = Math.floor(pace)
    const secs = Math.round((pace - mins) * 60)
    return `${mins}:${secs.toString().padStart(2, '0')}/km`
  }

  const handleSave = async () => {
    const d = parseFloat(distance) || 0
    const t = parseFloat(time) || 0
    const pace = calculatePace()

    const newRun = {
      id: Date.now(),
      runType,
      distance: d,
      time: t,
      pace,
      effort,
      surface,
      notes,
      date: new Date().toISOString().split('T')[0]
    }

    setRunningSessions([newRun, ...runningSessions])

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('running_sessions').insert({
        user_id: session.user.id,
        run_type: runType,
        distance: d,
        time: t,
        pace,
        effort,
        surface,
        notes
      })
    }
    addSocialPost({
      sport: 'Running',
      sportColor: '#06b6d4',
      emoji: '🏃',
      caption: `Logged a ${d}km ${runType || 'run'} in ${t} mins at ${pace}.`
    })

    checkAchievement('running', d)

    const newPRs = [...runningPRs]

    const checkPR = (label: string, targetDistance: number) => {
      if (d >= targetDistance) {
        const existing = newPRs.find((pr: any) => pr.label === label)
        if (!existing || t < existing.time) {
          if (existing) {
            existing.time = t
            existing.pace = pace
            existing.date = 'Today'
          } else {
            newPRs.push({ label, distance: targetDistance, time: t, pace, date: 'Today' })
          }
        }
      }
    }

    checkPR('1K', 1)
    checkPR('5K', 5)
    checkPR('10K', 10)

    const newPRCount = newPRs.filter((pr: any) => {
      const existing = runningPRs.find((p: any) => p.label === pr.label)
      return !existing || pr.time < existing.time
    }).length

    setRunningPRs(newPRs)

    if (newPRCount > 0 && triggerPRToast) {
      const latestPR = newPRs[newPRs.length - 1]
      triggerPRToast(
        `🏆 New ${latestPR.label} PR!`,
        `${latestPR.time} mins at ${latestPR.pace}`,
        '🏃',
        '#06b6d4'
      )
    }

    // Generate comparison
    if (runningSessions.length > 0) {
      const prevRun = runningSessions[0] // most recent before this one
      if (prevRun && prevRun.distance === d) {
        const prevPace = prevRun.pace || '0:00/km'
        const newPace = pace
        const prevPaceSecs = (() => { const parts = prevPace.replace('/km','').split(':'); return parseInt(parts[0])*60 + parseInt(parts[1]||'0') })()
        const newPaceSecs = (() => { const parts = newPace.replace('/km','').split(':'); return parseInt(parts[0])*60 + parseInt(parts[1]||'0') })()
        const diff = prevPaceSecs - newPaceSecs
        if (diff !== 0) {
          setSessionComparison({
            sport: 'Running', emoji: '🏃', color: '#06b6d4',
            title: diff > 0 ? `You were ${diff} seconds faster! 🚀` : `${Math.abs(diff)} seconds slower — keep pushing!`,
            detail: `Previous: ${prevRun.distance}km at ${prevPace} · Today: ${d}km at ${newPace}`,
            improvement: diff > 0
          })
          setShowComparison(true)
          setTimeout(() => setShowComparison(false), 5000)
        }
      }
    }
    
    playHaptic()
    playSound('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('running-hub')} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log Run</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 28px' }}>Track distance, pace and effort</p>

        <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>RUN TYPE</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Easy Run', 'Tempo', 'Intervals', 'Long Run', 'Race'].map((type) => (
            <button key={type} onClick={() => setRunType(type)} style={{ background: runType === type ? '#06b6d420' : '#13131f', border: `1.5px solid ${runType === type ? '#06b6d4' : '#1e1e30'}`, borderRadius: '10px', color: runType === type ? '#06b6d4' : '#666', padding: '10px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
          ))}
        </div>

        {runType && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>DISTANCE KM</label>
                <input value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="5" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>TIME MINS</label>
                <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="25" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>CALCULATED PACE</div>
              <div style={{ color: '#06b6d4', fontSize: '26px', fontWeight: '900' }}>{calculatePace()}</div>
            </div>

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>EFFORT</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['Easy', 'Moderate', 'Hard', 'Max'].map((e) => (
                <button key={e} onClick={() => setEffort(e)} style={{ background: effort === e ? '#a855f720' : '#13131f', border: `1.5px solid ${effort === e ? '#a855f7' : '#1e1e30'}`, borderRadius: '20px', color: effort === e ? '#a855f7' : '#666', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{e}</button>
              ))}
            </div>

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>SURFACE</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['Road', 'Trail', 'Track', 'Treadmill'].map((s) => (
                <button key={s} onClick={() => setSurface(s)} style={{ background: surface === s ? '#22c55e20' : '#13131f', border: `1.5px solid ${surface === s ? '#22c55e' : '#1e1e30'}`, borderRadius: '20px', color: surface === s ? '#22c55e' : '#666', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{s}</button>
              ))}
            </div>

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>NOTES</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the run feel?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', marginBottom: '28px' }} />

            <button onClick={handleSave} style={{ width: '100%', background: saved ? '#0891b2' : 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px #06b6d440' }}>
              {saved ? '✓ Run Saved!' : 'Save Run'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function RunningStats({ setActiveNav, runningSessions, setRunningSessions, runningPRs }: any) {
  const totalRuns = runningSessions.length
  const totalDistance = runningSessions.reduce((sum: number, r: any) => sum + (r.distance || 0), 0)
  const totalTime = runningSessions.reduce((sum: number, r: any) => sum + (r.time || 0), 0)
  const averagePace = totalDistance ? totalTime / totalDistance : 0
  const avgMins = Math.floor(averagePace)
  const avgSecs = Math.round((averagePace - avgMins) * 60)
  const averagePaceText = totalDistance ? `${avgMins}:${avgSecs.toString().padStart(2, '0')}/km` : '0:00/km'
  const longestRun = runningSessions.reduce((max: number, r: any) => Math.max(max, r.distance || 0), 0)

  const runTypeCounts = runningSessions.reduce((acc: any, r: any) => {
    if (r.runType) acc[r.runType] = (acc[r.runType] || 0) + 1
    return acc
  }, {})

  const favouriteRun = Object.keys(runTypeCounts).sort((a, b) => runTypeCounts[b] - runTypeCounts[a])[0] || 'None yet'

  const handleDeleteSession = async (sessionId: any) => {
    setRunningSessions(runningSessions.filter((r: any) => r.id !== sessionId))
    await supabase.from('running_sessions').delete().eq('id', sessionId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('running-hub')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Running Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your running progress from logged runs</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Runs', value: totalRuns, color: '#06b6d4' },
            { label: 'Distance', value: `${totalDistance.toFixed(1)} km`, color: '#22c55e' },
            { label: 'Time', value: `${totalTime} min`, color: '#eab308' },
            { label: 'Avg Pace', value: averagePaceText, color: '#a855f7' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '700' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#06b6d4', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>📅 THIS SEASON</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'Runs', value: totalRuns, color: '#06b6d4' },
              { label: 'Total km', value: `${totalDistance.toFixed(1)}`, color: '#22c55e' },
              { label: 'Avg Pace', value: averagePaceText, color: '#a855f7' },
              { label: 'Total Time', value: `${totalTime}m`, color: '#eab308' },
              { label: 'Longest', value: `${longestRun.toFixed(1)}km`, color: '#f97316' },
              { label: 'Km/Run', value: totalRuns > 0 ? (totalDistance / totalRuns).toFixed(1) : '0', color: '#06b6d4' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '18px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '3px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '900', marginBottom: '16px' }}>📈 WEEKLY LOAD — LAST 6 WEEKS</div>
          {(() => {
            const weeks: { label: string, km: number }[] = []
            for (let i = 5; i >= 0; i--) {
              const weekStart = new Date()
              weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7)
              weekStart.setHours(0, 0, 0, 0)
              const weekEnd = new Date(weekStart)
              weekEnd.setDate(weekEnd.getDate() + 7)
              const km = runningSessions.filter((s: any) => {
                const d = new Date(s.date)
                return d >= weekStart && d < weekEnd
              }).reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
              weeks.push({ label: `W${6 - i}`, km })
            }
            const max = Math.max(...weeks.map(w => w.km), 1)
            return (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                {weeks.map((week, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: '800' }}>{week.km > 0 ? `${week.km.toFixed(0)}` : ''}</div>
                    <div style={{ width: '100%', background: week.km > 0 ? 'linear-gradient(180deg, #a855f7, #7c3aed)' : '#1e1e30', borderRadius: '6px 6px 0 0', height: `${Math.max((week.km / max) * 60, week.km > 0 ? 8 : 4)}px` }} />
                    <div style={{ fontSize: '10px', color: '#555', fontWeight: '600' }}>{week.label}</div>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
        
        <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>Run Breakdown</h2>

        {runningSessions.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, #13131f, #10101a)', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#eab308', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🏆 PERSONAL BESTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Longest Run', value: `${longestRun.toFixed(1)} km`, emoji: '🛣️', color: '#06b6d4' },
                { label: 'Fastest Pace', value: (() => {
                  const fastest = runningSessions.reduce((best: any, r: any) => {
                    if (!r.pace || r.pace === '0:00/km') return best
                    if (!best) return r
                    const toSecs = (p: string) => {
                      const parts = p.replace('/km','').split(':')
                      return parseInt(parts[0]) * 60 + parseInt(parts[1] || '0')
                    }
                    return toSecs(r.pace) < toSecs(best.pace) ? r : best
                  }, null)
                  return fastest?.pace || 'No data'
                })(), emoji: '⚡', color: '#22c55e' },
                { label: 'Most km in a Week', value: (() => {
                  const weeks: Record<string, number> = {}
                  runningSessions.forEach((r: any) => {
                    if (!r.date) return
                    const d = new Date(r.date)
                    const weekKey = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`
                    weeks[weekKey] = (weeks[weekKey] || 0) + (r.distance || 0)
                  })
                  const max = Math.max(...Object.values(weeks), 0)
                  return max > 0 ? `${max.toFixed(1)} km` : 'No data'
                })(), emoji: '📅', color: '#f97316' },
                { label: 'Best Run Type', value: favouriteRun, emoji: '🏃', color: '#a855f7' },
              ].map((pb) => (
                <div key={pb.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0f', border: `1px solid ${pb.color}20`, borderRadius: '12px', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{pb.emoji}</span>
                    <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>{pb.label}</span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: pb.color }}>{pb.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {[
          { label: 'Longest Run', value: `${longestRun.toFixed(1)} km`, color: '#06b6d4' },
          { label: 'Favourite Type', value: favouriteRun, color: '#22c55e' },
          { label: 'Personal Records', value: runningPRs.length, color: '#f59e0b' },
        ].map((item) => (
          <div key={item.label} style={{ background: '#13131f', borderLeft: `4px solid ${item.color}`, borderRadius: '14px', padding: '14px 18px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{ fontWeight: '700' }}>{item.label}</span>
            <span style={{ color: item.color, fontWeight: '800', textAlign: 'right' }}>{item.value}</span>
          </div>
        ))}

        {runningSessions.length > 0 && (
          <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#06b6d4', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🏃 RUN TYPE BREAKDOWN</div>
            {(['Easy Run', 'Tempo', 'Intervals', 'Long Run', 'Race'] as const).map((type) => {
              const count = runningSessions.filter((r: any) => r.runType === type).length
              const km = runningSessions.filter((r: any) => r.runType === type).reduce((sum: number, r: any) => sum + (r.distance || 0), 0)
              const percent = totalRuns > 0 ? Math.round((count / totalRuns) * 100) : 0
              const colors: Record<string, string> = { 'Easy Run': '#22c55e', 'Tempo': '#f97316', 'Intervals': '#ef4444', 'Long Run': '#06b6d4', 'Race': '#eab308' }
              const color = colors[type]
              if (count === 0) return null
              return (
                <div key={type} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                    <span style={{ color: '#aaa', fontWeight: '700' }}>{type}</span>
                    <span style={{ color: '#666' }}>{count} runs · {km.toFixed(1)}km · {percent}%</span>
                  </div>
                  <div style={{ height: '7px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: '999px' }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>Recent Runs</h2>

        {runningSessions.length === 0 ? (
          <div onClick={() => setActiveNav('log-run')} style={{ background: '#13131f', border: '1px solid #06b6d425', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏃</div>
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#06b6d4' }}>Ready to start running?</div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Track your first run to see stats here</div>
            <span style={{ background: '#06b6d415', border: '1px solid #06b6d440', borderRadius: '20px', color: '#06b6d4', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Run →</span>
          </div>
        ) : (
          runningSessions.slice(0, 8).map((run: any) => (
            <div key={run.id} style={{ background: '#13131f', border: '1px solid #1e1e30', borderLeft: '4px solid #06b6d4', borderRadius: '14px', padding: '14px 18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong>{run.runType}</strong>
                  <span style={{ color: '#06b6d4', fontWeight: '800' }}>{run.distance} km</span>
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>{run.time} min · {run.pace} · {run.surface || 'No surface'}</div>
              </div>
              <button onClick={() => handleDeleteSession(run.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function RunningPRs({ setActiveNav, runningPRs }: any) {
  const prTargets = ['1K', '5K', '10K']

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('running-hub')} style={{ background: 'none', border: 'none', color: '#22c55e', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Running PRs</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your fastest recorded distances</p>

        {prTargets.map((target) => {
          const pr = runningPRs.find((p: any) => p.label === target)

          return (
            <div key={target} style={{ background: '#13131f', border: `1px solid ${pr ? '#22c55e25' : '#1e1e30'}`, borderLeft: `4px solid ${pr ? '#22c55e' : '#444'}`, borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: '900' }}>{target}</div>
                  <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                    {pr ? `Set ${pr.date}` : 'No record yet'}
                  </div>
                </div>

                {pr ? (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#22c55e', fontSize: '22px', fontWeight: '900' }}>{pr.time} min</div>
                    <div style={{ color: '#888', fontSize: '12px' }}>{pr.pace}</div>
                  </div>
                ) : (
                  <div style={{ color: '#444', fontSize: '13px', fontWeight: '700' }}>
                    Log a run
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '16px', padding: '18px', marginTop: '22px' }}>
          <div style={{ fontWeight: '800', marginBottom: '8px' }}>How PRs work</div>
          <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
            Log a run of at least 1K, 5K or 10K. SportSync will automatically save it as a PR if it is your fastest time for that distance.
          </p>
        </div>
      </div>
    </div>
  )
}

function RunningSessionDetail({ category, setActiveNav }: any) {
  const content: Record<string, any> = {
    Speed: {
      emoji: '⚡',
      color: '#eab308',
      sessions: [
        { name: '10 x 200m Fast Repeats', setup: 'Run 200m fast, then walk or jog 200m recovery.', reps: '10 rounds', tip: 'Stay relaxed. Speed work should feel quick, not tense. Keep your shoulders loose.' },
        { name: '6 x 400m Intervals', setup: 'Run 400m hard, rest 90 seconds between reps.', reps: '6 rounds', tip: 'Aim for even splits. Do not sprint the first rep and fade badly.' },
        { name: 'Hill Sprint Power', setup: 'Find a short hill. Sprint up for 12–15 seconds, walk back down.', reps: '8 reps', tip: 'Drive your knees and arms. Hills build power with less impact than flat sprinting.' },
      ]
    },
    Endurance: {
      emoji: '🫀',
      color: '#22c55e',
      sessions: [
        { name: 'Easy Aerobic Builder', setup: 'Run at a pace where you can hold a conversation.', reps: '30–60 mins', tip: 'Most runners go too hard on easy days. Easy running builds your engine.' },
        { name: 'Progression Run', setup: 'Start easy, then gradually increase pace every 10 minutes.', reps: '30–45 mins', tip: 'Finish strong but controlled. You should not be sprinting at the end.' },
        { name: 'Long Run Foundation', setup: 'Run your longest weekly run at relaxed effort.', reps: '45–90 mins', tip: 'Long runs build endurance, confidence and mental toughness.' },
      ]
    },
    '5K': {
      emoji: '🏁',
      color: '#06b6d4',
      sessions: [
        { name: '5K Pace Repeats', setup: 'Run 1km at goal 5K pace, then jog 2 minutes.', reps: '4–5 reps', tip: 'This teaches your body what race pace feels like without racing the full distance.' },
        { name: 'Fast Finish 5K Prep', setup: 'Run 20 minutes easy, then 5 minutes hard.', reps: '1 session', tip: 'Great for learning how to push when tired near the end of a race.' },
        { name: 'Parkrun Simulation', setup: 'Run 5K at strong but controlled effort.', reps: '1 x 5K', tip: 'Do not go all-out every time. Use this to practise pacing.' },
      ]
    },
    '10K': {
      emoji: '🏃',
      color: '#ec4899',
      sessions: [
        {
          name: '2 x 3K Tempo',
          setup: 'Run 3km at comfortably hard pace. Recover 3 minutes. Repeat.',
          reps: '2 rounds',
          tip: 'You should be breathing hard but still in control.'
        },
        {
          name: '10K Pace Builder',
          setup: 'Run 5 x 1km at goal 10K pace with 90 seconds easy jogging between reps.',
          reps: '5 rounds',
          tip: 'Focus on consistency. Every kilometre should feel similar.'
        },
        {
          name: 'Long Aerobic Run',
          setup: 'Run 60–90 minutes at relaxed effort to build the engine needed for 10K.',
          reps: '1 long run',
          tip: 'Most 10K improvement comes from building aerobic fitness, not sprinting.'
        },
        {
          name: 'Negative Split Run',
          setup: 'Run 6–10km where the second half is faster than the first half.',
          reps: '1 run',
          tip: 'This teaches pacing and helps you finish races strong.'
        },
        {
          name: 'Threshold Progression',
          setup: 'Run 8km total, increasing your pace every 2km.',
          reps: '8km total',
          tip: 'You are training yourself to run faster while staying relaxed.'
        }
      ]
    },
    'Half Marathon': {
      emoji: '🏅',
      color: '#14b8a6',
      sessions: [
        {
          name: 'Half Marathon Long Run',
          setup: 'Run 14–20km at relaxed conversational pace.',
          reps: '1 run',
          tip: 'These runs build the endurance needed to complete the race comfortably.'
        },
        {
          name: 'Race Pace Blocks',
          setup: 'Run 3 x 3km at target half marathon pace with 3 minutes easy jogging.',
          reps: '3 rounds',
          tip: 'Learn exactly what your target pace feels like.'
        },
        {
          name: 'Fast Finish Long Run',
          setup: 'Run easy for 75% of the session then finish the final 25% at race pace.',
          reps: '12–18km',
          tip: 'Simulates the challenge of holding pace on tired legs.'
        },
        {
          name: 'Tempo Endurance Run',
          setup: 'Run 6–10km at comfortably hard effort.',
          reps: '1 run',
          tip: 'Improves lactate threshold and race pace sustainability.'
        },
        {
          name: 'Half Marathon Simulation',
          setup: 'Run 16–18km including 8km at race pace.',
          reps: '1 session',
          tip: 'Builds confidence before race day.'
        }
      ]
    },
    Recovery: {
      emoji: '🌿',
      color: '#a855f7',
      sessions: [
        { name: 'Gentle Shakeout', setup: 'Very easy jog to loosen your legs.', reps: '15–25 mins', tip: 'This should feel almost too easy. The goal is recovery, not fitness.' },
        { name: 'Run-Walk Recovery', setup: 'Alternate 3 minutes jogging with 1 minute walking.', reps: '20–30 mins', tip: 'Useful after hard sessions, races or when you feel tired.' },
        { name: 'Mobility + Easy Jog', setup: 'Do 8 minutes mobility, then easy jog.', reps: '20 mins jog', tip: 'Focus on ankles, calves, hips and hamstrings before running.' },
      ]
    },
    Strength: {
      emoji: '💪',
      color: '#f97316',
      sessions: [
        { name: 'Runner Leg Strength', setup: 'Squats, lunges, calf raises and glute bridges.', reps: '3 rounds', tip: 'Strong legs protect your knees and improve running economy.' },
        { name: 'Core Stability Circuit', setup: 'Plank, side plank, dead bugs and mountain climbers.', reps: '3 rounds', tip: 'A strong core keeps your form stable when you get tired.' },
        { name: 'Single-Leg Control', setup: 'Single-leg squats, step-downs and balance holds.', reps: '3 sets each leg', tip: 'Running is basically repeated single-leg landing. Train each leg properly.' },
      ]
    },
  }

  const cat = content[category]
  if (!cat) return null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('running-plans')} style={{ background: 'none', border: 'none', color: cat.color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>{cat.emoji} {category}</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Useful running sessions for this focus</p>

        {cat.sessions.map((s: any) => (
          <div key={s.name} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
            <div style={{ fontWeight: '900', fontSize: '16px', marginBottom: '8px' }}>{s.name}</div>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: '0 0 10px' }}>{s.setup}</p>
            <span style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: '20px', color: cat.color, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>📋 {s.reps}</span>
            <div style={{ background: '#0a0a0f', borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${cat.color}`, marginTop: '10px' }}>
              <span style={{ fontSize: '11px', color: cat.color, fontWeight: '700' }}>💡 COACHING TIP </span>
              <span style={{ fontSize: '12px', color: '#888' }}>{s.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuggestedRunningSessions({ setActiveNav }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { label: 'Speed', emoji: '⚡', color: '#eab308', desc: 'Intervals, hills and faster running' },
    { label: 'Endurance', emoji: '🫀', color: '#22c55e', desc: 'Easy runs, long runs and aerobic base' },
    { label: '5K', emoji: '🏁', color: '#06b6d4', desc: 'Sessions to improve your 5K time' },
    { label: '10K', emoji: '🏃', color: '#ec4899', desc: 'Build endurance and improve your 10K time' },
    { label: 'Half Marathon', emoji: '🏅', color: '#14b8a6', desc: 'Build endurance for 21.1km racing' },
    { label: 'Recovery', emoji: '🌿', color: '#a855f7', desc: 'Easy runs and low-stress movement' },
    { label: 'Strength', emoji: '💪', color: '#f97316', desc: 'Gym and bodyweight work for runners' },
  ]

  if (selectedCategory) {
    return <RunningSessionDetail category={selectedCategory} setActiveNav={(nav: string) => {
      if (nav === 'running-plans') setSelectedCategory(null)
      else setActiveNav(nav)
    }} />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('running-hub')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Suggested Running Sessions</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose what you want to improve</p>

        {categories.map((cat) => (
          <div key={cat.label} onClick={() => setSelectedCategory(cat.label)} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${cat.color}10`, marginBottom: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{cat.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cat.label}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{cat.desc}</div>
            </div>
            <div style={{ color: cat.color, fontSize: '24px' }}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}
function TennisStats({ setActiveNav, tennisSessions, setTennisSessions, tennisResults }: { setActiveNav: (nav: string) => void, tennisSessions: any[], setTennisSessions: any, tennisResults: any[] }) {
  const totalSessions = tennisSessions.length
  const totalMinutes = tennisSessions.reduce((sum, s) => sum + (s.duration || 0), 0)
  const totalServes = tennisSessions.reduce((sum, s) => sum + (s.serves || 0), 0)
  const totalForehands = tennisSessions.reduce((sum, s) => sum + (s.forehands || 0), 0)
  const totalBackhands = tennisSessions.reduce((sum, s) => sum + (s.backhands || 0), 0)
  const totalVolleys = tennisSessions.reduce((sum, s) => sum + (s.volleys || 0), 0)

  const wins = tennisResults.filter(r => r.outcome === 'win').length
  const losses = tennisResults.filter(r => r.outcome === 'loss').length
  const totalMatches = tennisResults.length
  const winRate = totalMatches ? Math.round((wins / totalMatches) * 100) : 0

  const totalAces = tennisResults.reduce((sum, r) => sum + (r.aces || 0), 0)
  const totalDoubleFaults = tennisResults.reduce((sum, r) => sum + (r.doubleFaults || 0), 0)

  const focusCounts = tennisSessions.reduce((acc: any, s) => {
    if (s.focus) acc[s.focus] = (acc[s.focus] || 0) + 1
    return acc
  }, {})


  const favouriteFocus = Object.keys(focusCounts).sort((a, b) => focusCounts[b] - focusCounts[a])[0] || 'None yet'

const headToHead = tennisResults.reduce((acc: any, r) => {
  if (!r.opponent) return acc
  if (!acc[r.opponent]) acc[r.opponent] = { wins: 0, losses: 0 }
  if (r.outcome === 'win') acc[r.opponent].wins++
  else acc[r.opponent].losses++
  return acc
}, {})
const h2hList = Object.entries(headToHead).map(([opponent, record]: any) => ({ opponent, ...record })).sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses))

  const streak = (() => {
    if (!tennisResults || tennisResults.length === 0) return null
    let count = 1
    const first = tennisResults[0].outcome
    for (let i = 1; i < tennisResults.length; i++) {
      if (tennisResults[i].outcome === first) count++
      else break
    }
    return { type: first, count }
  })()
  
  const handleDeleteSession = async (sessionId: any) => {
    setTennisSessions(tennisSessions.filter((s: any) => s.id !== sessionId))
    await supabase.from('tennis_sessions').delete().eq('id', sessionId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('tennis-hub')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Tennis Stats</h1>
{streak && (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: streak.type === 'win' ? '#22c55e15' : '#ef444415', border: `1px solid ${streak.type === 'win' ? '#22c55e40' : '#ef444440'}`, borderRadius: '20px', padding: '6px 14px', marginBottom: '16px' }}>
    <span style={{ fontSize: '16px' }}>{streak.type === 'win' ? '🔥' : '❄️'}</span>
    <span style={{ fontSize: '13px', fontWeight: '800', color: streak.type === 'win' ? '#22c55e' : '#ef4444' }}>
      {streak.count} {streak.type.toUpperCase()} STREAK
    </span>
  </div>
)}
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px' }}>Your tennis progress from logged sessions</p>


        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Sessions', value: totalSessions, color: '#eab308' },
            { label: 'Minutes', value: totalMinutes, color: '#06b6d4' },
            { label: 'Matches', value: totalMatches, color: '#22c55e' },
            { label: 'Win Rate', value: `${winRate}%`, color: '#a855f7' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '700' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#13131f', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#eab308', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>📅 THIS SEASON</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'Sessions', value: totalSessions, color: '#eab308' },
              { label: 'Hours', value: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`, color: '#06b6d4' },
              { label: 'Matches', value: totalMatches, color: '#22c55e' },
              { label: 'Wins', value: wins, color: '#22c55e' },
              { label: 'Losses', value: losses, color: '#ef4444' },
              { label: 'Win Rate', value: `${winRate}%`, color: '#a855f7' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '18px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '3px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {h2hList.length > 0 && (
  <div style={{ background: '#13131f', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
    <div style={{ color: '#eab308', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🎾 HEAD-TO-HEAD RECORDS</div>
    {h2hList.map((h: any) => (
      <div key={h.opponent} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e1e30' }}>
        <span style={{ fontWeight: '700', fontSize: '14px' }}>{h.opponent}</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: '#22c55e', fontWeight: '800', fontSize: '13px' }}>{h.wins}W</span>
          <span style={{ color: '#555', fontSize: '12px' }}>–</span>
          <span style={{ color: '#ef4444', fontWeight: '800', fontSize: '13px' }}>{h.losses}L</span>
        </div>
      </div>
    ))}
  </div>
)}
        
        <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '900', marginBottom: '16px' }}>📈 WEEKLY LOAD — LAST 6 WEEKS</div>
          {(() => {
            const weeks: { label: string, count: number }[] = []
            for (let i = 5; i >= 0; i--) {
              const weekStart = new Date()
              weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7)
              weekStart.setHours(0, 0, 0, 0)
              const weekEnd = new Date(weekStart)
              weekEnd.setDate(weekEnd.getDate() + 7)
              const count = tennisSessions.filter((s: any) => {
                const d = new Date(s.date)
                return d >= weekStart && d < weekEnd
              }).length
              weeks.push({ label: `W${6 - i}`, count })
            }
            const max = Math.max(...weeks.map(w => w.count), 1)
            return (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                {weeks.map((week, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: '800' }}>{week.count > 0 ? week.count : ''}</div>
                    <div style={{ width: '100%', background: week.count > 0 ? 'linear-gradient(180deg, #eab308, #ca8a04)' : '#1e1e30', borderRadius: '6px 6px 0 0', height: `${Math.max((week.count / max) * 60, week.count > 0 ? 8 : 4)}px` }} />
                    <div style={{ fontSize: '10px', color: '#555', fontWeight: '600' }}>{week.label}</div>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
        
        {tennisSessions.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, #13131f, #10101a)', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#eab308', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🏆 PERSONAL BESTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Most Serves in a Session', value: Math.max(...tennisSessions.map((s: any) => s.serves || 0)), emoji: '🎯', color: '#eab308' },
                { label: 'Most Forehands in a Session', value: Math.max(...tennisSessions.map((s: any) => s.forehands || 0)), emoji: '💥', color: '#22c55e' },
                { label: 'Longest Session', value: `${Math.max(...tennisSessions.map((s: any) => s.duration || 0))} mins`, emoji: '⏱️', color: '#06b6d4' },
                { label: 'Total Aces', value: totalAces, emoji: '🏆', color: '#a855f7' },
                { label: 'Favourite Focus', value: favouriteFocus, emoji: '🎾', color: '#f97316' },
              ].map((pb) => (
                <div key={pb.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0f', border: `1px solid ${pb.color}20`, borderRadius: '12px', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{pb.emoji}</span>
                    <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>{pb.label}</span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: pb.color }}>{pb.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>Shot Volume</h2>
        {[
          { label: 'Serves', value: totalServes, color: '#eab308' },
          { label: 'Forehands', value: totalForehands, color: '#22c55e' },
          { label: 'Backhands', value: totalBackhands, color: '#06b6d4' },
          { label: 'Volleys', value: totalVolleys, color: '#f97316' },
        ].map((item) => (
          <div key={item.label} style={{ background: '#13131f', borderLeft: `4px solid ${item.color}`, borderRadius: '14px', padding: '14px 18px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '700' }}>{item.label}</span>
            <span style={{ color: item.color, fontWeight: '800' }}>{item.value}</span>
          </div>
        ))}

        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>Match Stats</h2>
        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#aaa' }}>Record</span>
            <strong>{wins}W - {losses}L</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#aaa' }}>Aces</span>
            <strong>{totalAces}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#aaa' }}>Double Faults</span>
            <strong>{totalDoubleFaults}</strong>
          </div>
        </div>

        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>Training Insight</h2>
        <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '16px', padding: '18px' }}>
          <div style={{ fontWeight: '800', marginBottom: '8px' }}>Favourite Focus: {favouriteFocus}</div>
          <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
            Keep logging sessions and matches here. Your stats will update automatically from the data you enter.
          </p>
        </div>

        {tennisSessions.length > 0 && (
          <div style={{ background: '#13131f', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#eab308', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🎾 SESSION TYPE BREAKDOWN</div>
            {(['Practice', 'Singles Match', 'Doubles Match', 'Coaching'] as const).map((type) => {
              const count = tennisSessions.filter((s: any) => s.sessionType === type).length
              const percent = totalSessions > 0 ? Math.round((count / totalSessions) * 100) : 0
              const colors: Record<string, string> = { 'Practice': '#eab308', 'Singles Match': '#22c55e', 'Doubles Match': '#06b6d4', 'Coaching': '#a855f7' }
              const color = colors[type]
              if (count === 0) return null
              return (
                <div key={type} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                    <span style={{ color: '#aaa', fontWeight: '700' }}>{type}</span>
                    <span style={{ color: '#666' }}>{count} sessions · {percent}%</span>
                  </div>
                  <div style={{ height: '7px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: '999px' }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tennisResults.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Recent Match Results</h2>
            {tennisResults.slice(0, 5).map((r: any, i: number) => {
              const outcomeColor = r.outcome === 'win' ? '#22c55e' : '#ef4444'
              return (
                <div key={i} style={{ background: '#13131f', border: `1px solid ${outcomeColor}25`, borderLeft: `4px solid ${outcomeColor}`, borderRadius: '14px', padding: '14px 16px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '14px' }}>vs {r.opponent}</div>
                      <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{r.type} · {r.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '900', fontSize: '18px' }}>{r.score}</div>
                      <span style={{ background: outcomeColor, color: 'white', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '20px' }}>{r.outcome.toUpperCase()}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {r.aces > 0 && <span style={{ fontSize: '11px', color: '#aaa' }}>🎯 {r.aces} aces</span>}
                    {r.doubleFaults > 0 && <span style={{ fontSize: '11px', color: '#aaa' }}>⚠️ {r.doubleFaults} DFs</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>Recent Sessions</h2>
        {tennisSessions.length === 0 ? (
          <div onClick={() => setActiveNav('log-tennis-session')} style={{ background: '#13131f', border: '1px solid #eab30825', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎾</div>
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#eab308' }}>Ready to hit the court?</div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first tennis session to see stats here</div>
            <span style={{ background: '#eab30815', border: '1px solid #eab30840', borderRadius: '20px', color: '#eab308', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Session →</span>
          </div>
        ) : (
          tennisSessions.slice(0, 8).map((s: any) => (
            <div key={s.id} style={{ background: '#13131f', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '14px', padding: '14px 16px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '14px' }}>{s.sessionType || 'Tennis Session'}{s.focus ? ` · ${s.focus}` : ''}</div>
                <div style={{ color: '#666', fontSize: '12px', marginBottom: '6px' }}>{s.duration || 0} mins · {s.date || 'No date'}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {s.focus && (
                  <span style={{ background: '#eab30815', border: '1px solid #eab30830', borderRadius: '20px', color: '#eab308', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{s.focus}</span>
                )}
                {s.serves > 0 && (
                  <span style={{ background: '#22c55e15', border: '1px solid #22c55e30', borderRadius: '20px', color: '#22c55e', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>🎯 {s.serves} serves</span>
                )}
                {s.forehands > 0 && (
                  <span style={{ background: '#06b6d415', border: '1px solid #06b6d430', borderRadius: '20px', color: '#06b6d4', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>💥 {s.forehands} FH</span>
                )}
                {s.sessionType && (
                  <span style={{ background: '#a855f715', border: '1px solid #a855f730', borderRadius: '20px', color: '#a855f7', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{s.sessionType}</span>
                )}
                {s.notes && (
                  <span style={{ background: '#1e1e30', borderRadius: '20px', color: '#555', fontSize: '10px', fontWeight: '600', padding: '3px 8px' }}>"{s.notes}"</span>
                )}
              </div>
              </div>
              <button onClick={() => handleDeleteSession(s.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
function SuggestedTennisDrills({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { label: 'Serve', emoji: '🎯', color: '#eab308', desc: 'Power, placement, second serves and serve patterns' },
    { label: 'Forehand', emoji: '💥', color: '#22c55e', desc: 'Topspin, consistency, depth and attacking shots' },
    { label: 'Backhand', emoji: '🎾', color: '#06b6d4', desc: 'Crosscourt rallies, slices and defensive recovery' },
    { label: 'Footwork', emoji: '👟', color: '#a855f7', desc: 'Split step, recovery, court coverage and agility' },
    { label: 'Volleys', emoji: '🕸️', color: '#f97316', desc: 'Net play, reactions, approach shots and finishing' },
    { label: 'Tactics', emoji: '🧠', color: '#ef4444', desc: 'Point construction, serve plus one and percentage tennis' },
  ]

  if (selectedCategory) {
    return <TennisDrillDetail category={selectedCategory} setActiveNav={(nav) => {
      if (nav === 'suggested-tennis-drills') setSelectedCategory(null)
      else setActiveNav(nav)
    }} />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('tennis-hub')} style={{ background: 'none', border: 'none', color: '#eab308', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Suggested Tennis Drills</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose an area to improve</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {categories.map((cat) => (
            <div key={cat.label} onClick={() => setSelectedCategory(cat.label)} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${cat.color}10` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{cat.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cat.label}</div>
                <div style={{ color: '#666', fontSize: '13px' }}>{cat.desc}</div>
              </div>
              <div style={{ color: cat.color, fontSize: '24px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function SuggestedDrills({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { label: 'Shooting', emoji: '⚽', color: '#22c55e', desc: 'Finishing, long shots, penalties, 1v1' },
    { label: 'Passing', emoji: '👟', color: '#06b6d4', desc: 'Short, long, through balls and combinations' },
    { label: 'Dribbling', emoji: '🔄', color: '#a855f7', desc: 'Close control, beating defenders, speed' },
    { label: 'Agility', emoji: '⚡', color: '#eab308', desc: 'Ladder work, change of direction, explosiveness' },
    { label: 'Defending', emoji: '🛡️', color: '#ef4444', desc: 'Positioning, tackling, pressing and aerials' },
    { label: 'Set Pieces', emoji: '🎯', color: '#f97316', desc: 'Free kicks, corners and throw-ins' },
  ]

  if (selectedCategory) {
    return <DrillDetail category={selectedCategory} setActiveNav={(nav) => {
      if (nav === 'suggested-drills') setSelectedCategory(null)
      else setActiveNav(nav)
    }} />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('football-hub')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Suggested Drills</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Select an area to work on</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {categories.map((cat) => (
            <div key={cat.label} onClick={() => setSelectedCategory(cat.label)} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${cat.color}10` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{cat.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cat.label}</div>
                <div style={{ color: '#666', fontSize: '13px' }}>{cat.desc}</div>
              </div>
              <div style={{ color: cat.color, fontSize: '24px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProfilePage({ setActiveNav, footballSessions, tennisSessions, runningSessions, swimmingSessions, basketballSessions, boxingSessions, cyclingSessions, golfSessions, rugbySessions, cricketSessions, avatarUrl, setAvatarUrl, displayName, setDisplayName, user, lightMode, setLightMode }: any) {
  const [activeNav, setActiveNavLocal] = useState('profile')
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(displayName || '')
  const [uploading, setUploading] = useState(false)
  const [position, setPosition] = useState('Forward')
  const [bio, setBio] = useState(
    localStorage.getItem('userBio') || 'Multi-sport athlete 🎾🏃🏊'
  )
  const [editingBio, setEditingBio] = useState(false)
  const [distanceUnit, setDistanceUnit] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('distanceUnit') || 'metric' : 'metric')
const [weightUnit, setWeightUnit] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('weightUnit') || 'metric' : 'metric')
const [pushNotifs, setPushNotifs] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('pushNotifs') !== 'false' : true)
const [soundEnabled, setSoundEnabled] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('soundEnabled') !== 'false' : true)
const [hapticEnabled, setHapticEnabled] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('hapticEnabled') !== 'false' : true)
const [emailReports, setEmailReports] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('emailReports') === 'true' : false)
  const [editingPosition, setEditingPosition] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'achievements' | 'settings'>('overview')

useEffect(() => {
  const loadProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (data) setProfile(data)
    }
  }
  loadProfile()
}, [])

const recentActivity = [
  ...(footballSessions || []).slice(0, 2).map((s: any) => ({
    sport: 'Football',
    title: s.sessionType || s.session_type || 'Football Session',
    detail: `${s.duration || 0} mins · ${s.goals || 0} goals · ${s.assists || 0} assists`,
    date: s.date || 'Recent',
    color: '#22c55e',
    emoji: '⚽'
  })),
  ...tennisSessions.slice(0, 2).map((s: any) => ({
    sport: 'Tennis',
    title: `${s.sessionType || 'Tennis Session'}${s.focus ? ' · ' + s.focus : ''}`,
    detail: `${s.duration || 0} mins · ${s.serves || 0} serves · ${s.forehands || 0} forehands`,
    date: s.date || 'Today',
    color: '#eab308',
    emoji: '🎾'
  })),
  ...runningSessions.slice(0, 2).map((r: any) => ({
    sport: 'Running',
    title: `${r.distance || 0}km ${r.runType || 'Run'}`,
    detail: `${r.time || 0} mins · ${r.pace || '0:00/km'} · ${r.surface || 'No surface'}`,
    date: r.date || 'Today',
    color: '#06b6d4',
    emoji: '🏃'
  })),
  ...swimmingSessions.slice(0, 2).map((s: any) => ({
    sport: 'Swimming',
    title: `${s.distance || 0}m ${s.stroke || 'Swim'}`,
    detail: `${s.time || 0} mins · ${s.lengths || 0} lengths · ${s.pace || '0:00/100m'}`,
    date: s.date || 'Today',
    color: '#3b82f6',
    emoji: '🏊'
  })),
  ...basketballSessions.slice(0, 1).map((s: any) => ({
    sport: 'Basketball',
    title: s.sessionType || 'Basketball Session',
    detail: `${s.duration || 0} mins · ${s.points || 0} pts`,
    date: s.date || 'Recent',
    color: '#f97316',
    emoji: '🏀'
  })),
  ...boxingSessions.slice(0, 1).map((s: any) => ({
    sport: 'Boxing',
    title: s.sessionType || 'Boxing Session',
    detail: `${s.duration || 0} mins · ${s.rounds || 0} rounds`,
    date: s.date || 'Recent',
    color: '#ef4444',
    emoji: '🥊'
  })),
  ...cyclingSessions.slice(0, 1).map((s: any) => ({
    sport: 'Cycling',
    title: s.rideType || 'Ride',
    detail: `${s.distance || 0}km · ${s.duration || 0} mins`,
    date: s.date || 'Recent',
    color: '#10b981',
    emoji: '🚴'
  })),
  ...golfSessions.slice(0, 1).map((s: any) => ({
    sport: 'Golf',
    title: s.session_type || 'Golf Session',
    detail: `${s.holes || 0} holes · Score ${s.score || '-'}`,
    date: s.date || 'Recent',
    color: '#84cc16',
    emoji: '⛳'
  })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8)

  const allLoggedSessions = [
    ...tennisSessions.map((s: any) => ({ ...s, sport: 'Tennis' })),
    ...runningSessions.map((s: any) => ({ ...s, sport: 'Running' })),
    ...swimmingSessions.map((s: any) => ({ ...s, sport: 'Swimming' })),
    ...basketballSessions.map((s: any) => ({ ...s, sport: 'Basketball' })),
    ...boxingSessions.map((s: any) => ({ ...s, sport: 'Boxing' })),
    ...cyclingSessions.map((s: any) => ({ ...s, sport: 'Cycling' })),
    ...golfSessions.map((s: any) => ({ ...s, sport: 'Golf' })),
    ...rugbySessions.map((s: any) => ({ ...s, sport: 'Rugby' })),
    ...cricketSessions.map((s: any) => ({ ...s, sport: 'Cricket' })),
  ]
  
  const thisWeekSessions = allLoggedSessions.length
  
  const currentStreak = allLoggedSessions.length > 0 ? Math.min(allLoggedSessions.length, 7) : 0
  const bestStreak = allLoggedSessions.length > 0 ? Math.max(currentStreak, Math.min(allLoggedSessions.length + 2, 14)) : 0
  const totalSessions =
  (footballSessions || []).length +
  tennisSessions.length +
  runningSessions.length +
  swimmingSessions.length +
  basketballSessions.length +
  boxingSessions.length +
  cyclingSessions.length +
  golfSessions.length +
  rugbySessions.length +
  cricketSessions.length

const totalRunningKm = runningSessions.reduce(
  (sum: number, r: any) => sum + (r.distance || 0),
  0
)

const totalSwimmingKm = swimmingSessions.reduce(
  (sum: number, s: any) => sum + ((s.distance || 0) / 1000),
  0
)

const totalServes = tennisSessions.reduce(
  (sum: number, s: any) => sum + (s.serves || 0),
  0
)
const getWeekKey = (dateStr: string) => {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return null
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d)
  monday.setDate(diff)
  return monday.toISOString().split('T')[0]
}

const weeklyBuckets: Record<string, number> = {}
const today = new Date()
for (let i = 7; i >= 0; i--) {
  const d = new Date(today)
  d.setDate(d.getDate() - i * 7)
  const key = getWeekKey(d.toISOString())
  if (key) weeklyBuckets[key] = 0
}

allLoggedSessions.forEach((s: any) => {
  const dateStr = s.date || s.created_at?.split('T')[0]
  if (!dateStr) return
  const key = getWeekKey(dateStr)
  if (key && key in weeklyBuckets) {
    weeklyBuckets[key]++
  }
})

const weeklyChartData = Object.entries(weeklyBuckets).map(([week, count]) => ({ week, count }))
const maxWeeklyCount = Math.max(...weeklyChartData.map(w => w.count), 1)

const dailyBuckets: Record<string, number> = {}
const daysToShow = 70
for (let i = daysToShow - 1; i >= 0; i--) {
  const d = new Date()
  d.setDate(d.getDate() - i)
  const key = d.toISOString().split('T')[0]
  dailyBuckets[key] = 0
}

allLoggedSessions.forEach((s: any) => {
  const dateStr = s.date || s.created_at?.split('T')[0]
  if (dateStr && dateStr in dailyBuckets) {
    dailyBuckets[dateStr]++
  }
})

const heatmapDays = Object.entries(dailyBuckets).map(([date, count]) => ({ date, count }))
const heatmapWeeks: { date: string, count: number }[][] = []
for (let i = 0; i < heatmapDays.length; i += 7) {
  heatmapWeeks.push(heatmapDays.slice(i, i + 7))
}

const getHeatColor = (count: number) => {
  if (count === 0) return '#1e1e30'
  if (count === 1) return '#a855f750'
  if (count === 2) return '#a855f790'
  return '#a855f7'
}
const sportsUsed =
  ((footballSessions || []).length > 0 ? 1 : 0) +
  (tennisSessions.length > 0 ? 1 : 0) +
  (runningSessions.length > 0 ? 1 : 0) +
  (swimmingSessions.length > 0 ? 1 : 0) +
  (basketballSessions.length > 0 ? 1 : 0) +
  (boxingSessions.length > 0 ? 1 : 0) +
  (cyclingSessions.length > 0 ? 1 : 0) +
  (golfSessions.length > 0 ? 1 : 0) +
  (rugbySessions.length > 0 ? 1 : 0) +
  (cricketSessions.length > 0 ? 1 : 0)

const achievements = [
  {
    title: 'First Tennis Session',
    desc: 'Log your first tennis session',
    emoji: '🎾',
    earned: tennisSessions.length >= 1,
    color: '#eab308'
  },
  { title: 'Welcome to SportSync', emoji: '🏅', color: '#a855f7', earned: true },
  {
    title: '100 Serves',
    desc: 'Log 100 serves total',
    emoji: '💥',
    earned: totalServes >= 100,
    color: '#f59e0b',
    progress: totalServes,
    target: 100,
    unit: 'serves'
  },
  {
    title: 'First Run',
    desc: 'Complete your first run',
    emoji: '🏃',
    earned: runningSessions.length >= 1,
    color: '#06b6d4'
  },
  {
    title: '50km Runner',
    desc: 'Run 50km total',
    emoji: '🛣️',
    earned: totalRunningKm >= 50,
    color: '#06b6d4'
  },
  {
    title: 'First Swim',
    desc: 'Log your first swim',
    emoji: '🏊',
    earned: swimmingSessions.length >= 1,
    color: '#3b82f6'
  },
  {
    title: '10km Swimmer',
    desc: 'Swim 10km total',
    emoji: '🌊',
    earned: totalSwimmingKm >= 10,
    color: '#3b82f6'
  },
  {
    title: 'Multi-Sport Athlete',
    desc: 'Use 3 different sports',
    emoji: '🏅',
    earned: sportsUsed >= 3,
    color: '#22c55e'
  },
  {
    title: '25 Sessions',
    desc: 'Log 25 sessions',
    emoji: '🔥',
    earned: totalSessions >= 25,
    color: '#ef4444'
  },
{
  title: 'Century Club',
  desc: 'Log 100 sessions',
  emoji: '💯',
  earned: totalSessions >= 100,
  color: '#a855f7'
},
{
  title: '100km Runner',
  desc: 'Run 100km total',
  emoji: '⚡',
  earned: totalRunningKm >= 100,
  color: '#06b6d4'
},
{
  title: 'Marathon Swimmer',
  desc: 'Swim 42km total',
  emoji: '🐬',
  earned: totalSwimmingKm >= 42,
  color: '#3b82f6'
},
{
  title: 'Ace Machine',
  desc: 'Log 500 serves',
  emoji: '🎾',
  earned: totalServes >= 500,
  color: '#eab308'
},
{
  title: 'First Basketball Session',
  desc: 'Log your first basketball session',
  emoji: '🏀',
  earned: basketballSessions.length >= 1,
  color: '#f97316'
},
{
  title: 'First Game',
  desc: 'Log your first basketball game',
  emoji: '🎮',
  earned: basketballSessions.filter((s: any) => s.sessionType === 'Game').length >= 1,
  color: '#22c55e'
},
{
  title: '100 Points',
  desc: 'Score 100 total points',
  emoji: '💯',
  earned: basketballSessions.reduce((sum: number, s: any) => sum + (s.points || 0), 0) >= 100,
  color: '#f97316'
},
{
  title: '50 Assists',
  desc: 'Record 50 assists',
  emoji: '🅰️',
  earned: basketballSessions.reduce((sum: number, s: any) => sum + (s.assists || 0), 0) >= 50,
  color: '#06b6d4'
},
{
  title: '100 Rebounds',
  desc: 'Grab 100 rebounds',
  emoji: '💪',
  earned: basketballSessions.reduce((sum: number, s: any) => sum + (s.rebounds || 0), 0) >= 100,
  color: '#a855f7'
},
{
  title: 'Sharpshooter',
  desc: 'Shoot 50%+ with 50 shots taken',
  emoji: '🎯',
  earned:
    basketballSessions.reduce((sum: number, s: any) => sum + (s.shotsTaken || 0), 0) >= 50 &&
    (
      basketballSessions.reduce((sum: number, s: any) => sum + (s.shotsMade || 0), 0) /
      basketballSessions.reduce((sum: number, s: any) => sum + (s.shotsTaken || 0), 0)
    ) >= 0.5,
  color: '#eab308'
},
{
  title: '25 Basketball Sessions',
  desc: 'Log 25 basketball sessions',
  emoji: '🔥',
  earned: basketballSessions.length >= 25,
  color: '#ef4444'
},
{
  title: 'First Boxing Session',
  desc: 'Log your first boxing session',
  emoji: '🥊',
  earned: boxingSessions.length >= 1,
  color: '#ef4444'
},
{
  title: '10 Boxing Sessions',
  desc: 'Log 10 boxing sessions',
  emoji: '🥊',
  earned: boxingSessions.length >= 10,
  color: '#ef4444'
},
{
  title: '100 Rounds',
  desc: 'Complete 100 boxing rounds',
  emoji: '🔥',
  earned: boxingSessions.reduce((sum: number, s: any) => sum + (s.rounds || 0), 0) >= 100,
  color: '#f97316'
},
{
  title: 'Heavy Bag Beast',
  desc: 'Complete 25 heavy bag sessions',
  emoji: '💥',
  earned: boxingSessions.filter((s: any) => s.sessionType === 'Heavy Bag').length >= 25,
  color: '#ef4444'
},
{
  title: 'Sparring Specialist',
  desc: 'Complete 10 sparring sessions',
  emoji: '🥇',
  earned: boxingSessions.filter((s: any) => s.sessionType === 'Sparring').length >= 10,
  color: '#eab308'
},
{
  title: 'Iron Chin',
  desc: 'Average defence rating of 8+',
  emoji: '🛡️',
  earned:
    boxingSessions.length >= 5 &&
    (
      boxingSessions.reduce((sum: number, s: any) => sum + (s.defence || 0), 0)
      / boxingSessions.length
    ) >= 8,
  color: '#06b6d4'
},
{
  title: 'Fight Camp',
  desc: 'Log 50 boxing sessions',
  emoji: '🏆',
  earned: boxingSessions.length >= 50,
  color: '#22c55e'
},
{
  title: 'First Ride',
  desc: 'Log your first cycling ride',
  emoji: '🚴',
  earned: cyclingSessions.length >= 1,
  color: '#10b981'
},
{
  title: '10 Cycling Rides',
  desc: 'Complete 10 rides',
  emoji: '🚴',
  earned: cyclingSessions.length >= 10,
  color: '#10b981'
},
{
  title: 'Century Rider',
  desc: 'Complete a 100km ride',
  emoji: '💯',
  earned: cyclingSessions.some((s: any) => (s.distance || 0) >= 100),
  color: '#06b6d4'
},
{
  title: '100km Total',
  desc: 'Ride 100km in total',
  emoji: '🏆',
  earned:
    cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0) >= 100,
  color: '#f59e0b'
},
{
  title: 'Mountain Goat',
  desc: 'Climb 1000m elevation in a single ride',
  emoji: '⛰️',
  earned: cyclingSessions.some((s: any) => (s.elevation || 0) >= 1000),
  color: '#a855f7'
},
{
  title: 'Speed Demon',
  desc: 'Average speed of 30km/h or more',
  emoji: '⚡',
  earned: cyclingSessions.some((s: any) => (s.avgSpeed || 0) >= 30),
  color: '#ef4444'
},
{
  title: 'First Round of Golf',
  desc: 'Log your first round',
  emoji: '⛳',
  earned: golfSessions.filter((s: any) => s.session_type === 'Round').length >= 1,
  color: '#84cc16'
},
{
  title: 'Sub-90 Round',
  desc: 'Shoot below 90 in a round',
  emoji: '🏌️',
  earned: golfSessions.some((s: any) => s.session_type === 'Round' && (s.score || 999) < 90),
  color: '#84cc16'
},
{
  title: '10 Rounds Played',
  desc: 'Log 10 rounds of golf',
  emoji: '🏆',
  earned: golfSessions.filter((s: any) => s.session_type === 'Round').length >= 10,
  color: '#f59e0b'
},
{
  title: 'First Rugby Session',
  desc: 'Log your first rugby session',
  emoji: '🏉',
  earned: rugbySessions.length >= 1,
  color: '#f59e0b'
},
{
  title: 'Try Scorer',
  desc: 'Score your first try',
  emoji: '🏆',
  earned: rugbySessions.some((s: any) => (s.tries || 0) >= 1),
  color: '#22c55e'
},
{
  title: '50 Tackles',
  desc: 'Make 50 tackles total',
  emoji: '💪',
  earned: rugbySessions.reduce((sum: number, s: any) => sum + (s.tackles || 0), 0) >= 50,
  color: '#ef4444'
},
{
  title: '25 Rugby Sessions',
  desc: 'Log 25 rugby sessions',
  emoji: '🔥',
  earned: rugbySessions.length >= 25,
  color: '#f59e0b'
},
{
  title: 'First Cricket Session',
  desc: 'Log your first cricket session',
  emoji: '🏏',
  earned: cricketSessions.length >= 1,
  color: '#06b6d4'
},
{
  title: 'Half Century',
  desc: 'Score 50+ runs in a session',
  emoji: '🏏',
  earned: cricketSessions.some((s: any) => (s.runs || 0) >= 50),
  color: '#22c55e'
},
{
  title: 'Century',
  desc: 'Score 100+ runs in a session',
  emoji: '💯',
  earned: cricketSessions.some((s: any) => (s.runs || 0) >= 100),
  color: '#f59e0b'
},
{
  title: '5 Wicket Haul',
  desc: 'Take 5 wickets in a session',
  emoji: '🎯',
  earned: cricketSessions.some((s: any) => (s.wickets || 0) >= 5),
  color: '#ef4444'
},
{
  title: '25 Cricket Sessions',
  desc: 'Log 25 cricket sessions',
  emoji: '🔥',
  earned: cricketSessions.length >= 25,
  color: '#06b6d4'
},
]
  return (
    <div style={{ minHeight: '100vh', backgroundColor: lightMode ? '#f5f5f7' : '#0a0a0f', color: lightMode ? '#1a1a1a' : 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>

        {/* Profile Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '12px' }}>
            <label style={{ cursor: 'pointer' }}>
              {avatarUrl ? (
                <img src={avatarUrl} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #a855f7', objectFit: 'cover', boxShadow: '0 0 20px #a855f740' }} />
              ) : (
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a1a2e, #0a0a0f)', border: '3px solid #a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', boxShadow: '0 0 20px #a855f740' }}>👤</div>
              )}
              <input type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file || !user) return
                setUploading(true)
                const ext = file.name.split('.').pop()
                const fileName = `${user.id}-avatar.${ext}`
                const { data: uploadData } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true })
                if (uploadData) {
                  const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName)
                  const url = urlData.publicUrl
                  setAvatarUrl(url)
                  await supabase.from('profiles').upsert({ id: user.id, avatar_url: url, username: displayName || 'Athlete' })
                }
                setUploading(false)
              }} style={{ display: 'none' }} />
            </label>
            {uploading && (
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>⏳</div>
            )}
            <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '24px', height: '24px', borderRadius: '50%', background: '#a855f7', border: '2px solid #0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', cursor: 'pointer' }} onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}>📷</div>
          </div>
          <div>
            {editingName ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Your name" style={{ background: '#13131f', border: '1px solid #a855f740', borderRadius: '8px', color: 'white', padding: '8px 12px', fontSize: '16px', fontWeight: '800', width: '160px', boxSizing: 'border-box' }} />
                <button onClick={async () => {
                  const name = nameInput.trim() || 'Athlete'
                  setDisplayName(name)
                  localStorage.setItem('displayName', name)
                  setEditingName(false)
                  if (user) {
                    await supabase.from('profiles').upsert({ id: user.id, username: name, avatar_url: avatarUrl })
                  }
                }} style={{ background: '#22c55e', border: 'none', borderRadius: '8px', color: 'white', padding: '8px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Save</button>
              </div>
            ) : (
              <h1 onClick={() => { setNameInput(displayName || 'Athlete'); setEditingName(true) }} style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 4px', cursor: 'pointer' }}>{displayName || 'Athlete'} <span style={{ fontSize: '12px', color: '#666' }}>✏️</span></h1>
            )}
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>@{displayName?.toLowerCase().replace(/\s/g, '') || 'athlete'}</p>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '6px' }}>{bio}</p>
          </div>
        </div>

        {editingBio ? (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
              <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Add a bio..." style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '8px', color: 'white', padding: '8px 12px', fontSize: '13px', width: '200px', boxSizing: 'border-box' }} />
              <button onClick={() => { localStorage.setItem('userBio', bio); setEditingBio(false) }} style={{ background: '#22c55e', border: 'none', borderRadius: '8px', color: 'white', padding: '8px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Save</button>
            </div>
          ) : (
            <p onClick={() => setEditingBio(true)} style={{ color: bio ? '#aaa' : '#444', fontSize: '13px', marginTop: '0', marginBottom: '20px', cursor: 'pointer', textAlign: 'center' }}>
              {bio || 'Add a bio...'} <span style={{ fontSize: '11px', color: '#666' }}>✏️</span>
            </p>
          )}
        {/* Stats Row */}
        {/* Streak Row */}
<div style={{ background: '#13131f', border: '1px solid #ef444425', borderLeft: '4px solid #ef4444', borderRadius: '16px', padding: '18px', marginBottom: '20px' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ef444415', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🔥</div>
    <div>
      <div style={{ fontSize: '18px', fontWeight: '900' }}>Training Streak</div>
      <div style={{ color: '#666', fontSize: '12px' }}>Keep showing up consistently</div>
    </div>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
    {[
      { label: 'Current', value: `${currentStreak}d`, color: '#ef4444' },
      { label: 'Best', value: `${bestStreak}d`, color: '#f59e0b' },
      { label: 'This Week', value: thisWeekSessions, color: '#22c55e' },
    ].map((item) => (
      <div key={item.label} style={{ background: '#0a0a0f', border: `1px solid ${item.color}25`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
        <div style={{ color: item.color, fontSize: '20px', fontWeight: '900' }}>{item.value}</div>
        <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '3px' }}>{item.label}</div>
      </div>
    ))}
  </div>
</div>

        {/* Weekly Activity Chart */}
        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '800' }}>Sessions Per Week</div>
              <div style={{ color: '#666', fontSize: '11px', marginTop: '2px' }}>Last 8 weeks, all sports</div>
            </div>
            <div style={{ fontSize: '20px' }}>📈</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '110px' }}>
            {weeklyChartData.map((w, i) => {
              const isCurrentWeek = i === weeklyChartData.length - 1
              const heightPct = Math.max((w.count / maxWeeklyCount) * 100, w.count > 0 ? 8 : 3)
              return (
                <div key={w.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: w.count > 0 ? (isCurrentWeek ? '#a855f7' : '#888') : '#333' }}>
                    {w.count > 0 ? w.count : ''}
                  </div>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '28px',
                      height: `${heightPct}%`,
                      minHeight: '4px',
                      borderRadius: '8px 8px 4px 4px',
                      background: isCurrentWeek
                        ? 'linear-gradient(180deg, #a855f7, #06b6d4)'
                        : w.count > 0
                          ? 'linear-gradient(180deg, #a855f750, #06b6d440)'
                          : '#1e1e30',
                      boxShadow: isCurrentWeek ? '0 0 12px #a855f760' : 'none',
                      transition: 'height 0.3s ease',
                    }}
                  />
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            {weeklyChartData.map((w, i) => {
              const d = new Date(w.week)
              const label = i === weeklyChartData.length - 1 ? 'This wk' : `${d.getDate()}/${d.getMonth() + 1}`
              return (
                <div key={w.week} style={{ flex: 1, textAlign: 'center', fontSize: '9px', color: '#444', fontWeight: '600' }}>
                  {label}
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity Heatmap */}
        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '800' }}>Activity Heatmap</div>
              <div style={{ color: '#666', fontSize: '11px', marginTop: '2px' }}>Last 10 weeks</div>
            </div>
            <div style={{ fontSize: '20px' }}>🔥</div>
          </div>

          <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
            {heatmapWeeks.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} session${day.count !== 1 ? 's' : ''}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      background: getHeatColor(day.count),
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '10px', color: '#555' }}>Less</span>
            {[0, 1, 2, 3].map((c) => (
              <div key={c} style={{ width: '10px', height: '10px', borderRadius: '2px', background: getHeatColor(c) }} />
            ))}
            <span style={{ fontSize: '10px', color: '#555' }}>More</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
  {
    label: 'Sessions',
    value: (
      (footballSessions || []).length + tennisSessions.length + runningSessions.length + swimmingSessions.length +
      basketballSessions.length + boxingSessions.length + cyclingSessions.length +
      golfSessions.length + rugbySessions.length + cricketSessions.length
    ).toString(),
    color: '#a855f7'
  },
  {
    label: 'Sports',
    value: (
      ((footballSessions || []).length > 0 ? 1 : 0) +
      (tennisSessions.length > 0 ? 1 : 0) +
      (runningSessions.length > 0 ? 1 : 0) +
      (swimmingSessions.length > 0 ? 1 : 0) +
      (basketballSessions.length > 0 ? 1 : 0) +
      (boxingSessions.length > 0 ? 1 : 0) +
      (cyclingSessions.length > 0 ? 1 : 0) +
      (golfSessions.length > 0 ? 1 : 0) +
      (rugbySessions.length > 0 ? 1 : 0) +
      (cricketSessions.length > 0 ? 1 : 0)
    ).toString(),
    color: '#06b6d4'
  },
  {
    label: 'Distance',
    value: `${(
      runningSessions.reduce((sum: number, r: any) => sum + (r.distance || 0), 0) +
      swimmingSessions.reduce((sum: number, s: any) => sum + ((s.distance || 0) / 1000), 0) +
      cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
    ).toFixed(1)}km`,
    color: '#22c55e'
  },
]
          .map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '3px', fontWeight: '600' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#13131f', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
          {(['overview', 'activity', 'achievements', 'settings'] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, background: activeTab === t ? '#1e1e35' : 'none', border: activeTab === t ? '1px solid #2a2a40' : '1px solid transparent', borderRadius: '10px', color: activeTab === t ? 'white' : '#555', padding: '10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '16px', padding: '18px', marginBottom: '16px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', marginBottom: '12px', color: '#a855f7' }}>🏋️ TRAINING SPLIT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { sport: 'Running', count: runningSessions.length, color: '#06b6d4' },
                  { sport: 'Football', count: (footballSessions || []).length, color: '#22c55e' },
                  { sport: 'Cycling', count: cyclingSessions.length, color: '#10b981' },
                  { sport: 'Swimming', count: swimmingSessions.length, color: '#3b82f6' },
                  { sport: 'Tennis', count: tennisSessions.length, color: '#eab308' },
                  { sport: 'Basketball', count: basketballSessions.length, color: '#f97316' },
                  { sport: 'Boxing', count: boxingSessions.length, color: '#ef4444' },
                ].filter(s => s.count > 0).map(s => {
                  const pct = Math.round((s.count / Math.max(totalSessions, 1)) * 100)
                  return (
                    <div key={s.sport} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '80px', fontSize: '12px', color: '#aaa', fontWeight: '600' }}>{s.sport}</span>
                      <div style={{ flex: 1, height: '6px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: '999px' }} />
                      </div>
                      <span style={{ fontSize: '11px', color: '#666', minWidth: '30px', textAlign: 'right' }}>{s.count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ background: '#13131f', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '16px', padding: '18px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', marginBottom: '12px', color: '#eab308' }}>🏆 QUICK HIGHLIGHTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {totalRunningKm > 0 && <div style={{ fontSize: '13px', color: '#aaa' }}>🏃 <span style={{ color: 'white', fontWeight: '600' }}>{totalRunningKm.toFixed(1)}km</span> total running</div>}
                {(footballSessions || []).reduce((sum: number, s: any) => sum + (s.goals || 0), 0) > 0 && <div style={{ fontSize: '13px', color: '#aaa' }}>⚽ <span style={{ color: 'white', fontWeight: '600' }}>{(footballSessions || []).reduce((sum: number, s: any) => sum + (s.goals || 0), 0)}</span> goals scored</div>}
                {currentStreak >= 3 && <div style={{ fontSize: '13px', color: '#aaa' }}>🔥 <span style={{ color: 'white', fontWeight: '600' }}>{currentStreak} day</span> training streak</div>}
                {sportsUsed >= 3 && <div style={{ fontSize: '13px', color: '#aaa' }}>🏅 Training across <span style={{ color: 'white', fontWeight: '600' }}>{sportsUsed} sports</span></div>}
              </div>
            </div>
          </div>
        )}
        
        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{ background: '#13131f', border: `1px solid ${item.color}20`, borderLeft: `4px solid ${item.color}`, borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.title}</div>
                  <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{item.detail}</div>
                </div>
                <div style={{ color: '#444', fontSize: '11px', flexShrink: 0 }}>{item.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {achievements.map((ach, i) => (
              <div key={i} style={{ background: '#13131f', border: `1px solid ${ach.earned ? ach.color + '40' : '#1e1e30'}`, borderRadius: '16px', padding: '18px', textAlign: 'center', opacity: ach.earned ? 1 : 0.4 }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{ach.emoji}</div>
                <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>{ach.title}</div>
                <div style={{ color: '#555', fontSize: '11px', lineHeight: '1.4' }}>
  {ach.desc}
</div>
{ach.earned && (
  <div style={{ marginTop: '8px', fontSize: '10px', color: ach.color, fontWeight: '700' }}>
    ✓ EARNED
  </div>
)}
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Appearance */}
            <h3 style={{ fontSize: '12px', color: '#a855f7', fontWeight: '800', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Appearance</h3>
            <div onClick={() => { const newMode = !lightMode; setLightMode(newMode); localStorage.setItem('lightMode', newMode.toString()); }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>{lightMode ? '☀️' : '🌙'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>{lightMode ? 'Light Mode' : 'Dark Mode'}</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Tap to toggle</div>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: lightMode ? '#333' : '#a855f7', position: 'relative' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: lightMode ? '2px' : 'auto', right: lightMode ? 'auto' : '2px' }} />
              </div>
            </div>

            {/* Units */}
            <h3 style={{ fontSize: '12px', color: '#a855f7', fontWeight: '800', margin: '8px 0 2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Units</h3>
            <div onClick={() => { const newUnit = distanceUnit === 'metric' ? 'imperial' : 'metric'; setDistanceUnit(newUnit); localStorage.setItem('distanceUnit', newUnit); }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>📏</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Distance Unit</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{distanceUnit === 'metric' ? 'Metric (km, m)' : 'Imperial (mi, yd)'}</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

            <div onClick={() => { const newUnit = weightUnit === 'metric' ? 'imperial' : 'metric'; setWeightUnit(newUnit); localStorage.setItem('weightUnit', newUnit); }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>⚖️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Weight Unit</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{weightUnit === 'metric' ? 'Metric (kg)' : 'Imperial (lbs)'}</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

            {/* Data & Privacy */}
            <h3 style={{ fontSize: '12px', color: '#a855f7', fontWeight: '800', margin: '8px 0 2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Data & Privacy</h3>
            <div onClick={() => {
                const allData = {
                  football: footballSessions || [],
                  running: runningSessions,
                  tennis: tennisSessions,
                  swimming: swimmingSessions,
                  basketball: basketballSessions,
                  boxing: boxingSessions,
                  cycling: cyclingSessions,
                  golf: golfSessions,
                  rugby: rugbySessions,
                  cricket: cricketSessions,
                  exportedAt: new Date().toISOString()
                }
                const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url; a.download = `sportsync-export-${new Date().toISOString().split('T')[0]}.json`
                a.click(); URL.revokeObjectURL(url)
              }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>📥</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Export Data</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Download all your training data</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

            <div onClick={() => { if (confirm('This will delete all your local data. Are you sure?')) { localStorage.clear(); alert('Local data cleared. Supabase data remains.'); } }} style={{ background: '#13131f', border: '1px solid #ef444425', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>🗑️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#ef4444' }}>Clear Local Data</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Remove cached data from this device</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

            <h3 style={{ fontSize: '12px', color: '#a855f7', fontWeight: '800', margin: '8px 0 2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Sound & Haptics</h3>
            <div onClick={() => { const n = !soundEnabled; setSoundEnabled(n); localStorage.setItem('soundEnabled', n.toString()); }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>🔊</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Sound Effects</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Play sounds on actions</div>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: soundEnabled ? '#a855f7' : '#333', position: 'relative' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: soundEnabled ? 'auto' : '2px', right: soundEnabled ? '2px' : 'auto' }} />
              </div>
            </div>
            <div onClick={() => { const n = !hapticEnabled; setHapticEnabled(n); localStorage.setItem('hapticEnabled', n.toString()); }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', marginBottom: '4px' }}>
              <span style={{ fontSize: '20px' }}>📳</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Haptic Feedback</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Vibrate on taps</div>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: hapticEnabled ? '#a855f7' : '#333', position: 'relative' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: hapticEnabled ? 'auto' : '2px', right: hapticEnabled ? '2px' : 'auto' }} />
              </div>
            </div>
            
            {/* Notifications */}
            <h3 style={{ fontSize: '12px', color: '#a855f7', fontWeight: '800', margin: '8px 0 2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Notifications</h3>
            <div onClick={() => { const n = !pushNotifs; setPushNotifs(n); localStorage.setItem('pushNotifs', n.toString()); }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>🔔</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Push Notifications</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Get reminded to train</div>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: pushNotifs ? '#a855f7' : '#333', position: 'relative' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: pushNotifs ? 'auto' : '2px', right: pushNotifs ? '2px' : 'auto' }} />
              </div>
            </div>

            <div onClick={() => { const n = !emailReports; setEmailReports(n); localStorage.setItem('emailReports', n.toString()); }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>📧</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Weekly Report Email</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Get your stats via email</div>
              </div>
              <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: emailReports ? '#a855f7' : '#333', position: 'relative' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: emailReports ? 'auto' : '2px', right: emailReports ? '2px' : 'auto' }} />
              </div>
            </div>

            {/* About & Legal */}
            <h3 style={{ fontSize: '12px', color: '#a855f7', fontWeight: '800', margin: '8px 0 2px', textTransform: 'uppercase', letterSpacing: '1px' }}>About & Legal</h3>
            <div onClick={() => setActiveNav('terms')} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>📄</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Terms of Service</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>View our terms</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

<div onClick={() => setActiveNav('privacy')} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>🔒</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Privacy Policy</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>How we handle your data</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

            <div onClick={() => setActiveNav('about')} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>ℹ️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>About SportSync</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Version 1.0</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

            <h3 style={{ fontSize: '12px', color: '#a855f7', fontWeight: '800', margin: '8px 0 2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Streak Protection</h3>
            <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', marginBottom: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>Streak Freezes</div>
                  <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>Protect your streak if you miss a day. Earn 1 per week at 7+ day streaks.</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px' }}>🧊</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#a855f7' }}>{streakFreezes}</div>
                  <div style={{ fontSize: '10px', color: '#666' }}>available</div>
                </div>
              </div>
            </div>
            
            {/* Account */}
            <h3 style={{ fontSize: '12px', color: '#a855f7', fontWeight: '800', margin: '8px 0 2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Account</h3>
            <div onClick={() => { setDisplayName(''); setAvatarUrl(null); localStorage.removeItem('displayName') }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>🔄</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Reset Profile</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Clear name and avatar</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

            <div onClick={async () => { await supabase.auth.signOut() }} style={{ background: '#13131f', border: '1px solid #ef444425', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', marginTop: '4px' }}>
              <span style={{ fontSize: '20px' }}>🚪</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#ef4444' }}>Sign Out</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Log out of your account</div>
              </div>
              <span style={{ color: '#444', fontSize: '18px' }}>›</span>
            </div>

          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#0d0d1a', borderTop: '1px solid #1e1e30', display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px', zIndex: 100 }}>
        {[{ id: 'home', label: 'Home', emoji: '🏠' }, { id: 'sports', label: 'Sports', emoji: '🏅' }, { id: 'track', label: 'Track', emoji: '📈' }, { id: 'social', label: 'Social', emoji: '👥' }, { id: 'profile', label: 'Profile', emoji: '👤' }].map((item) => (
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNav === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function AboutPage({ setActiveNav }: any) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('profile')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back to Profile</button>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 16px', boxShadow: '0 0 30px #a855f740' }}>🏅</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px' }}>SportSync</h1>
          <p style={{ color: '#a855f7', fontSize: '14px', fontWeight: '700' }}>Version 1.0</p>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>🏆 Built for Athletes Who Do It All</h2>
          <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.7' }}>
            SportSync is the ultimate multi-sport training tracker. Whether you're running, swimming, lifting, playing football, boxing, cycling, or all of the above — we've got you covered. Log sessions across 11 sports, track personal records, compete with friends, and get AI-powered insights to take your training to the next level.
          </p>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>✨ Features</h2>
          <div style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.9' }}>
            <p>⚽ <strong style={{ color: 'white' }}>11 Sports</strong> — Football, Gym, Running, Tennis, Swimming, Basketball, Boxing, Cycling, Golf, Rugby, Cricket</p>
            <p>📊 <strong style={{ color: 'white' }}>Advanced Analytics</strong> — Weekly charts, heatmaps, personal records, and training splits</p>
            <p>🤖 <strong style={{ color: 'white' }}>AI Coaching</strong> — Personalised match reports and weekly training summaries</p>
            <p>👥 <strong style={{ color: 'white' }}>Social Feed</strong> — Share clips, photos, and achievements with the community</p>
            <p>🎯 <strong style={{ color: 'white' }}>Goal Tracking</strong> — Set targets and track progress across any sport</p>
            <p>🏆 <strong style={{ color: 'white' }}>Achievements</strong> — Unlock badges as you hit milestones</p>
            <p>📱 <strong style={{ color: 'white' }}>Mobile-First</strong> — Designed for your phone, works everywhere</p>
            <p>🌙 <strong style={{ color: 'white' }}>Dark Mode</strong> — Beautiful dark theme with light mode option</p>
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>🛠️ Tech Stack</h2>
          <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.7' }}>
            Built with Next.js, React, TypeScript, and Supabase. AI features powered by Claude and Gemini. Designed for performance and reliability.
          </p>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>📬 Contact</h2>
          <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.7' }}>
            Questions, feedback, or want to contribute? Reach out at support@sportsync.app
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#444', fontSize: '12px', marginTop: '24px' }}>© {new Date().getFullYear()} SportSync. All rights reserved.</p>
      </div>
    </div>
  )
}

function TermsPage({ setActiveNav }: any) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('profile')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back to Profile</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '6px' }}>Terms of Service</h1>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>Last updated: January 2026</p>
        
        <div style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.9' }}>
          <p><strong style={{ color: 'white', fontSize: '15px' }}>1. Introduction</strong><br/>
          Welcome to SportSync ("the App"). By accessing or using SportSync, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App. SportSync is owned and operated independently as a personal training and fitness tracking platform.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>2. Eligibility</strong><br/>
          You must be at least 13 years of age to use SportSync. By using the App, you represent and warrant that you meet this age requirement. If you are under 18, you must have parental or guardian consent to use the App.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>3. Account Registration</strong><br/>
          To access certain features, you must create an account using a valid email address and password. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account. SportSync will not be liable for any loss or damage arising from your failure to protect your account credentials.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>4. User Data and Privacy</strong><br/>
          You retain full ownership of all training data, profile information, and content you upload to SportSync ("User Data"). By using the App, you grant SportSync a non-exclusive, worldwide, royalty-free license to store, process, and display your User Data solely for the purpose of providing the App's functionality to you. We do not sell, rent, or share your personal data with third parties for marketing purposes. All User Data is stored securely using Supabase infrastructure with encryption at rest and in transit. For full details, please review our Privacy Policy.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>5. Acceptable Use Policy</strong><br/>
          You agree not to use SportSync to:<br/>
          • Upload, post, or share any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.<br/>
          • Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity.<br/>
          • Attempt to gain unauthorised access to other users' accounts or data.<br/>
          • Upload viruses, malware, or any other malicious code.<br/>
          • Use the App for any commercial purpose without prior written consent.<br/>
          • Interfere with or disrupt the App's servers or networks.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>6. User-Generated Content</strong><br/>
          SportSync allows users to post content including text, images, and videos to the social feed ("User Content"). You are solely responsible for your User Content. By posting, you represent that you own or have the necessary rights to such content. SportSync reserves the right to remove any User Content that violates these Terms at its sole discretion, without prior notice.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>7. Intellectual Property</strong><br/>
          The SportSync name, logo, design, graphics, and all software code (excluding User Data and User Content) are the exclusive property of SportSync and are protected by applicable intellectual property laws. You may not copy, modify, distribute, or create derivative works based on the App without express written permission.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>8. Health and Safety Disclaimer</strong><br/>
          SportSync is a training tracking and logging tool only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before beginning any new exercise program, changing your training regimen, or if you have any concerns about your health. You acknowledge that participation in physical activity carries inherent risks, including but not limited to injury, illness, and in rare cases, death. You voluntarily assume all risks associated with your training activities. SportSync and its operators shall not be held liable for any injury, loss, or damage resulting from your use of the App or participation in any training activities.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>9. Limitation of Liability</strong><br/>
          To the maximum extent permitted by applicable law, SportSync and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses resulting from: (i) the use or inability to use the App; (ii) unauthorised access to or alteration of your data; (iii) statements or conduct of any third party on the App; or (iv) any other matter relating to the App.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>10. Third-Party Services</strong><br/>
          SportSync integrates with third-party services including Supabase (database and authentication) and AI providers (for training reports). We are not responsible for the availability, accuracy, or practices of these third-party services. Your use of such services is subject to their respective terms and policies.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>11. Termination</strong><br/>
          We reserve the right to suspend or terminate your account and access to the App at any time, with or without cause, and with or without notice. Upon termination, your right to use the App will immediately cease. You may terminate your account at any time by contacting us or using the account deletion features within the App.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>12. Changes to Terms</strong><br/>
          We reserve the right to modify these Terms at any time. If we make material changes, we will notify users via the App or email. Your continued use of SportSync after any changes constitutes acceptance of the updated Terms. It is your responsibility to review these Terms periodically.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>13. Governing Law</strong><br/>
          These Terms shall be governed by and construed in accordance with the laws of the United Kingdom. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of the United Kingdom.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>14. Contact</strong><br/>
          For questions about these Terms, please contact us through the App's support channels or email us at support@sportsync.app.</p>

          <p style={{ marginTop: '32px', color: '#444', fontSize: '12px', textAlign: 'center' }}>© {new Date().getFullYear()} SportSync. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

function PrivacyPage({ setActiveNav }: any) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('profile')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back to Profile</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '6px' }}>Privacy Policy</h1>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>Last updated: January 2026</p>
        
        <div style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.9' }}>
          <p><strong style={{ color: 'white', fontSize: '15px' }}>1. Our Commitment to Privacy</strong><br/>
          At SportSync, we take your privacy seriously. This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you use our application. We are committed to being transparent about our data practices and giving you control over your information.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>2. Information We Collect</strong><br/>
          <strong>Account Information:</strong> When you create an account, we collect your email address and an encrypted password. We do not have access to your plain-text password.<br/><br/>
          <strong>Profile Information:</strong> You may optionally provide a display name, profile picture (avatar), and bio. These help personalise your experience.<br/><br/>
          <strong>Training Data:</strong> We collect all training session data you log, including but not limited to: sport type, duration, distance, pace, heart rate, sets, reps, weights, goals scored, match results, and any notes you add. This is the core data that powers SportSync's tracking and analytics features.<br/><br/>
          <strong>Social Content:</strong> When you post to the social feed, we store your captions, uploaded images, and video clips. This content is visible to other SportSync users.<br/><br/>
          <strong>Usage Data:</strong> We may collect anonymous usage statistics such as which features are most used, session frequency, and app performance data. This helps us improve the App.<br/><br/>
          <strong>Device Information:</strong> Basic device information such as browser type and operating system may be collected for compatibility and troubleshooting purposes.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>3. How We Use Your Data</strong><br/>
          • <strong>To Provide the Service:</strong> Your training data is used to display your history, calculate statistics, generate analytics, and create personalised reports and insights.<br/>
          • <strong>To Sync Across Devices:</strong> Your data is stored in the cloud so you can access it from any device when logged into your account.<br/>
          • <strong>To Power Social Features:</strong> Posts you share on the social feed are displayed to other users. Your profile name and avatar accompany your posts.<br/>
          • <strong>To Improve the App:</strong> Anonymous usage patterns help us understand what features to build and improve.<br/>
          • <strong>To Communicate:</strong> We may use your email to send important account notifications, security alerts, or optional weekly training summaries (only if you opt in).</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>4. Data Storage and Security</strong><br/>
          All user data is stored on Supabase, a secure cloud database platform that provides:<br/>
          • Encryption of data at rest (AES-256) and in transit (TLS 1.3)<br/>
          • Secure authentication using industry-standard JWT tokens<br/>
          • Regular security audits and penetration testing<br/>
          • Row-Level Security (RLS) policies ensuring users can only access their own data<br/>
          • Image and video files are stored in secure cloud storage buckets with access controls<br/><br/>
          While we implement commercially reasonable security measures, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security of your data.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>5. Data Sharing and Disclosure</strong><br/>
          <strong>We DO NOT sell your personal data.</strong> Period. We do not share your data with advertisers, data brokers, or any third parties for commercial purposes.<br/><br/>
          We may share data only in the following limited circumstances:<br/>
          • <strong>With Service Providers:</strong> Supabase (database hosting), AI providers (for generating training reports — data is sent only when you request a report and is not stored by the AI provider).<br/>
          • <strong>Social Feed:</strong> Content you choose to post publicly is visible to other SportSync users.<br/>
          • <strong>Legal Requirements:</strong> If required by law, court order, or government regulation, we may disclose information to comply with legal obligations.<br/>
          • <strong>Protection of Rights:</strong> We may disclose information to protect the rights, property, or safety of SportSync, our users, or the public.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>6. Your Rights and Controls</strong><br/>
          You have the following rights regarding your data:<br/>
          • <strong>Access:</strong> You can view all your training data, profile information, and posts at any time within the App.<br/>
          • <strong>Export:</strong> You can download all your data in JSON format from the Settings page at any time.<br/>
          • <strong>Update:</strong> You can edit your profile information, bio, and avatar directly in the App.<br/>
          • <strong>Delete:</strong> You can delete individual sessions, posts, or clear local data from Settings. To request full account deletion and removal of all associated data from our servers, contact us at support@sportsync.app.<br/>
          • <strong>Opt-Out:</strong> You can toggle off push notifications and email reports from the Settings page.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>7. Cookies and Local Storage</strong><br/>
          SportSync uses browser local storage to cache your preferences (such as display name, unit preferences, and goal targets) for a better user experience. This data remains on your device and is not transmitted to our servers. You can clear this data at any time from Settings or through your browser settings.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>8. Children's Privacy</strong><br/>
          SportSync is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information promptly.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>9. International Data Transfers</strong><br/>
          Your data is stored on Supabase servers which may be located in various regions. By using SportSync, you consent to the transfer of your data to these servers. We ensure appropriate safeguards are in place to protect your data regardless of where it is processed.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>10. Data Retention</strong><br/>
          We retain your training data and account information for as long as your account remains active. If you delete your account, we will permanently delete all associated data within 30 days. Anonymous usage data may be retained indefinitely for analytical purposes.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>11. Changes to This Policy</strong><br/>
          We may update this Privacy Policy from time to time. When we make material changes, we will notify users through the App or via email. Your continued use of SportSync after changes are posted constitutes acceptance of the updated policy.</p>

          <p><strong style={{ color: 'white', fontSize: '15px' }}>12. Contact Us</strong><br/>
          If you have any questions, concerns, or requests regarding your privacy or this policy, please contact us at:<br/>
          📧 support@sportsync.app<br/><br/>
          We aim to respond to all privacy-related inquiries within 48 hours.</p>

          <p style={{ marginTop: '32px', color: '#444', fontSize: '12px', textAlign: 'center' }}>© {new Date().getFullYear()} SportSync. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

function SocialPage({ setActiveNav, socialPosts, user, lightMode, setLightMode }: any) {
  const [activeNav, setActiveNavLocal] = useState('social')
  const [posts, setPosts] = useState<any[]>([])
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [caption, setCaption] = useState('')
  const [sport, setSport] = useState('All')
  const [posting, setPosting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [expandedComments, setExpandedComments] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<Record<string, any[]>>({})
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
const [searchQuery, setSearchQuery] = useState('')
const [searchResults, setSearchResults] = useState<any[]>([])

  const sportOptions = [
    { name: 'General', color: '#a855f7', emoji: '🏅' },
    { name: 'Football', color: '#22c55e', emoji: '⚽' },
    { name: 'Gym', color: '#a855f7', emoji: '🏋️' },
    { name: 'Tennis', color: '#eab308', emoji: '🎾' },
    { name: 'Running', color: '#06b6d4', emoji: '🏃' },
    { name: 'Swimming', color: '#3b82f6', emoji: '🏊' },
    { name: 'Basketball', color: '#f97316', emoji: '🏀' },
    { name: 'Boxing', color: '#ef4444', emoji: '🥊' },
    { name: 'Cycling', color: '#10b981', emoji: '🚴' },
    { name: 'Golf', color: '#84cc16', emoji: '⛳' },
    { name: 'Rugby', color: '#f59e0b', emoji: '🏉' },
    { name: 'Cricket', color: '#06b6d4', emoji: '🏏' },
  ]

  useEffect(() => {
    loadPosts()
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (data) setProfile(data)
    }
  }

  const refreshPosts = async () => {
    setRefreshing(true)
    await loadPosts()
    setRefreshing(false)
  }

  const loadPosts = async () => {
    setLoading(true)
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data)

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data: likes } = await supabase.from('post_likes').select('post_id').eq('user_id', session.user.id)
      if (likes) setLikedPosts(likes.map((l: any) => l.post_id))
    }
    setLoading(false)
  }

  const loadComments = async (postId: string) => {
    const { data } = await supabase.from('post_comments').select('*').eq('post_id', postId).order('created_at', { ascending: true })
    if (data) setComments(prev => ({ ...prev, [postId]: data }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size < 100 * 1024 * 1024) {
      setVideoFile(file)
      setImageFile(null)
      setImagePreview(null)
      setVideoPreview(URL.createObjectURL(file))
    } else if (file) {
      alert('Video must be under 100MB')
    }
  }

  const handlePost = async () => {
    if (!caption.trim()) return
    setPosting(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    let imageUrl = null

    let videoUrl = null

    if (videoFile) {
      const ext = videoFile.name.split('.').pop()
      const fileName = `${session.user.id}-${Date.now()}.${ext}`
      const { data: uploadData, error: uploadError } = await supabase.storage.from('post-videos').upload(fileName, videoFile, { upsert: true })
      if (uploadData && !uploadError) {
        const { data: urlData } = supabase.storage.from('post-videos').getPublicUrl(fileName)
        videoUrl = urlData.publicUrl
      }
    } else if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const fileName = `${session.user.id}-${Date.now()}.${ext}`
      const { data: uploadData, error: uploadError } = await supabase.storage.from('post-images').upload(fileName, imageFile, { upsert: true })
      if (uploadData && !uploadError) {
        const { data: urlData } = supabase.storage.from('post-images').getPublicUrl(fileName)
        imageUrl = urlData.publicUrl
      }
    }

    const selectedSport = sportOptions.find(s => s.name === sport) || sportOptions[0]

    const { data: newPost, error: insertError } = await supabase.from('posts').insert({
      user_id: session.user.id,
      username: profile?.username || 'Athlete',
      caption,
      sport,
      sport_color: selectedSport.color,
      emoji: selectedSport.emoji,
      image_url: imageUrl,
      video_url: videoUrl,
      likes: 0,
    }).select().single()

    if (newPost && !insertError) {
      setPosts(prev => [newPost, ...prev])
    }

    setCaption('')
    setSport('General')
    setImageFile(null)
    setImagePreview(null)
    setVideoFile(null)
    setVideoPreview(null)
    setShowCreate(false)
    setPosting(false)
    loadPosts()
  }

  const toggleLike = async (postId: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const isLiked = likedPosts.includes(postId)
    const post = posts.find(p => p.id === postId)
    if (!post) return

    if (isLiked) {
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', session.user.id)
      const newLikes = Math.max(0, (post.likes || 1) - 1)
      await supabase.from('posts').update({ likes: newLikes }).eq('id', postId)
      setLikedPosts(prev => prev.filter(id => id !== postId))
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: newLikes } : p))
    } else {
      await supabase.from('post_likes').insert({ post_id: postId, user_id: session.user.id })
      const newLikes = (post.likes || 0) + 1
      await supabase.from('posts').update({ likes: newLikes }).eq('id', postId)
      setLikedPosts(prev => [...prev, postId])
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: newLikes } : p))
    }
  }

  const handleComment = async (postId: string) => {
    if (!commentText.trim()) return
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const newCommentText = commentText
    setCommentText('')

    const { data: newComment, error } = await supabase.from('post_comments').insert({
      post_id: postId,
      user_id: session.user.id,
      username: profile?.username || 'Athlete',
      comment: newCommentText,
    }).select().single()

    if (newComment && !error) {
      setComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), newComment] }))
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, comment_count: (p.comment_count || 0) + 1 } : p))
    }
  }

  const handleClipSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    const q = query.toLowerCase()
    const { data } = await supabase.from('posts')
      .select('*')
      .or(`sport.ilike.%${q}%,caption.ilike.%${q}%`)
      .order('created_at', { ascending: false })
      .limit(30)
    if (data) {
      setSearchResults(data.filter((p: any) => p.video_url || p.image_url))
    }
  }
  
  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
    if (diff < 1) return 'Just now'
    if (diff < 60) return `${diff}m ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return `${Math.floor(diff / 1440)}d ago`
  }

  const allPosts = [...socialPosts, ...posts]
    .filter((p: any) => sport === 'All' || p.sport === sport)
    .sort((a, b) => new Date(b.created_at || b.time || b.id).getTime() - new Date(a.created_at || a.time || a.id).getTime())

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Create Post Modal */}
      {showCreate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 300, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: '#0d0d1a', border: '1px solid #1e1e30', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '430px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Create Post</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                {sportOptions.find(s => s.name === sport)?.emoji || '🏅'}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>{profile?.username || 'Athlete'}</div>
                <div style={{ color: '#666', fontSize: '12px' }}>Posting now</div>
              </div>
            </div>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Share your achievement, update or news..."
              rows={4}
              style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', marginBottom: '16px' }}
            />

            <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>SPORT</label>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
              {sportOptions.map((s) => (
                <button key={s.name} onClick={() => setSport(s.name)} style={{ background: sport === s.name ? `${s.color}20` : '#13131f', border: `1.5px solid ${sport === s.name ? s.color : '#1e1e30'}`, borderRadius: '20px', color: sport === s.name ? s.color : '#666', padding: '6px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>{s.emoji} {s.name}</button>
              ))}
            </div>

            {videoPreview && (
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <video src={videoPreview} controls style={{ width: '100%', borderRadius: '12px', maxHeight: '280px', background: '#000' }} />
                <button onClick={() => { setVideoFile(null); setVideoPreview(null) }} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', color: 'white', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px' }}>×</button>
              </div>
            )}

            {imagePreview && !videoPreview && (
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <img src={imagePreview} style={{ width: '100%', borderRadius: '12px', maxHeight: '200px', objectFit: 'cover' }} />
                <button onClick={() => { setImageFile(null); setImagePreview(null) }} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', color: 'white', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px' }}>×</button>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <label style={{ flex: 1, background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: '#aaa', padding: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textAlign: 'center' }}>
                📷 Photo
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>
              <label style={{ flex: 1, background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: '#aaa', padding: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textAlign: 'center' }}>
                🎬 Clip
                <input type="file" accept="video/*" onChange={handleVideoChange} style={{ display: 'none' }} />
              </label>
              <button onClick={handlePost} disabled={posting || !caption.trim()} style={{ flex: 2, background: posting || !caption.trim() ? '#333' : 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '12px', color: 'white', padding: '12px', fontSize: '15px', fontWeight: '800', cursor: posting || !caption.trim() ? 'not-allowed' : 'pointer' }}>
                {posting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div 
      onTouchStart={(e) => {
        const touchY = e.touches[0].clientY
        ;(e.currentTarget as any)._touchStartY = touchY
      }}
      onTouchMove={(e) => {
        const touchY = e.touches[0].clientY
        const startY = (e.currentTarget as any)._touchStartY || 0
        if (touchY - startY > 80 && (e.currentTarget as any).scrollTop === 0 && !refreshing) {
          refreshPosts()
        }
      }}
      style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px' }}>Social</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Share and celebrate wins</p>
          </div>
          <div onClick={() => setShowSearch(true)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#13131f', border: '1px solid #1e1e30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer', marginRight: '8px' }}>🔍</div>
          <button onClick={() => setShowCreate(true)} style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '20px', color: 'white', padding: '10px 16px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>+ Post</button>
        </div>

        {/* Sport Group Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '8px' }}>
          {['All', 'Football', 'Running', 'Gym', 'Tennis', 'Basketball', 'Boxing', 'Cycling', 'Swimming', 'Golf', 'Rugby', 'Cricket'].map((sportName) => {
            const colors: Record<string, string> = {
              All: '#a855f7', Football: '#22c55e', Running: '#06b6d4', Gym: '#a855f7', Tennis: '#eab308',
              Basketball: '#f97316', Boxing: '#ef4444', Cycling: '#10b981', Swimming: '#3b82f6',
              Golf: '#84cc16', Rugby: '#f59e0b', Cricket: '#06b6d4'
            }
            const color = colors[sportName]
            const isActive = sport === sportName
            return (
              <button
                key={sportName}
                onClick={() => setSport(sportName)}
                style={{
                  background: isActive ? `${color}20` : '#13131f',
                  border: `1.5px solid ${isActive ? color : '#1e1e30'}`,
                  borderRadius: '20px',
                  color: isActive ? color : '#666',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  boxShadow: isActive ? `0 0 12px ${color}40` : 'none',
                }}
              >
                {sportName}
              </button>
            )
          })}
        </div>

        {/* Clip Search Modal */}
      {showSearch && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 300, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', maxWidth: '430px', width: '100%', margin: '0 auto 16px' }}>
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => handleClipSearch(e.target.value)}
              placeholder="Search clips by sport (Football, Boxing, Gym...)"
              style={{ flex: 1, background: '#13131f', border: '1.5px solid #a855f740', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }}
            />
            <button onClick={() => { setShowSearch(false); setSearchQuery(''); setSearchResults([]) }} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
          </div>
          <div style={{ maxWidth: '430px', width: '100%', margin: '0 auto', overflowY: 'auto', flex: 1 }}>
            {searchQuery && searchResults.length === 0 && (
              <div style={{ textAlign: 'center', color: '#666', marginTop: '40px', fontSize: '14px' }}>No clips found for "{searchQuery}"</div>
            )}
            {!searchQuery && (
              <div style={{ textAlign: 'center', color: '#555', marginTop: '40px', fontSize: '14px' }}>Search for football highlights, boxing clips, gym videos...</div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {searchResults.map((post: any, i: number) => (
                <div key={i} style={{ background: '#13131f', border: `1px solid ${post.sport_color || '#a855f7'}25`, borderRadius: '14px', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{post.emoji || '🏅'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '13px' }}>{post.username}</div>
                      <div style={{ color: '#666', fontSize: '11px' }}>{post.sport}</div>
                    </div>
                  </div>
                  {post.video_url ? (
                    <video src={post.video_url} controls style={{ width: '100%', maxHeight: '300px', background: '#000' }} />
                  ) : post.image_url ? (
                    <img src={post.image_url} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                  ) : null}
                  {post.caption && (
                    <div style={{ padding: '10px 14px', color: '#aaa', fontSize: '12px' }}>{post.caption}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
        
        {refreshing && (
          <div style={{ textAlign: 'center', padding: '12px', color: '#a855f7', fontSize: '14px', fontWeight: '600' }}>
            ↻ Refreshing...
          </div>
        )}
        
        
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: '#13131f', borderRadius: '20px', padding: '16px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1e1e30', animation: 'pulse 1.5s infinite' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '100px', height: '14px', borderRadius: '4px', background: '#1e1e30', marginBottom: '6px', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ width: '60px', height: '10px', borderRadius: '4px', background: '#1e1e30', animation: 'pulse 1.5s infinite' }} />
                  </div>
                </div>
                <div style={{ width: '80%', height: '14px', borderRadius: '4px', background: '#1e1e30', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '60%', height: '14px', borderRadius: '4px', background: '#1e1e30', marginBottom: '16px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '100%', height: '160px', borderRadius: '12px', background: '#1e1e30', animation: 'pulse 1.5s infinite' }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!loading && allPosts.length === 0 && (
            <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '20px', padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📣</div>
              <div style={{ fontWeight: '800', fontSize: '18px', marginBottom: '8px' }}>No posts yet</div>
              <div style={{ color: '#666', fontSize: '13px', marginBottom: '20px', lineHeight: '1.5' }}>
                Be the first to share! Post clips, photos,<br />
                achievements or updates with the community.
              </div>
              <button onClick={() => setShowCreate(true)} style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '12px', color: 'white', padding: '12px 24px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                Create First Post →
              </button>
            </div>
          )}
          {allPosts.map((post: any) => {
            const sportColor = post.sport_color || post.sportColor || '#a855f7'
            const postEmoji = post.emoji || '🏅'
            const postUser = post.username || post.user || 'Athlete'
            const postTime = post.created_at ? timeAgo(post.created_at) : post.time || 'Just now'
            const postId = post.id?.toString()
            const isLiked = likedPosts.includes(postId)
            const postComments = comments[postId] || []
            const isExpanded = expandedComments === postId

            return (
              <div key={postId} style={{ background: '#13131f', border: `1px solid ${sportColor}25`, borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `${sportColor}20`, border: `2px solid ${sportColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{postEmoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>{postUser}</div>
                    <div style={{ color: '#555', fontSize: '12px' }}>{postTime}</div>
                  </div>
                  <span style={{ background: `${sportColor}20`, border: `1px solid ${sportColor}40`, borderRadius: '20px', color: sportColor, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>{post.sport}</span>
                </div>

                <div style={{ padding: '0 16px 12px' }}>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#ddd' }}>{post.caption}</p>
                </div>

                {(post.video_url || post.image_url || post.hasMedia) && (
                  <div style={{ margin: '0 16px 12px' }}>
                    {post.video_url ? (
                      <video src={post.video_url} controls style={{ width: '100%', borderRadius: '14px', maxHeight: '350px', background: '#000' }} />
                    ) : post.image_url ? (
                      <img src={post.image_url} style={{ width: '100%', borderRadius: '14px', maxHeight: '280px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '180px', borderRadius: '14px', background: post.mediaBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1e1e30' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: `2px solid ${sportColor}80`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: `18px solid ${sportColor}`, marginLeft: '3px' }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ padding: '12px 16px', display: 'flex', gap: '20px', alignItems: 'center', borderTop: '1px solid #1e1e3030' }}>
                  <button onClick={() => post.user_id && toggleLike(postId)} onTouchStart={() => post.user_id && toggleLike(postId)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: isLiked ? '#ef4444' : '#555', fontSize: '13px', fontWeight: '600', padding: 0 }}>
                    <span style={{ fontSize: '18px' }}>{isLiked ? '❤️' : '🤍'}</span>
                    {post.likes || 0}
                  </button>
                  <button onClick={() => {
                    if (expandedComments === postId) {
                      setExpandedComments(null)
                    } else {
                      setExpandedComments(postId)
                      if (!comments[postId]) loadComments(postId)
                    }
                  }} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: isExpanded ? '#a855f7' : '#555', fontSize: '13px', fontWeight: '600', padding: 0 }}>
                    <span style={{ fontSize: '18px' }}>💬</span>
                    {post.comment_count || postComments.length || 0}
                  </button>
                  <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#555', fontSize: '13px', fontWeight: '600', padding: 0, marginLeft: 'auto' }}>
                    <span style={{ fontSize: '18px' }}>↗️</span>
                    Share
                  </button>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 16px 16px', borderTop: '1px solid #1e1e30' }}>
                    {postComments.length === 0 && (
                      <p style={{ color: '#444', fontSize: '13px', margin: '12px 0' }}>No comments yet. Be the first!</p>
                    )}
                    {postComments.map((c: any, i: number) => (
                      <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e1e3020' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#a855f720', border: '1px solid #a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>👤</div>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '13px', color: '#a855f7' }}>{c.username}</div>
                            <div style={{ fontSize: '13px', color: '#ddd', marginTop: '2px' }}>{c.comment}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleComment(postId)}
                        placeholder="Add a comment..."
                        style={{ flex: 1, background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '20px', color: 'white', padding: '10px 14px', fontSize: '13px', boxSizing: 'border-box' }}
                      />
                      <button onClick={() => post.user_id && handleComment(postId)} style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '20px', color: 'white', padding: '10px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Post</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#0d0d1a', borderTop: '1px solid #1e1e30', display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px', zIndex: 100 }}>
        {[{ id: 'home', label: 'Home', emoji: '🏠' }, { id: 'sports', label: 'Sports', emoji: '🏅' }, { id: 'track', label: 'Track', emoji: '📈' }, { id: 'social', label: 'Social', emoji: '👥' }, { id: 'profile', label: 'Profile', emoji: '👤' }].map((item) => (
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNav === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
function GymStats({ setActiveNav, gymSessions }: any) {
  const sessions = gymSessions || []
  const totalWorkouts = sessions.length
  const totalMinutes = sessions.reduce((sum: number, s: any) => sum + (s.duration || 0), 0)
  const totalHours = Math.floor(totalMinutes / 60)

  const currentStreak = (() => {
    const notifs: { id: string, emoji: string, title: string, detail: string, color: string, action: string }[] = []
    const now = new Date()
    
    const lastRun = runningSessions.sort((a: any, b: any) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())[0]
    if (lastRun) {
      const daysSinceRun = Math.floor((now.getTime() - new Date(lastRun.date || '').getTime()) / (1000 * 60 * 60 * 24))
      if (daysSinceRun >= 3 && daysSinceRun < 7) {
        notifs.push({ id: 'run-reminder', emoji: '🏃', title: `${daysSinceRun} days since your last run`, detail: `Your last run was ${lastRun.distance}km. How about a quick 5K today?`, color: '#06b6d4', action: 'log-run' })
      } else if (daysSinceRun >= 7) {
        notifs.push({ id: 'run-reminder', emoji: '🏃', title: `It has been ${daysSinceRun} days since your last run`, detail: 'Even a short run will get you back on track.', color: '#06b6d4', action: 'log-run' })
      }
    }
    
    const lastGym = gymSessions.sort((a: any, b: any) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())[0]
    if (lastGym) {
      const daysSinceGym = Math.floor((now.getTime() - new Date(lastGym.date || '').getTime()) / (1000 * 60 * 60 * 24))
      if (daysSinceGym >= 5 && daysSinceGym < 10) {
        notifs.push({ id: 'gym-reminder', emoji: '🏋️', title: `${daysSinceGym} days since your last workout`, detail: 'Your muscles are ready for another session.', color: '#a855f7', action: 'log-workout' })
      }
    }
    
    Object.entries(sportGoals).forEach(([key, target]: any) => {
      const [sport, metric] = key.split('_')
      let progress = 0
      if (sport === 'Running') progress = runningSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
      else if (sport === 'Gym') progress = gymSessions.length
      else if (sport === 'Cycling') progress = cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
      const pct = Math.round((progress / target) * 100)
      if (pct >= 80 && pct < 100) {
        notifs.push({ id: `goal-${key}`, emoji: '🎯', title: `Almost there! ${pct}% to your ${sport} goal`, detail: `Only ${target - progress} ${metric} to go!`, color: '#22c55e', action: 'track' })
      }
    })
    
    if (activePrograms.length > 0) {
      activePrograms.forEach((program: any) => {
        const prog = programProgress[program.id] || {}
        const completed = Object.keys(prog).filter(k => prog[k]).length
        const pct = Math.round((completed / program.sessions.length) * 100)
        if (pct > 0 && pct < 30) {
          notifs.push({ id: `program-${program.id}`, emoji: program.emoji, title: `Great start on ${program.title}!`, detail: `${completed} of ${program.sessions.length} sessions done.`, color: program.color, action: 'home' })
        } else if (pct >= 50 && pct < 100) {
          notifs.push({ id: `program-${program.id}`, emoji: program.emoji, title: `Halfway through ${program.title}!`, detail: `${completed}/${program.sessions.length} complete.`, color: program.color, action: 'home' })
        }
      })
    }
    
    const dayOfWeek = now.getDay()
    if (dayOfWeek === 1) {
      notifs.push({ id: 'monday-motivation', emoji: '💪', title: 'New week, new opportunities', detail: 'What do you want to achieve this week?', color: '#a855f7', action: 'home' })
    }
    
    return notifs.filter(n => !dismissedNotifications.includes(n.id)).slice(0, 4)
  })()
  

  const [tab, setTab] = useState<'overall' | 'strength' | 'cardio'>('overall')

  const overallStats = {
    totalWorkouts,
    totalHours,
    currentStreak,
  }

  const strengthStats = (() => {
    let totalSets = 0
    let totalReps = 0
    let totalVolume = 0
    const liftMap: Record<string, { best: number, recent: number, sessions: number }> = {}

    sessions.forEach((session: any) => {
      ;(session.exercises || []).forEach((ex: any) => {
        if (!ex.name) return
        const setsNum = parseInt(ex.sets) || 0
        const repsNum = parseInt(ex.reps) || 0
        const weightNum = parseFloat(ex.weight) || 0

        totalSets += setsNum
        totalReps += setsNum * repsNum
        totalVolume += setsNum * repsNum * weightNum

        if (!liftMap[ex.name]) {
          liftMap[ex.name] = { best: weightNum, recent: weightNum, sessions: 1 }
        } else {
          liftMap[ex.name].sessions += 1
          liftMap[ex.name].recent = weightNum
          if (weightNum > liftMap[ex.name].best) liftMap[ex.name].best = weightNum
        }
      })
    })

    const lifts = Object.entries(liftMap).map(([name, data]) => ({
      name,
      pr: `${data.best}kg`,
      recent: `${data.recent}kg`,
      sessions: data.sessions,
      color: '#a855f7'
    }))

    return {
      totalSets,
      totalReps,
      avgSessionVolume: sessions.length > 0 ? `${Math.round(totalVolume / sessions.length).toLocaleString()}kg` : '0kg',
      lifts
    }
  })()

  const cardioStats = {
    totalSessions: sessions.filter((s: any) => s.title && (s.title.toLowerCase().includes('cardio') || s.title.toLowerCase().includes('run'))).length,
    totalKm: 'N/A',
    avgPace: 'N/A',
    totalCalories: 'N/A',
    longestRun: 'N/A',
    bestPace: 'N/A',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('gym-hub')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>My Gym Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px' }}>Your training performance data</p>

        {/* Streak Banner */}
        <div style={{ background: 'linear-gradient(135deg, #a855f720, #7c3aed20)', border: '1px solid #a855f730', borderRadius: '14px', padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#a855f7', fontWeight: '700', marginBottom: '2px' }}>CURRENT STREAK</div>
            <div style={{ fontSize: '28px', fontWeight: '800' }}>{currentStreak} days 🔥</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>Total workouts</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#a855f7' }}>{totalWorkouts}</div>
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '900', marginBottom: '16px' }}>📈 WEEKLY LOAD — LAST 6 WEEKS</div>
          {(() => {
            const weeks: { label: string, count: number }[] = []
            for (let i = 5; i >= 0; i--) {
              const weekStart = new Date()
              weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7)
              weekStart.setHours(0, 0, 0, 0)
              const weekEnd = new Date(weekStart)
              weekEnd.setDate(weekEnd.getDate() + 7)
              const count = sessions.filter((s: any) => {
                const d = new Date(s.date)
                return d >= weekStart && d < weekEnd
              }).length
              weeks.push({ label: `W${6 - i}`, count })
            }
            const max = Math.max(...weeks.map(w => w.count), 1)
            return (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                {weeks.map((week, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: '800' }}>{week.count > 0 ? week.count : ''}</div>
                    <div style={{ width: '100%', background: week.count > 0 ? 'linear-gradient(180deg, #a855f7, #7c3aed)' : '#1e1e30', borderRadius: '6px 6px 0 0', height: `${Math.max((week.count / max) * 60, week.count > 0 ? 8 : 4)}px` }} />
                    <div style={{ fontSize: '10px', color: '#555', fontWeight: '600' }}>{week.label}</div>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>

        {sessions.length > 0 && (
          <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>🏋️ RECENT WORKOUTS</div>
            {sessions.slice(0, 5).map((s: any, i: number) => (
              <div key={i} style={{ background: '#0a0a0f', border: '1px solid #a855f720', borderRadius: '14px', padding: '14px 16px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ fontWeight: '800', fontSize: '14px' }}>{s.title || 'Workout'}</div>
                  <div style={{ color: '#a855f7', fontWeight: '800', fontSize: '13px' }}>{s.duration || 0} min</div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {s.date && (
                    <span style={{ background: '#a855f715', border: '1px solid #a855f730', borderRadius: '20px', color: '#a855f7', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{s.date}</span>
                  )}
                  {s.exercises && s.exercises.filter((e: any) => e.name).length > 0 && (
                    <span style={{ background: '#06b6d415', border: '1px solid #06b6d430', borderRadius: '20px', color: '#06b6d4', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{s.exercises.filter((e: any) => e.name).length} exercises</span>
                  )}
                  {s.notes && (
                    <span style={{ background: '#1e1e30', borderRadius: '20px', color: '#555', fontSize: '10px', fontWeight: '600', padding: '3px 8px' }}>"{s.notes}"</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {sessions.length === 0 && (
          <div onClick={() => setActiveNav('log-workout')} style={{ background: '#13131f', border: '1px solid #a855f725', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏋️</div>
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#a855f7' }}>Ready to lift?</div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first workout to see stats here</div>
            <span style={{ background: '#a855f715', border: '1px solid #a855f740', borderRadius: '20px', color: '#a855f7', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Workout →</span>
          </div>
        )}
        
        {/* Tabs */}
        <div style={{ display: 'flex', background: '#13131f', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
          {(['overall', 'strength', 'cardio'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, background: tab === t ? '#1e1e35' : 'none', border: tab === t ? '1px solid #2a2a40' : '1px solid transparent', borderRadius: '10px', color: tab === t ? 'white' : '#555', padding: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>

        {/* Overall Tab */}
        {tab === 'overall' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Total Workouts', value: totalWorkouts, color: '#a855f7', emoji: '🏋️' },
              { label: 'Total Hours', value: `${totalHours}h`, color: '#06b6d4', emoji: '⏱️' },
              { label: 'Total Minutes', value: totalMinutes, color: '#22c55e', emoji: '⏱️' },
              { label: 'This Week', value: sessions.filter((s: any) => { const d = new Date(s.date); const now = new Date(); const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay()); weekStart.setHours(0,0,0,0); return d >= weekStart }).length, color: '#f59e0b', emoji: '📅' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.emoji}</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Strength Tab */}
        {tab === 'strength' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '4px' }}>
              {[
                { label: 'Total Sets', value: strengthStats.totalSets, color: '#a855f7' },
                { label: 'Total Reps', value: strengthStats.totalReps.toLocaleString(), color: '#06b6d4' },
                { label: 'Avg Volume', value: strengthStats.avgSessionVolume, color: '#22c55e' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#13131f', border: `1px solid ${s.color}25`, borderRadius: '12px', padding: '14px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '10px', color: '#555', marginTop: '3px', fontWeight: '600' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: '13px', color: '#aaa', fontWeight: '700', margin: '8px 0 4px' }}>LIFT BREAKDOWN</h3>
            {strengthStats.lifts.map((lift) => (
              <div key={lift.name} style={{ background: '#13131f', border: `1px solid ${lift.color}20`, borderLeft: `4px solid ${lift.color}`, borderRadius: '14px', padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '700', fontSize: '15px' }}>{lift.name}</span>
                  <span style={{ fontSize: '11px', color: '#555' }}>{lift.sessions} sessions</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#666', fontWeight: '600', marginBottom: '2px' }}>PR</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: lift.color }}>{lift.pr}</div>
                  </div>
                  <div style={{ width: '1px', background: '#1e1e30' }} />
                  <div>
                    <div style={{ fontSize: '10px', color: '#666', fontWeight: '600', marginBottom: '2px' }}>RECENT</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#aaa' }}>{lift.recent}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cardio Tab */}
        {tab === 'cardio' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Sessions', value: cardioStats.totalSessions, color: '#06b6d4', emoji: '🏃' },
              { label: 'Total km', value: cardioStats.totalKm + 'km', color: '#22c55e', emoji: '📍' },
              { label: 'Avg Pace', value: cardioStats.avgPace, color: '#a855f7', emoji: '⚡' },
              { label: 'Best Pace', value: cardioStats.bestPace, color: '#f59e0b', emoji: '🏆' },
              { label: 'Longest Run', value: cardioStats.longestRun, color: '#ef4444', emoji: '🛣️' },
              { label: 'Calories', value: cardioStats.totalCalories.toLocaleString(), color: '#f97316', emoji: '🔥' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.emoji}</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function GymWorkoutDetail({ category, setActiveNav }: { category: string, setActiveNav: (nav: string) => void }) {
  const content: Record<string, { emoji: string, color: string, sections: { title: string, workouts: { name: string, setup: string, sets: string, tip: string }[] }[] }> = {
    Push: {
      emoji: '💪', color: '#a855f7',
      sections: [
        {
          title: 'Chest',
          workouts: [
            { name: 'Barbell Bench Press', setup: 'Lie flat on bench, grip slightly wider than shoulder width. Lower bar to lower chest, press explosively back up.', sets: '4 sets of 6-8 reps', tip: 'Retract your shoulder blades and keep them pinned to the bench. Drive your feet into the floor. Bar path should be slightly diagonal, not straight up.' },
            { name: 'Incline Dumbbell Press', setup: 'Set bench to 30-45 degrees. Press dumbbells from shoulder height to lockout, slight arc inward at top.', sets: '3 sets of 8-10 reps', tip: 'Dont flare your elbows out — keep them at about 60 degrees from your torso. Feel the upper chest stretch at the bottom.' },
            { name: 'Cable Flyes', setup: 'Set cables at chest height. Lean slightly forward, bring handles together in a hugging motion.', sets: '3 sets of 12-15 reps', tip: 'This is an isolation movement — use lighter weight and focus on the squeeze at the top. No need to go heavy here.' },
          ]
        },
        {
          title: 'Shoulders',
          workouts: [
            { name: 'Overhead Press', setup: 'Stand or sit, press barbell or dumbbells from shoulder height overhead to full lockout.', sets: '4 sets of 6-8 reps', tip: 'Brace your core hard to protect your lower back. Don\'t let the bar drift forward. Lock out fully at the top for maximum deltoid engagement.' },
            { name: 'Lateral Raises', setup: 'Stand with dumbbells at sides, raise arms to shoulder height in a slight forward arc.', sets: '4 sets of 12-15 reps', tip: 'Lead with your elbows, not your hands. Slight forward tilt isolates the medial delt better. Control the descent — dont let gravity do the work.' },
            { name: 'Face Pulls', setup: 'Set cable at head height with rope attachment. Pull toward your face, flaring elbows wide.', sets: '3 sets of 15-20 reps', tip: 'Critical for shoulder health and rear delt development. Pull to your nose level, elbows should be higher than your hands at the end position.' },
          ]
        },
        {
          title: 'Triceps',
          workouts: [
            { name: 'Close Grip Bench Press', setup: 'Same as bench press but grip shoulder width. Lower to lower chest, press up keeping elbows close.', sets: '3 sets of 8-10 reps', tip: 'Dont go too narrow — shoulder width is close enough. Wider is better for the triceps than you think and safer on wrists.' },
            { name: 'Tricep Rope Pushdown', setup: 'Set cable high with rope. Push down, splitting rope at the bottom for full contraction.', sets: '3 sets of 12-15 reps', tip: 'Keep your elbows pinned to your sides — they shouldnt move. The split at the bottom fully contracts the lateral head.' },
          ]
        },
      ]
    },
    Pull: {
      emoji: '🏋️', color: '#06b6d4',
      sections: [
        {
          title: 'Back',
          workouts: [
            { name: 'Deadlift', setup: 'Bar over mid-foot, hip width stance. Hinge down, grip just outside legs, chest up, drive floor away.', sets: '4 sets of 4-6 reps', tip: 'The bar should drag up your shins. Think about pushing the floor away rather than pulling the bar up. Keep your lats engaged by imagining bending the bar around your legs.' },
            { name: 'Barbell Row', setup: 'Hinge forward to about 45 degrees, pull bar to lower chest/upper stomach keeping elbows close.', sets: '4 sets of 6-8 reps', tip: 'Lead with your elbows, not your hands. Squeeze your shoulder blades together at the top. Dont use momentum — control is everything here.' },
            { name: 'Lat Pulldown', setup: 'Grip bar wider than shoulder width. Pull to upper chest, leaning slightly back, elbows driving down.', sets: '3 sets of 10-12 reps', tip: 'Think about pulling your elbows to your back pockets. Avoid shrugging. A full stretch at the top is where the growth comes from.' },
          ]
        },
        {
          title: 'Biceps',
          workouts: [
            { name: 'Barbell Curl', setup: 'Stand with barbell, curl to chin height keeping elbows pinned to sides.', sets: '3 sets of 8-10 reps', tip: 'Dont swing. If you have to use momentum the weight is too heavy. Full range of motion — start with arms fully extended.' },
            { name: 'Incline Dumbbell Curl', setup: 'Set bench to 60 degrees, let arms hang fully extended behind body, curl up.', sets: '3 sets of 10-12 reps', tip: 'The incline creates a longer range of motion and a better stretch at the bottom. You will need to go lighter than standing curls.' },
            { name: 'Hammer Curl', setup: 'Neutral grip, curl dumbbells keeping palms facing each other throughout.', sets: '3 sets of 10-12 reps', tip: 'Trains the brachialis and brachioradialis as well as the bicep. Great for overall arm thickness and forearm development.' },
          ]
        },
      ]
    },
    Legs: {
      emoji: '🦵', color: '#22c55e',
      sections: [
        {
          title: 'Quads',
          workouts: [
            { name: 'Barbell Back Squat', setup: 'Bar on traps, feet shoulder width, squat to parallel or below, drive up through heels.', sets: '4 sets of 5-8 reps', tip: 'Keep your chest up and knees tracking over your toes. Dont let your heels rise. Depth is important — break parallel for full quad and glute development.' },
            { name: 'Leg Press', setup: 'Feet shoulder width on platform, lower to 90 degrees, press back to near lockout.', sets: '4 sets of 10-12 reps', tip: 'Dont lock out fully at the top — keep tension on the muscle. Feet higher targets hamstrings, feet lower targets quads more.' },
            { name: 'Bulgarian Split Squat', setup: 'Rear foot elevated on bench, front foot forward. Lower rear knee toward floor, drive up.', sets: '3 sets of 10 each leg', tip: 'One of the hardest but most effective leg exercises. Keep your torso upright. Front foot far enough forward that your shin stays vertical.' },
          ]
        },
        {
          title: 'Hamstrings & Glutes',
          workouts: [
            { name: 'Romanian Deadlift', setup: 'Stand with bar, hinge at hips pushing them back, lower bar along legs until hamstrings fully stretched.', sets: '4 sets of 8-10 reps', tip: 'Feel the hamstring stretch, not lower back. Soft knee bend throughout. Bar stays close to your body the entire way down and back up.' },
            { name: 'Hip Thrust', setup: 'Upper back on bench, barbell over hips, drive hips up to full extension and squeeze glutes hard.', sets: '4 sets of 10-12 reps', tip: 'The best exercise for glute development. Full hip extension at the top — dont short rep this. Chin tucked, core braced.' },
            { name: 'Leg Curl', setup: 'Prone on machine, curl weight toward glutes through full range of motion.', sets: '3 sets of 12-15 reps', tip: 'Hamstrings are often undertrained. Slow the eccentric down — 3 seconds down. Full stretch at the bottom, full contraction at the top.' },
          ]
        },
        {
          title: 'Calves',
          workouts: [
            { name: 'Standing Calf Raise', setup: 'Toes on edge of platform, full range of motion — deep stretch to full extension.', sets: '4 sets of 15-20 reps', tip: 'Calves respond well to high volume and full range. Most people short rep these. Go slow, stretch fully at the bottom, pause at the top.' },
          ]
        },
      ]
    },
    HIIT: {
      emoji: '🔥', color: '#ef4444',
      sections: [
        {
          title: 'Bodyweight HIIT',
          workouts: [
            { name: 'Tabata Circuit', setup: '8 exercises, 20 seconds on, 10 seconds off. Burpees, mountain climbers, jump squats, high knees, press ups, jumping lunges, plank holds, sprints.', sets: '4 rounds — 16 minutes total', tip: 'Tabata is short but brutal when done properly. The intensity in those 20 seconds needs to be maximum effort — if you are comfortable, you are not working hard enough.' },
            { name: 'EMOM (Every Minute on the Minute)', setup: 'Set a 20 minute timer. Each minute do 10 burpees, rest for remainder of minute.', sets: '20 rounds', tip: 'As you fatigue, your rest time shrinks. Aim to keep your form perfect even when tired. Modify to 8 reps if needed but keep moving.' },
            { name: 'Pyramid Circuit', setup: '1 burpee, 2 press ups, 3 squats, 4 lunges, 5 sit ups. Then go back down. No rest between exercises.', sets: '3-4 full pyramids', tip: 'The pyramid structure means you work multiple muscle groups without extended rest. Focus on breathing — exhale on the effort.' },
          ]
        },
        {
          title: 'Weighted HIIT',
          workouts: [
            { name: 'Kettlebell Swings + Sprints', setup: '20 kettlebell swings, immediately sprint 20 yards and back. Rest 60 seconds.', sets: '8 rounds', tip: 'The swing is a hip hinge, not a squat. Drive your hips forward explosively. The bell should float, not be muscled up.' },
            { name: 'Dumbbell Complex', setup: '6 reps each of: romanian deadlift, bent over row, hang clean, front squat, push press. No putting the dumbbells down.', sets: '5 rounds, rest 90 seconds', tip: 'Choose a weight that your weakest movement can handle. The challenge is metabolic, not maximal strength. Keep form tight throughout.' },
          ]
        },
      ]
    },
    Mobility: {
      emoji: '🧘', color: '#f59e0b',
      sections: [
        {
          title: 'Hip Mobility',
          workouts: [
            { name: '90/90 Hip Stretch', setup: 'Sit on floor with both legs at 90 degree angles in front and to the side. Rotate between positions.', sets: '3 sets of 60 seconds each side', tip: 'Most important stretch for desk workers and athletes. Tight hips limit squatting depth, running efficiency and lower back health.' },
            { name: 'Deep Squat Hold', setup: 'Feet shoulder width, toes slightly out. Lower into a deep squat and hold using elbows to push knees out.', sets: '3 sets of 60-90 seconds', tip: 'Use a wall or pole for assistance if needed. Rock side to side gently. This is a skill — practice daily and it will improve significantly.' },
            { name: 'Hip Flexor Lunge Stretch', setup: 'Kneeling lunge position. Drive hips forward until you feel a deep stretch in the front hip.', sets: '3 sets of 60 seconds each side', tip: 'Squeeze the glute of your rear leg — this intensifies the hip flexor stretch. Tight hip flexors cause anterior pelvic tilt and lower back pain.' },
          ]
        },
        {
          title: 'Thoracic & Shoulder',
          workouts: [
            { name: 'Thoracic Rotation on Floor', setup: 'Lie on side, knees stacked at 90 degrees. Rotate upper body, reaching top arm across to opposite side.', sets: '2 sets of 10 each side', tip: 'Keep your knees stacked — the rotation should come from your upper back, not your lower back. Essential for shoulder health and posture.' },
            { name: 'Band Pull Aparts', setup: 'Hold resistance band at shoulder height, arms straight. Pull apart until band touches chest.', sets: '3 sets of 20', tip: 'Underrated exercise for shoulder health. Counteracts all the internal rotation from pressing. Do these daily as a warm-up for upper body sessions.' },
            { name: 'Wall Slides', setup: 'Stand against wall, arms in goalpost position. Slide arms overhead while keeping forearms on wall.', sets: '3 sets of 12', tip: 'If your forearms lose contact with the wall, your shoulder mobility is a limiting factor. Go only as high as you can maintain contact.' },
          ]
        },
      ]
    },
    Cardio: {
      emoji: '🏃', color: '#06b6d4',
      sections: [
        {
          title: 'Running',
          workouts: [
            { name: 'Zone 2 Easy Run', setup: 'Run at a conversational pace — you should be able to speak in full sentences. 30-45 minutes.', sets: '1 session, 3-4x per week', tip: 'Most cardio should be Zone 2. Builds your aerobic base, improves fat burning, and is sustainable long term. Do not neglect this for HIIT only.' },
            { name: 'Interval Sprints', setup: '400m at 80% effort, walk 200m. Repeat 6-8 times.', sets: '6-8 intervals', tip: 'The walk recovery is intentional — you should feel ready to go again. These build VO2 max more effectively than steady state cardio.' },
            { name: 'Fartlek Run', setup: 'During a 30 minute run, randomly accelerate to near sprint for 30-60 seconds, then recover at easy pace.', sets: '1 session, 30 minutes', tip: 'Fartlek means speed play in Swedish. Less structured than intervals but very effective. Great for football players who need to mix paces.' },
          ]
        },
        {
          title: 'Rowing & Cycling',
          workouts: [
            { name: 'Rowing Intervals', setup: '250m hard on the rower, 1 minute rest. Target consistent split times across all intervals.', sets: '8 intervals', tip: 'Drive with your legs first, then hinge back, then pull with your arms. Most people over-use their arms. 60% legs, 20% back, 20% arms.' },
            { name: 'Assault Bike Tabata', setup: '20 seconds all out on assault bike, 10 seconds off.', sets: '8 rounds — 4 minutes', tip: 'Possibly the most brutal 4 minutes in fitness. The assault bike resists harder the harder you push. Arms and legs together.' },
          ]
        },
      ]
    },
  }

  const cat = content[category]
  if (!cat) return null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${cat.color}20 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('suggested-workouts')} style={{ background: 'none', border: 'none', color: cat.color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `2.5px solid ${cat.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', background: '#13131f', boxShadow: `0 0 16px ${cat.color}40` }}>{cat.emoji}</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{category}</h1>
        </div>

        {cat.sections.map((section) => (
          <div key={section.title} style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: cat.color, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{section.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.workouts.map((workout) => (
                <div key={workout.name} style={{ background: '#13131f', border: `1px solid ${cat.color}20`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '18px' }}>
                  <div style={{ fontWeight: '800', fontSize: '15px', marginBottom: '8px' }}>{workout.name}</div>
                  <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 10px', lineHeight: '1.6' }}>{workout.setup}</p>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: '20px', color: cat.color, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>📋 {workout.sets}</span>
                  </div>
                  <div style={{ background: '#0a0a0f', borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${cat.color}` }}>
                    <span style={{ fontSize: '11px', color: cat.color, fontWeight: '700' }}>💡 COACHING TIP  </span>
                    <span style={{ fontSize: '12px', color: '#888', lineHeight: '1.5' }}>{workout.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuggestedWorkouts({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { label: 'Push', emoji: '💪', color: '#a855f7', desc: 'Chest, shoulders and triceps' },
    { label: 'Pull', emoji: '🏋️', color: '#06b6d4', desc: 'Back and biceps' },
    { label: 'Legs', emoji: '🦵', color: '#22c55e', desc: 'Quads, hamstrings, glutes and calves' },
    { label: 'HIIT', emoji: '🔥', color: '#ef4444', desc: 'High intensity interval training' },
    { label: 'Mobility', emoji: '🧘', color: '#f59e0b', desc: 'Flexibility, stretching and recovery' },
    { label: 'Cardio', emoji: '🏃', color: '#06b6d4', desc: 'Running, rowing and cycling' },
  ]

  if (selectedCategory) {
    return <GymWorkoutDetail category={selectedCategory} setActiveNav={(nav) => {
      if (nav === 'suggested-workouts') setSelectedCategory(null)
      else setActiveNav(nav)
    }} />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('gym-hub')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Suggested Workouts</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Select a training focus</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {categories.map((cat) => (
            <div key={cat.label} onClick={() => setSelectedCategory(cat.label)} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${cat.color}10` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{cat.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cat.label}</div>
                <div style={{ color: '#666', fontSize: '13px' }}>{cat.desc}</div>
              </div>
              <div style={{ color: cat.color, fontSize: '24px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function FootballStats({ setActiveNav, footballSessions, setFootballSessions }: any) {
  const [tab, setTab] = useState<'matches' | 'training' | 'overall'>('overall')

  

  const formColor: Record<string, string> = { win: '#22c55e', loss: '#ef4444', draw: '#f59e0b' }
  const formLabel: Record<string, string> = { win: 'W', loss: 'L', draw: 'D' }

  const matches = footballSessions.filter((s: any) => s.session_type === 'Match' || s.sessionType === 'Match')

const totalGoals = footballSessions.reduce((sum: number, s: any) => sum + (s.goals || 0), 0)
const totalAssists = footballSessions.reduce((sum: number, s: any) => sum + (s.assists || 0), 0)
const totalShots = footballSessions.reduce((sum: number, s: any) => sum + (s.shots || 0), 0)
const totalOnTarget = footballSessions.reduce((sum: number, s: any) => sum + (s.shots_on_target || s.shotsOnTarget || 0), 0)
const totalKeyPasses = footballSessions.reduce((sum: number, s: any) => sum + (s.key_passes || s.keyPasses || 0), 0)

const shotAccuracy = totalShots > 0 ? Math.round((totalOnTarget / totalShots) * 100) : 0
const goalConversion = totalShots > 0 ? Math.round((totalGoals / totalShots) * 100) : 0

const averageRating = matches.length > 0
  ? (matches.reduce((sum: number, s: any) => sum + (s.rating || 0), 0) / matches.length).toFixed(1)
  : '0.0'

const wins = matches.filter((s: any) => s.result === 'Win').length
const winRate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0
const recentMatches = matches.slice(0, 5)

const opponentHistory = footballSessions
  .filter((s: any) => s.opponent)
  .reduce((acc: any, s: any) => {
    const opp = s.opponent
    if (!acc[opp]) acc[opp] = { wins: 0, losses: 0, draws: 0 }
    if (s.result === 'Win') acc[opp].wins++
    else if (s.result === 'Loss') acc[opp].losses++
    else if (s.result === 'Draw') acc[opp].draws++
    return acc
  }, {})
const opponentList = Object.entries(opponentHistory)
  .map(([opponent, record]: any) => ({ opponent, ...record }))
  .sort((a, b) => (b.wins + b.losses + b.draws) - (a.wins + a.losses + a.draws))

const positionStats = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'].map((pos) => {
  const posMatches = matches.filter((s: any) => s.position === pos)
  const posGoals = posMatches.reduce((sum: number, s: any) => sum + (s.goals || 0), 0)
  const posAssists = posMatches.reduce((sum: number, s: any) => sum + (s.assists || 0), 0)
  const posRating = posMatches.length > 0
    ? (posMatches.reduce((sum: number, s: any) => sum + (s.rating || 0), 0) / posMatches.length).toFixed(1)
    : '0.0'

  return {
    pos,
    matches: posMatches.length,
    goals: posGoals,
    assists: posAssists,
    rating: posRating
  }
}).filter((p) => p.matches > 0)

const bestRating = matches.length > 0 ? Math.max(...matches.map((s: any) => s.rating || 0)) : 0
const mostGoals = matches.length > 0 ? Math.max(...matches.map((s: any) => s.goals || 0)) : 0
const mostAssists = matches.length > 0 ? Math.max(...matches.map((s: any) => s.assists || 0)) : 0
const mostShots = matches.length > 0 ? Math.max(...matches.map((s: any) => s.shots || 0)) : 0
const bestPassing = matches.length > 0 ? Math.max(...matches.map((s: any) => s.pass_accuracy || 0)) : 0
const mostKeyPasses = matches.length > 0 ? Math.max(...matches.map((s: any) => s.key_passes || 0)) : 0

const handleDeleteSession = async (sessionId: any) => {
  setFootballSessions(footballSessions.filter((s: any) => s.id !== sessionId))
  await supabase.from('football_sessions').delete().eq('id', sessionId)
}

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>

        <button onClick={() => setActiveNav('football-hub')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>My Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px' }}>Your football performance data</p>
{opponentList.length > 0 && (
  <div style={{ background: '#13131f', border: '1px solid #22c55e25', borderLeft: '4px solid #22c55e', borderRadius: '20px', padding: '18px', marginBottom: '20px' }}>
    <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>⚽ OPPONENT HISTORY</div>
    {opponentList.map((o: any) => (
      <div key={o.opponent} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e1e30' }}>
        <span style={{ fontWeight: '700', fontSize: '14px' }}>{o.opponent}</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: '#22c55e', fontWeight: '800', fontSize: '13px' }}>{o.wins}W</span>
          <span style={{ color: '#aaa', fontWeight: '800', fontSize: '13px' }}>{o.draws}D</span>
          <span style={{ color: '#ef4444', fontWeight: '800', fontSize: '13px' }}>{o.losses}L</span>
        </div>
      </div>
    ))}
  </div>
)}

        <div style={{
  background: 'linear-gradient(135deg, #13131f, #10101a)',
  border: '1px solid #22c55e25',
  borderLeft: '4px solid #22c55e',
  borderRadius: '20px',
  padding: '18px',
  marginBottom: '22px'
}}>
  <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: '900', marginBottom: '14px' }}>
    MATCH ANALYTICS
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
    {[
      { label: 'Matches', value: matches.length, color: '#22c55e' },
      { label: 'Avg Rating', value: averageRating, color: '#eab308' },
      { label: 'Shot Acc.', value: `${shotAccuracy}%`, color: '#06b6d4' },
      { label: 'Win Rate', value: `${winRate}%`, color: '#a855f7' },
      { label: 'Goals', value: totalGoals, color: '#22c55e' },
      { label: 'Assists', value: totalAssists, color: '#06b6d4' },
      { label: 'Key Passes', value: totalKeyPasses, color: '#f59e0b' },
      { label: 'Conversion', value: `${goalConversion}%`, color: '#ef4444' },
    ].map((stat) => (
      <div key={stat.label} style={{
        background: '#0a0a0f',
        border: `1px solid ${stat.color}25`,
        borderRadius: '14px',
        padding: '14px',
        textAlign: 'center'
      }}>
        <div style={{ color: stat.color, fontSize: '22px', fontWeight: '900' }}>
          {stat.value}
        </div>
        <div style={{ color: '#666', fontSize: '10px', fontWeight: '800', marginTop: '4px' }}>
          {stat.label}
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Form Strip */}
        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>FORM</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {recentMatches.slice(0, 5).map((s: any, i: number) => (
              <div key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${s.result === 'Win' ? '#22c55e' : s.result === 'Loss' ? '#ef4444' : '#f59e0b'}20`, border: `1.5px solid ${s.result === 'Win' ? '#22c55e' : s.result === 'Loss' ? '#ef4444' : '#f59e0b'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: s.result === 'Win' ? '#22c55e' : s.result === 'Loss' ? '#ef4444' : '#f59e0b' }}>{s.result === 'Win' ? 'W' : s.result === 'Loss' ? 'L' : 'D'}</div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#13131f', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
          {(['overall', 'matches', 'training'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, background: tab === t ? '#1e1e35' : 'none', border: tab === t ? '1px solid #2a2a40' : '1px solid transparent', borderRadius: '10px', color: tab === t ? 'white' : '#555', padding: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>

        {/* Overall Tab */}
        {tab === 'overall' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Total Sessions', value: footballSessions.length, color: '#a855f7', emoji: '📅' },
                { label: 'Hours on Pitch', value: Math.round(footballSessions.reduce((sum: number, s: any) => sum + (s.duration || 0), 0) / 60) + 'h', color: '#06b6d4', emoji: '⏱️' },
                { label: 'Goals Scored', value: totalGoals, color: '#22c55e', emoji: '⚽' },
                { label: 'Assists', value: totalAssists, color: '#f59e0b', emoji: '🅰️' },
                { label: 'Total Cards', value: footballSessions.reduce((sum: number, s: any) => sum + (s.yellowCards || s.yellow_cards || 0) + (s.redCards || s.red_cards || 0), 0), color: '#ef4444', emoji: '🟨' },
                { label: 'Win Rate', value: `${winRate}%`, color: '#22c55e', emoji: '🏆' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.emoji}</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matches Tab */}
        {tab === 'matches' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Win/Loss/Draw row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Wins', value: matches.filter((s: any) => s.result === 'Win').length, color: '#22c55e' },
                { label: 'Draws', value: matches.filter((s: any) => s.result === 'Draw').length, color: '#f59e0b' },
                { label: 'Losses', value: matches.filter((s: any) => s.result === 'Loss').length, color: '#ef4444' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#13131f', border: `1px solid ${s.color}25`, borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* Full stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Goals', value: totalGoals, color: '#22c55e', emoji: '⚽' },
                { label: 'Assists', value: totalAssists, color: '#06b6d4', emoji: '🅰️' },
                { label: 'Yellow Cards', value: footballSessions.reduce((sum: number, s: any) => sum + (s.yellowCards || s.yellow_cards || 0), 0), color: '#eab308', emoji: '🟨' },
                { label: 'Red Cards', value: footballSessions.reduce((sum: number, s: any) => sum + (s.redCards || s.red_cards || 0), 0), color: '#ef4444', emoji: '🟥' },
                { label: 'Tackles', value: footballSessions.reduce((sum: number, s: any) => sum + (s.tackles || 0), 0), color: '#a855f7', emoji: '🛡️' },
                { label: 'Blocks', value: footballSessions.reduce((sum: number, s: any) => sum + (s.blocks || 0), 0), color: '#f97316', emoji: '✋' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderLeft: `3px solid ${stat.color}`, borderRadius: '14px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '22px' }}>{stat.emoji}</span>
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '11px', color: '#555', fontWeight: '600' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

{tab === 'matches' && recentMatches.length === 0 && (
          <div onClick={() => setActiveNav('log-session')} style={{ background: '#13131f', border: '1px solid #22c55e25', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '28px' }}>⚽</span>
            <div style={{ color: '#22c55e', fontWeight: '700', fontSize: '14px', marginTop: '8px' }}>No matches logged yet</div>
            <div style={{ color: '#555', fontSize: '12px', marginTop: '4px', marginBottom: '10px' }}>Tap to log your first match</div>
            <span style={{ background: '#22c55e15', border: '1px solid #22c55e40', borderRadius: '20px', color: '#22c55e', padding: '6px 14px', fontSize: '11px', fontWeight: '700' }}>Log Session →</span>
          </div>
        )}

        {tab === 'matches' && recentMatches.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            <h3 style={{ fontSize: '13px', color: '#aaa', fontWeight: '700', margin: '0 0 8px' }}>RECENT MATCHES</h3>
            {recentMatches.map((s: any, i: number) => {
              const outcomeColor = s.result === 'Win' ? '#22c55e' : s.result === 'Loss' ? '#ef4444' : '#f59e0b'
              return (
                <div key={s.id || i} style={{ background: '#13131f', border: `1px solid ${outcomeColor}25`, borderLeft: `4px solid ${outcomeColor}`, borderRadius: '16px', padding: '16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '15px' }}>{s.opponent ? `vs ${s.opponent}` : s.matchType || s.match_type || 'Match'}</div>
                      <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{s.matchType || s.match_type || ''} · {s.date || 'Recent'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {s.yourScore !== undefined && <div style={{ fontSize: '22px', fontWeight: '900' }}>{s.yourScore}–{s.opponentScore}</div>}
                      <span style={{ background: outcomeColor, color: 'white', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '20px' }}>{s.result?.toUpperCase() || 'PLAYED'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    {s.goals > 0 && <span style={{ fontSize: '12px', color: '#aaa' }}>⚽ {s.goals} goals</span>}
                    {s.assists > 0 && <span style={{ fontSize: '12px', color: '#aaa' }}>🅰️ {s.assists} assists</span>}
                    {s.shots > 0 && <span style={{ fontSize: '12px', color: '#aaa' }}>🎯 {s.shots} shots</span>}
                    {s.rating > 0 && <span style={{ fontSize: '12px', color: '#eab308', fontWeight: '700' }}>⭐ {s.rating}/10</span>}
                  </div>
                  </div>
                  <button onClick={() => handleDeleteSession(s.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
                </div>
              )
            })}
          </div>
        )}

        {/* Training Tab */}
        {tab === 'training' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '4px' }}>
              {[
                { label: 'Total Sessions', value: footballSessions.filter((s: any) => s.sessionType !== 'Match' && s.session_type !== 'Match').length, color: '#22c55e', emoji: '📅' },
                { label: 'Total Minutes', value: footballSessions.filter((s: any) => s.sessionType !== 'Match' && s.session_type !== 'Match').reduce((sum: number, s: any) => sum + (s.duration || 0), 0), color: '#06b6d4', emoji: '⏱️' },
                { label: 'With Club', value: footballSessions.filter((s: any) => s.trainingContext === 'With Club' || s.training_context === 'With Club').length, color: '#a855f7', emoji: '👥' },
                { label: 'Personal', value: footballSessions.filter((s: any) => s.trainingContext === 'Personal' || s.training_context === 'Personal').length, color: '#f59e0b', emoji: '🧍' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{stat.emoji}</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: '14px', color: '#aaa', fontWeight: '600', margin: '8px 0 4px' }}>RECENT TRAINING</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footballSessions.filter((s: any) => s.sessionType !== 'Match' && s.session_type !== 'Match').length === 0 && (
                <div onClick={() => setActiveNav('log-session')} style={{ background: '#13131f', border: '1px solid #22c55e25', borderRadius: '14px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: '28px' }}>⚽</span>
                  <div style={{ color: '#22c55e', fontWeight: '700', fontSize: '14px', marginTop: '8px' }}>No training sessions yet</div>
                  <div style={{ color: '#555', fontSize: '12px', marginTop: '4px', marginBottom: '10px' }}>Tap to log your first session</div>
                  <span style={{ background: '#22c55e15', border: '1px solid #22c55e40', borderRadius: '20px', color: '#22c55e', padding: '6px 14px', fontSize: '11px', fontWeight: '700' }}>Log Session →</span>
                </div>
              )}
              {footballSessions.filter((s: any) => s.sessionType !== 'Match' && s.session_type !== 'Match').slice(0, 6).map((s: any, i: number) => (
                <div key={i} style={{ background: '#13131f', border: '1px solid #22c55e20', borderLeft: '4px solid #22c55e', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ fontWeight: '800', fontSize: '14px' }}>{s.sessionType || s.session_type || 'Training'} {s.trainingContext ? `· ${s.trainingContext}` : ''}</div>
                  <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{s.duration || 0} mins · {s.date || 'Recent'}</div>
                  {s.notes && <div style={{ color: '#555', fontSize: '12px', marginTop: '4px', fontStyle: 'italic' }}>"{s.notes}"</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
function LogWorkout({ setActiveNav, gymSessions, setGymSessions, addSocialPost, triggerPRToast }: any) {
  const [workoutTab, setWorkoutTab] = useState<'log' | 'history'>('log')
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null)
  const [workoutTitle, setWorkoutTitle] = useState('')
  const [workoutDate, setWorkoutDate] = useState(() => new Date().toISOString().split('T')[0])
  const [duration, setDuration] = useState('')
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', weight: '' }])
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)
  const [rpe, setRpe] = useState('7')

  const pastWorkouts = gymSessions || []

  const addExercise = () => setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }])
  
  const removeExercise = (index: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index))
    } else {
      setExercises([{ name: '', sets: '', reps: '', weight: '' }])
    }
  }

  const updateExercise = (i: number, field: string, value: string) => {
    const updated = [...exercises]
    updated[i] = { ...updated[i], [field]: value }
    setExercises(updated)
  }

  const handleSave = () => {
    const validExercises = exercises.filter(e => e.name.trim() !== '')
    const newWorkout = {
      id: Date.now(),
      title: workoutTitle || 'Gym Workout',
      date: workoutDate || new Date().toISOString().split('T')[0],
      duration: parseInt(duration) || 0,
      exercises: validExercises.length > 0 ? validExercises : exercises,
      notes,
      rpe: parseInt(rpe) || 7,
    }
    setGymSessions([newWorkout, ...(gymSessions || [])])

    // Check for PRs
    if (triggerPRToast && validExercises.length > 0) {
      const previousPRs: Record<string, number> = {}
      ;(gymSessions || []).forEach((s: any) => {
        ;(s.exercises || []).forEach((ex: any) => {
          if (ex.name && ex.weight && (!previousPRs[ex.name] || parseFloat(ex.weight) > previousPRs[ex.name])) {
            previousPRs[ex.name] = parseFloat(ex.weight)
          }
        })
      })

      let newPRFound = false
      let prName = ''
      let prWeight = ''
      validExercises.forEach((ex: any) => {
        if (ex.name && ex.weight) {
          const weight = parseFloat(ex.weight)
          if (!previousPRs[ex.name] || weight > previousPRs[ex.name]) {
            newPRFound = true
            prName = ex.name
            prWeight = `${weight}kg`
          }
        }
      })

      if (newPRFound) {
        triggerPRToast('🏆 New Gym PR!', `${prName}: ${prWeight}`, '🏋️', '#a855f7')
      }
    }

    // Check for improvements
    if (triggerPRToast && validExercises.length > 0) {
      const previousPRs: Record<string, number> = {}
      ;(gymSessions || []).forEach((s: any) => {
        ;(s.exercises || []).forEach((ex: any) => {
          if (ex.name && ex.weight && (!previousPRs[ex.name] || parseFloat(ex.weight) > previousPRs[ex.name])) {
            previousPRs[ex.name] = parseFloat(ex.weight)
          }
        })
      })

      let improvementFound = false
      let bestExercise = ''
      let bestWeight = ''
      let oldWeight = ''
      validExercises.forEach((ex: any) => {
        if (ex.name && ex.weight) {
          const weight = parseFloat(ex.weight)
          const prev = previousPRs[ex.name]
          if (prev && weight > prev) {
            improvementFound = true
            bestExercise = ex.name
            bestWeight = `${weight}kg`
            oldWeight = `${prev}kg`
          }
        }
      })

      if (improvementFound) {
        setSessionComparison({
          sport: 'Gym', emoji: '🏋️', color: '#a855f7',
          title: `New PR on ${bestExercise}! 💪`,
          detail: `Previous best: ${oldWeight} · Today: ${bestWeight}`,
          improvement: true
        })
        setShowComparison(true)
        setTimeout(() => setShowComparison(false), 5000)
      }
    }
    
    addSocialPost({
      sport: 'Gym',
      sportColor: '#a855f7',
      emoji: '🏋️',
      caption: `Smashed a ${workoutTitle || 'Gym Session'} — ⏱️ ${duration || 0} mins · ⚡ ${validExercises.length || exercises.length} Exercises crushed at Intensity RPE ${rpe}/10!`
    })
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setWorkoutTitle('')
      setDuration('')
      setNotes('')
      setExercises([{ name: '', sets: '', reps: '', weight: '' }])
    }, 2000)
  }

  if (validExercises.length > 0) {
    const maxWeight = Math.max(...validExercises.filter((e: any) => e.weight).map((e: any) => parseFloat(e.weight) || 0))
    checkAchievement('gym', maxWeight)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto', position: 'relative' }}>
      {/* Premium Ambient Glow backgrounds */}
      <div style={{ position: 'absolute', top: '-60px', left: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 75%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '300px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 20px 100px', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
        
        {/* Back Navigation Button */}
        <button onClick={() => setActiveNav('gym-hub')} style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: '#c084fc', fontSize: '13px', fontWeight: '700', borderRadius: '20px', padding: '6px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px', transition: 'all 0.2s' }}>
          ← Back Hub
        </button>

        {/* Premium Custom Tab Bar Control */}
        <div style={{ display: 'flex', background: '#121222', borderRadius: '14px', padding: '4px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.04)' }}>
          {(['log', 'history'] as const).map((t) => (
            <button key={t} onClick={() => setWorkoutTab(t)} style={{ flex: 1, background: workoutTab === t ? 'linear-gradient(135deg, #a855f7, #7e22ce)' : 'transparent', border: 'none', borderRadius: '10px', color: workoutTab === t ? 'white' : '#777799', padding: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: workoutTab === t ? '0 4px 12px rgba(168,85,247,0.3)' : 'none', transition: 'all 0.2s' }}>
              {t === 'log' ? '📝 Log Workout' : '📅 Past Workouts'}
            </button>
          ))}
        </div>

        {workoutTab === 'history' ? (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 4px', letterSpacing: '-0.5px' }}>Past Workouts</h1>
            <p style={{ color: '#8888aa', fontSize: '13px', margin: '0 0 24px' }}>Analyze your progression and previous splits</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pastWorkouts.length === 0 && (
                <div style={{ background: '#121222', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '18px', padding: '30px 20px', textAlign: 'center', color: '#666688', fontSize: '13px' }}>
                  🏋️ No workout entries registered yet. Start lifting!
                </div>
              )}
              {pastWorkouts.map((workout: any, i: number) => (
                <div key={i} style={{ background: 'linear-gradient(145deg, #121222, #0d0d1a)', border: `1px solid ${expandedWorkout === i ? '#a855f760' : 'rgba(255,255,255,0.05)'}`, borderRadius: '18px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: expandedWorkout === i ? '0 8px 24px rgba(168,85,247,0.1)' : 'none' }} onClick={() => setExpandedWorkout(expandedWorkout === i ? null : i)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '15px', color: '#fff', marginBottom: '4px' }}>{workout.title || 'Workout'}</div>
                      <div style={{ color: '#666688', fontSize: '12px', display: 'flex', gap: '10px' }}>
                        <span>📅 {workout.date}</span>
                        <span>⏱️ {workout.duration}m</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '20px' }}>
                        {workout.exercises ? workout.exercises.filter((e: any) => e.name).length : 0} Moves
                      </span>
                      <span style={{ color: '#a855f7', fontSize: '14px', transform: expandedWorkout === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>❯</span>
                    </div>
                  </div>
                  
                  {expandedWorkout === i && (
                    <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }} onClick={(e) => e.stopPropagation()}>
                      {workout.notes && <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#a855f7', fontStyle: 'italic', background: 'rgba(168,85,247,0.05)', padding: '8px 12px', borderRadius: '8px' }}>“{workout.notes}”</p>}
                      
                      {workout.exercises && workout.exercises.filter((e: any) => e.name).length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', fontSize: '11px', color: '#666688', fontWeight: '700', textAlign: 'center', paddingBottom: '4px' }}>
                            <span style={{ textAlign: 'left' }}>EXERCISE</span><span>SETS</span><span>REPS</span><span>KG</span>
                          </div>
                          {workout.exercises.filter((e: any) => e.name).map((ex: any, idx: number) => (
                            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.03)', fontSize: '13px', textAlign: 'center', alignItems: 'center' }}>
                              <span style={{ fontWeight: '700', color: '#ddd', textAlign: 'left' }}>{ex.name}</span>
                              <span style={{ color: '#c084fc', fontWeight: '600' }}>{ex.sets || 0}</span>
                              <span style={{ color: '#06b6d4', fontWeight: '600' }}>{ex.reps || 0}</span>
                              <span style={{ color: '#eab308', fontWeight: '600' }}>{ex.weight || 0}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ color: '#666688', fontSize: '12px' }}>No exercises logged.</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 4px', letterSpacing: '-0.5px' }}>Log a Workout</h1>
            <p style={{ color: '#8888aa', fontSize: '13px', margin: '0 0 24px' }}>Record your gym session metrics cleanly</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#a855f7', fontWeight: '800', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>WORKOUT TITLE</label>
                <input value={workoutTitle} onChange={(e) => setWorkoutTitle(e.target.value)} placeholder="e.g. Push Day, Legs" style={{ width: '100%', background: '#121222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#a855f7', fontWeight: '800', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>DURATION (MINS)</label>
                {timerSeconds >= 60 && !duration && (
                <div onClick={() => setDuration(getTimerMinutes().toString())} style={{ background: '#22c55e15', border: '1px solid #22c55e30', borderRadius: '8px', padding: '6px 10px', fontSize: '11px', color: '#22c55e', fontWeight: '600', cursor: 'pointer', display: 'inline-block', marginBottom: '8px' }}>
                  ⏱️ Use timer: {getTimerMinutes()} min
                </div>
              )}
                <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="45" style={{ width: '100%', background: '#121222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', color: '#a855f7', fontWeight: '800', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>DATE</label>
              <input value={workoutDate} onChange={(e) => setWorkoutDate(e.target.value)} placeholder="e.g. Mon 2 Jun" style={{ width: '100%', background: '#121222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', padding: '12px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', color: '#a855f7', fontWeight: '800', letterSpacing: '0.5px' }}>EXERCISES</label>
              <button onClick={addExercise} style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid #a855f7', borderRadius: '8px', color: '#c084fc', padding: '6px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>+ Add Row</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {exercises.map((ex, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '14px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
                    <input value={ex.name} onChange={(e) => updateExercise(i, 'name', e.target.value)} placeholder="Exercise name (e.g. Bench Press)" style={{ flex: 1, background: '#121222', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', color: 'white', padding: '10px 12px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} />
                    {exercises.length > 1 && (
                      <button onClick={() => removeExercise(i)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>✕</button>
                    )}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: '#666688', fontWeight: '700', display: 'block', marginBottom: '4px', textAlign: 'center' }}>Sets</span>
                      <input value={ex.sets} onChange={(e) => updateExercise(i, 'sets', e.target.value)} placeholder="0" style={{ width: '100%', background: '#090915', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#c084fc', padding: '8px', fontSize: '13px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box', outline: 'none' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: '#666688', fontWeight: '700', display: 'block', marginBottom: '4px', textAlign: 'center' }}>Reps</span>
                      <input value={ex.reps} onChange={(e) => updateExercise(i, 'reps', e.target.value)} placeholder="0" style={{ width: '100%', background: '#090915', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#06b6d4', padding: '8px', fontSize: '13px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box', outline: 'none' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: '#666688', fontWeight: '700', display: 'block', marginBottom: '4px', textAlign: 'center' }}>kg</span>
                      <input value={ex.weight} onChange={(e) => updateExercise(i, 'weight', e.target.value)} placeholder="0" style={{ width: '100%', background: '#090915', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#eab308', padding: '8px', fontSize: '13px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box', outline: 'none' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            

            

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '11px', color: '#a855f7', fontWeight: '800', letterSpacing: '0.5px' }}>SESSION INTENSITY (RPE)</label>
                <span style={{ color: '#a855f7', fontSize: '14px', fontWeight: '800' }}>{rpe}/10</span>
              </div>
              <div style={{ background: '#121222', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', padding: '16px' }}>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={rpe}
                  onChange={(e) => setRpe(e.target.value)}
                  style={{ width: '100%', accentColor: '#a855f7', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#555577', marginTop: '6px', fontWeight: '600' }}>
                  <span>Warmup (1-4)</span>
                  <span>Hypertrophy (5-8)</span>
                  <span>Max Effort (9-10)</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>NOTES</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the workout feel?" rows={3} style={{ width: '100%', background: '#121222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '13px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', outline: 'none' }} />
            </div>

            <button onClick={handleSave} style={{ width: '100%', background: saved ? '#16a34a' : 'linear-gradient(135deg, #a855f7, #7c3aed)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 6px 20px rgba(168,85,247,0.25)', transition: 'all 0.2s' }}>
              {saved ? '✓ Workout Saved!' : 'Save Workout'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function PersonalRecords({ setActiveNav, gymSessions }: { setActiveNav: (nav: string) => void, gymSessions: any[] }) {
  const prs = (() => {
    const liftMap: Record<string, { weight: number, date: string }> = {}

    gymSessions.forEach((session: any) => {
      ;(session.exercises || []).forEach((ex: any) => {
        if (!ex.name) return
        const weightNum = parseFloat(ex.weight) || 0
        if (weightNum <= 0) return

        if (!liftMap[ex.name] || weightNum > liftMap[ex.name].weight) {
          liftMap[ex.name] = { weight: weightNum, date: session.date || 'Unknown' }
        }
      })
    })

    const colors = ['#a855f7', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#f97316', '#eab308', '#3b82f6']

    return Object.entries(liftMap)
      .map(([exercise, data], i) => ({
        exercise,
        weight: `${data.weight}kg`,
        date: data.date,
        color: colors[i % colors.length]
      }))
      .sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight))
  })()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('gym-hub')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px' }}>Personal Records</h1>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Automatically tracked from your logged workouts</p>
        </div>

        {prs.length === 0 && (
          <div style={{ background: '#13131f', border: '1px dashed #1e1e30', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#666', fontSize: '13px' }}>
            No PRs yet. Log a workout with exercise weights to start tracking records.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {prs.map((pr, i) => (
            <div key={i} style={{ background: '#13131f', border: `1px solid ${pr.color}25`, borderLeft: `4px solid ${pr.color}`, borderRadius: '14px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>{pr.exercise}</div>
                <div style={{ color: '#555', fontSize: '12px', marginTop: '3px' }}>{pr.date}</div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: pr.color }}>{pr.weight}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function GymHub({ setActiveNav, gymSessions }: { setActiveNav: (nav: string) => void, gymSessions: any[] }) {
  const [activeNav, setActiveNavLocal] = useState('track')
  const recentHighRPE = (gymSessions || []).slice(0, 3).filter((s: any) => (parseInt(s.rpe) || 0) >= 8)
  const loadWarning = (gymSessions || []).length >= 3 && recentHighRPE.length === 3
  const options = [
    { id: 'log-workout', label: 'Log a Workout', emoji: '📝', desc: 'Record sets, reps and weight', color: '#a855f7' },
    { id: 'personal-records', label: 'Personal Records', emoji: '🏆', desc: 'View and update your PRs', color: '#f59e0b' },
    { id: 'suggested-workouts', label: 'Suggested Workouts', emoji: '💡', desc: 'Browse workout plans', color: '#06b6d4' },
    { id: 'gym-stats', label: 'My Stats', emoji: '📊', desc: 'Track your progress over time', color: '#22c55e' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '50px 24px 8px' }}>
          <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2.5px solid #a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', background: '#13131f', boxShadow: '0 0 16px #a855f750' }}>🏋️</div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>Gym Hub</h1>
              <p style={{ color: '#666', fontSize: '13px', margin: '2px 0 0' }}>What do you want to do?</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {loadWarning && (
            <div style={{ background: '#ef444412', border: '1px solid #ef444440', borderLeft: '4px solid #ef4444', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <div>
                <div style={{ fontWeight: '800', fontSize: '13px', color: '#ef4444' }}>High Training Load</div>
                <div style={{ color: '#aaa', fontSize: '12px', marginTop: '3px' }}>Your last 3 workouts were all rated RPE 8+. Consider an easier session or rest day.</div>
              </div>
            </div>
          )}
          {options.map((opt) => (
            <div key={opt.id} onClick={() => setActiveNav(opt.id)} style={{ background: '#13131f', border: `1px solid ${opt.color}30`, borderLeft: `4px solid ${opt.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${opt.color}10` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${opt.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{opt.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{opt.label}</div>
                <div style={{ color: '#666', fontSize: '13px' }}>{opt.desc}</div>
              </div>
              <div style={{ color: '#444', fontSize: '20px' }}>›</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#0d0d1a', borderTop: '1px solid #1e1e30', display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px', zIndex: 100 }}>
        {[{ id: 'home', label: 'Home', emoji: '🏠' }, { id: 'sports', label: 'Sports', emoji: '🏅' }, { id: 'track', label: 'Track', emoji: '📈' }, { id: 'social', label: 'Social', emoji: '👥' }, { id: 'profile', label: 'Profile', emoji: '👤' }].map((item) => (
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNav === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function TennisHub({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const options = [
    { id: 'log-tennis-session', label: 'Log a Session', emoji: '📝', desc: 'Singles, doubles or practice', color: '#eab308' },
    { id: 'tennis-matches', label: 'Matches & Results', emoji: '🎾', desc: 'Track scores, opponents and sets', color: '#06b6d4' },
    { id: 'suggested-tennis-drills', label: 'Suggested Drills', emoji: '💡', desc: 'Serve, rally, footwork and tactics', color: '#f59e0b' },
    { id: 'tennis-stats', label: 'My Stats', emoji: '📊', desc: 'Wins, sets, aces and consistency', color: '#a855f7' },
  ]

  return <SportHubTemplate setActiveNav={setActiveNav} title="Tennis Hub" emoji="🎾" color="#eab308" options={options} />
}

function RunningHub({ setActiveNav, runningSessions }: { setActiveNav: (nav: string) => void, runningSessions: any[] }) {
  const options = [
    { id: 'log-run', label: 'Log a Run', emoji: '📝', desc: 'Distance, pace, time and route feel', color: '#06b6d4' },
    { id: 'running-plans', label: 'Suggested Sessions', emoji: '💡', desc: '5K, speed, endurance and recovery', color: '#f59e0b' },
    { id: 'running-prs', label: 'Personal Records', emoji: '🏆', desc: 'Fastest 1K, 5K, 10K and longest run', color: '#22c55e' },
    { id: 'running-stats', label: 'My Stats', emoji: '📊', desc: 'Mileage, pace, streaks and progress', color: '#a855f7' },
  ]

  const recentHardRuns = (runningSessions || []).slice(0, 3).filter((s: any) => s.effort === 'Hard' || s.effort === 'Max')
  const loadWarning = (runningSessions || []).length >= 3 && recentHardRuns.length === 3

  const banner = loadWarning ? (
    <div style={{ background: '#ef444412', border: '1px solid #ef444440', borderLeft: '4px solid #ef4444', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '20px' }}>⚠️</span>
      <div>
        <div style={{ fontWeight: '800', fontSize: '13px', color: '#ef4444' }}>High Training Load</div>
        <div style={{ color: '#aaa', fontSize: '12px', marginTop: '3px' }}>Your last 3 runs were all Hard or Max effort. Consider an easy run or rest day.</div>
      </div>
    </div>
  ) : null

  return <SportHubTemplate setActiveNav={setActiveNav} title="Running Hub" emoji="🏃" color="#06b6d4" options={options} banner={banner} />
}
function BasketballHub({ setActiveNav, basketballSessions }: any) {
  const totalPoints = basketballSessions.reduce((sum: number, s: any) => sum + (s.points || 0), 0)
  const totalAssists = basketballSessions.reduce((sum: number, s: any) => sum + (s.assists || 0), 0)
  const totalRebounds = basketballSessions.reduce((sum: number, s: any) => sum + (s.rebounds || 0), 0)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color: '#f97316', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>🏀 Basketball</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track games, shooting and training</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Sessions', value: basketballSessions.length, color: '#f97316' },
            { label: 'Points', value: totalPoints, color: '#22c55e' },
            { label: 'Assists', value: totalAssists, color: '#06b6d4' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '700' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { title: 'Log Basketball Session', desc: 'Record points, assists, rebounds and shots', emoji: '✚', nav: 'log-basketball', color: '#f97316' },
            { title: 'Basketball Stats', desc: 'View totals and performance trends', emoji: '📊', nav: 'basketball-stats', color: '#22c55e' },
            { title: 'Suggested Sessions', desc: 'Shooting, handling and conditioning plans', emoji: '💡', nav: 'basketball-plans', color: '#06b6d4' },
            { title: 'Fixtures & Results', desc: 'Add games and record scores', emoji: '📅', nav: 'basketball-fixtures', color: '#a855f7' },
          ].map((item) => (
            <div key={item.title} onClick={() => setActiveNav(item.nav)} style={{ background: '#13131f', border: `1px solid ${item.color}25`, borderLeft: `4px solid ${item.color}`, borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{item.desc}</div>
              </div>
              <div style={{ color: item.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function BoxingHub({ setActiveNav, boxingSessions }: any) {
  const totalRounds = boxingSessions.reduce((sum: number, s: any) => sum + (s.rounds || 0), 0)
  const totalPunches = boxingSessions.reduce((sum: number, s: any) => sum + (s.punches || 0), 0)
  const recentHighIntensity = boxingSessions.slice(0, 3).filter((s: any) => (s.intensity || 0) >= 8)
  const loadWarning = boxingSessions.length >= 3 && recentHighIntensity.length === 3

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>🥊 Boxing</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track boxing sessions, rounds and training</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Sessions', value: boxingSessions.length, color: '#ef4444' },
            { label: 'Rounds', value: totalRounds, color: '#f97316' },
            { label: 'Punches', value: totalPunches, color: '#06b6d4' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '700' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {loadWarning && (
          <div style={{ background: '#ef444412', border: '1px solid #ef444440', borderLeft: '4px solid #ef4444', borderRadius: '14px', padding: '14px 16px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '13px', color: '#ef4444' }}>High Training Load</div>
              <div style={{ color: '#aaa', fontSize: '12px', marginTop: '3px' }}>Your last 3 sessions were all intensity 8+. Consider lighter technical work or a rest day.</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { title: 'Log Boxing Session', desc: 'Record bag work, sparring, pads or conditioning', emoji: '✚', nav: 'log-boxing', color: '#ef4444' },
            { title: 'Boxing Stats', desc: 'View rounds, punches and training volume', emoji: '📊', nav: 'boxing-stats', color: '#f97316' },
            { title: 'Personal Records', desc: 'Most punches, best accuracy, longest session', emoji: '🏆', nav: 'boxing-records', color: '#a855f7' },
            { title: 'Training Plans', desc: 'Technique, footwork, defence and conditioning drills', emoji: '💡', nav: 'boxing-plans', color: '#06b6d4' },
          ].map((item) => (
            <div key={item.title} onClick={() => setActiveNav(item.nav)} style={{ background: '#13131f', border: `1px solid ${item.color}25`, borderLeft: `4px solid ${item.color}`, borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{item.desc}</div>
              </div>
              <div style={{ color: item.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function GolfHub({ setActiveNav, golfSessions }: any) {
  const totalRounds = golfSessions.filter((s: any) => s.session_type === 'Round').length
  const avgScore = totalRounds > 0 ? (golfSessions.filter((s: any) => s.session_type === 'Round').reduce((sum: number, s: any) => sum + (s.score || 0), 0) / totalRounds).toFixed(1) : 'N/A'
  const bestScore = totalRounds > 0 ? Math.min(...golfSessions.filter((s: any) => s.session_type === 'Round').map((s: any) => s.score || 999)) : 0

  const options = [
    { title: 'Log a Round', desc: 'Score, putts, fairways and greens in regulation', emoji: '⛳', nav: 'log-golf', color: '#84cc16' },
    { title: 'Suggested Sessions', desc: 'Driving, short game, putting and course management', emoji: '💡', nav: 'golf-plans', color: '#f59e0b' },
    { title: 'My Stats', desc: 'Scoring average, best round and trends', emoji: '📊', nav: 'golf-stats', color: '#a855f7' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color: '#84cc16', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>⛳ Golf</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track rounds, practice and improvement</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Rounds', value: totalRounds, color: '#84cc16' },
            { label: 'Avg Score', value: avgScore, color: '#06b6d4' },
            { label: 'Best', value: bestScore || 'N/A', color: '#f59e0b' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '10px', color: '#555', marginTop: '4px', fontWeight: '700' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map((item) => (
            <div key={item.title} onClick={() => setActiveNav(item.nav)} style={{ background: '#13131f', border: `1px solid ${item.color}25`, borderLeft: `4px solid ${item.color}`, borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{item.desc}</div>
              </div>
              <div style={{ color: item.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LogGolf({ setActiveNav, golfSessions, setGolfSessions, addSocialPost }: any) {
  const [sessionType, setSessionType] = useState('Round')
  const [course, setCourse] = useState('')
  const [holes, setHoles] = useState('18')
  const [score, setScore] = useState('')
  const [gir, setGir] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  // High-Level Feature State Additions
  const [fairwaysHit, setFairwaysHit] = useState('0')
  const [totalPutts, setTotalPutts] = useState('0')

  const handleSave = async () => {
    const newSession = {
      id: Date.now(),
      session_type: sessionType,
      course,
      holes: parseInt(holes) || 18,
      score: parseInt(score) || 0,
      putts: parseInt(totalPutts) || 0,
      fairways_hit: parseInt(fairwaysHit) || 0,
      gir: parseInt(gir) || 0,
      notes,
      date: new Date().toISOString().split('T')[0]
    }
    setGolfSessions([newSession, ...golfSessions])

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('golf_sessions').insert({
        user_id: session.user.id,
        session_type: sessionType,
        course,
        holes: parseInt(holes) || 18,
        score: parseInt(score) || 0,
        putts: parseInt(putts) || 0,
        fairways_hit: parseInt(fairwaysHit) || 0,
        gir: parseInt(gir) || 0,
        notes
      })
    }

    addSocialPost({
      sport: 'Golf',
      sportColor: '#84cc16',
      emoji: '⛳',
      caption: `Played ${holes} holes at ${course || 'the course'} — scored ${score || 0} with ${putts || 0} putts.`
    })

    playHaptic()
    playSound('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('golf-hub')} style={{ background: 'none', border: 'none', color: '#84cc16', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log Golf Session</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track your round or practice</p>

        <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>SESSION TYPE</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Round', 'Practice', 'Driving Range', 'Putting Practice', 'Chipping Practice'].map((type) => (
            <button key={type} onClick={() => setSessionType(type)} style={{ background: sessionType === type ? '#84cc1620' : '#13131f', border: `1.5px solid ${sessionType === type ? '#84cc16' : '#1e1e30'}`, borderRadius: '10px', color: sessionType === type ? '#84cc16' : '#666', padding: '10px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
          ))}
        </div>

        {sessionType === 'Round' && (
          <>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>COURSE NAME</label>
            <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="e.g. St Andrews" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box' }} />

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>HOLES PLAYED</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {['9', '18'].map((h) => (
                <button key={h} onClick={() => setHoles(h)} style={{ background: holes === h ? '#84cc1620' : '#13131f', border: `1.5px solid ${holes === h ? '#84cc16' : '#1e1e30'}`, borderRadius: '10px', color: holes === h ? '#84cc16' : '#666', padding: '10px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>{h}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'SCORE', value: score, setter: setScore, placeholder: '72' },
              { label: 'PUTTS', value: totalPutts, setter: setTotalPutts, placeholder: '30' },
              { label: 'FAIRWAYS HIT', value: fairwaysHit, setter: setFairwaysHit, placeholder: '10' },
              { label: 'GREENS IN REG', value: gir, setter: setGir, placeholder: '12' },
            ].map((field) => (
                <div key={field.label}>
                  <label style={{ fontSize: '11px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                  <input value={field.value} onChange={(e) => field.setter(e.target.value)} placeholder={field.placeholder} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '18px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
          </>
        )}

        <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>NOTES</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did it go? Any highlights or things to work on?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', marginBottom: '28px' }} />

        <button onClick={handleSave} style={{ width: '100%', background: saved ? '#65a30d' : 'linear-gradient(135deg, #84cc16, #65a30d)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px #84cc1640' }}>
          {saved ? '✓ Session Saved!' : 'Save Session'}
        </button>
      </div>
    </div>
  )
}

function GolfStats({ setActiveNav, golfSessions, setGolfSessions }: any) {
  const rounds = golfSessions.filter((s: any) => s.session_type === 'Round')
  const totalRounds = rounds.length
  const totalSessions = golfSessions.length
  const avgScore = totalRounds > 0 ? (rounds.reduce((sum: number, s: any) => sum + (s.score || 0), 0) / totalRounds).toFixed(1) : 'N/A'
  const bestScore = totalRounds > 0 ? Math.min(...rounds.map((s: any) => s.score || 999)) : 0
  const avgPutts = totalRounds > 0 ? (rounds.reduce((sum: number, s: any) => sum + (s.putts || 0), 0) / totalRounds).toFixed(1) : 'N/A'
  const avgFairways = totalRounds > 0 ? (rounds.reduce((sum: number, s: any) => sum + (s.fairways_hit || 0), 0) / totalRounds).toFixed(1) : 'N/A'
  const avgGir = totalRounds > 0 ? (rounds.reduce((sum: number, s: any) => sum + (s.gir || 0), 0) / totalRounds).toFixed(1) : 'N/A'

  const handleDeleteSession = async (sessionId: any) => {
    setGolfSessions(golfSessions.filter((s: any) => s.id !== sessionId))
    await supabase.from('golf_sessions').delete().eq('id', sessionId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('golf-hub')} style={{ background: 'none', border: 'none', color: '#84cc16', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Golf Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your performance from logged rounds</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Total Sessions', value: totalSessions, color: '#84cc16', emoji: '⛳' },
            { label: 'Rounds Played', value: totalRounds, color: '#06b6d4', emoji: '🏌️' },
            { label: 'Avg Score', value: avgScore, color: '#f59e0b', emoji: '📊' },
            { label: 'Best Round', value: bestScore || 'N/A', color: '#22c55e', emoji: '🏆' },
            { label: 'Avg Putts', value: avgPutts, color: '#a855f7', emoji: '🎯' },
            { label: 'Avg GIR', value: avgGir, color: '#ef4444', emoji: '🟢' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>Scoring Breakdown</h2>
        {[
          { label: 'Avg Fairways Hit', value: avgFairways, color: '#84cc16' },
          { label: 'Avg Greens in Reg', value: avgGir, color: '#22c55e' },
          { label: 'Avg Putts per Round', value: avgPutts, color: '#06b6d4' },
        ].map((item) => (
          <div key={item.label} style={{ background: '#13131f', borderLeft: `4px solid ${item.color}`, borderRadius: '14px', padding: '14px 18px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '700' }}>{item.label}</span>
            <span style={{ color: item.color, fontWeight: '800' }}>{item.value}</span>
          </div>
        ))}

        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>Recent Rounds</h2>
        {rounds.length === 0 ? (
          <div onClick={() => setActiveNav('log-golf')} style={{ background: '#13131f', border: '1px solid #84cc1625', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>⛳</div>
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#84cc16' }}>Ready to hit the links?</div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first round to see stats here</div>
            <span style={{ background: '#84cc1615', border: '1px solid #84cc1640', borderRadius: '20px', color: '#84cc16', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Round →</span>
          </div>
        ) : (
          rounds.slice(0, 5).map((round: any, i: number) => (
            <div key={round.id || i} style={{ background: '#13131f', border: '1px solid #84cc1625', borderLeft: '4px solid #84cc16', borderRadius: '14px', padding: '14px 18px', marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>{round.course || 'Unknown Course'} · {round.holes || 18} holes</strong>
                <span style={{ color: '#84cc16', fontWeight: '800', fontSize: '18px' }}>{round.score}</span>
              </div>
              <div style={{ color: '#666', fontSize: '12px' }}>{round.putts || 0} putts · {round.fairways_hit || 0} fairways · {round.gir || 0} GIR</div>
              </div>
              <button onClick={() => handleDeleteSession(round.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SuggestedGolfSessions({ setActiveNav }: any) {
  const [selected, setSelected] = useState<string | null>(null)

  const categories = [
    { label: 'Driving', emoji: '🏌️', color: '#84cc16', desc: 'Distance, accuracy and swing consistency off the tee' },
    { label: 'Iron Play', emoji: '⛳', color: '#22c55e', desc: 'Ball striking, distance control and approach shots' },
    { label: 'Short Game', emoji: '🎯', color: '#f59e0b', desc: 'Chipping, pitching and bunker play around the green' },
    { label: 'Putting', emoji: '🟢', color: '#06b6d4', desc: 'Green reading, distance control and holing out' },
    { label: 'Course Management', emoji: '🧠', color: '#a855f7', desc: 'Decision making, risk reward and scoring strategy' },
    { label: 'Mental Game', emoji: '💆', color: '#ef4444', desc: 'Focus, routine, pressure handling and consistency' },
  ]

  const drills: any = {
    Driving: {
      color: '#84cc16', emoji: '🏌️',
      sections: [{
        title: 'Distance & Accuracy',
        drills: [
          { name: 'Alignment Stick Drill', setup: 'Place two alignment sticks on the ground — one for ball position, one for target line. Hit 20 drives focusing purely on starting the ball on your target line.', reps: '20 drives', tip: 'Most wayward drives start from poor alignment. Fix the setup before fixing the swing.' },
          { name: 'Tempo Control', setup: 'Hit drives at 75% effort focusing on smooth tempo. Count 1-2-3 on the backswing, 1 on the downswing.', reps: '3 sets of 10', tip: 'Most amateurs swing too fast. 75% effort often produces more distance than 100%.' },
          { name: 'Tee Height Experiment', setup: 'Hit 5 drives each at low, medium and high tee height. Note which produces your best contact and flight.', reps: '15 drives', tip: 'Correct tee height varies by swing. Find what works for you, not what looks right.' },
        ]
      }]
    },
    'Iron Play': {
      color: '#22c55e', emoji: '⛳',
      sections: [{
        title: 'Ball Striking',
        drills: [
          { name: 'Divot Direction Drill', setup: 'Hit 20 iron shots and check that your divots point at or slightly left of target. Divots pointing right mean an out-to-in path.', reps: '20 shots', tip: 'The divot tells you everything about your swing path. Trust it.' },
          { name: 'Distance Ladder', setup: 'Hit 5 shots each with 9-iron, 8-iron, 7-iron, 6-iron. Record carry distance for each club.', reps: '20 shots total', tip: 'Knowing your exact distances removes guesswork on the course.' },
          { name: 'One Ball Drill', setup: 'Place one ball down. Before hitting, commit to a specific target, visualise the shot shape, then execute. No mulligans.', reps: '15 shots', tip: 'Practice like you play. On the course you only get one ball.' },
        ]
      }]
    },
    'Short Game': {
      color: '#f59e0b', emoji: '🎯',
      sections: [{
        title: 'Chipping & Pitching',
        drills: [
          { name: 'Landing Spot Chipping', setup: 'Pick a spot 1 metre onto the green and try to land every chip on it. Let the ball run to the hole.', reps: '30 chips', tip: 'Think of chipping like a putt with a bounce. Control the landing spot, not the hole.' },
          { name: 'Clock Face Pitching', setup: 'From 10, 20, 30 and 40 yards, try to land shots within 1 metre of the flag.', reps: '5 from each distance', tip: 'Distance control in the short game saves more shots than any technique tweak.' },
          { name: 'Bunker Escape Drill', setup: 'Drop 10 balls in the bunker. Your target is to get all 10 out in one shot and onto the green.', reps: '10 bunker shots', tip: 'Hit 2 inches behind the ball. You are hitting the sand, not the ball.' },
        ]
      }]
    },
    Putting: {
      color: '#06b6d4', emoji: '🟢',
      sections: [{
        title: 'Distance & Line',
        drills: [
          { name: '3-6-9 Foot Drill', setup: 'Place 3 balls at 3 feet, 3 at 6 feet, 3 at 9 feet. Try to hole all 9 in one rotation.', reps: '5 rotations', tip: 'Holing putts inside 6 feet consistently is the single biggest scoring improvement available.' },
          { name: 'Lag Putting Gate', setup: 'From 30, 40 and 50 feet, try to stop every putt within 1 metre of the hole.', reps: '5 from each distance', tip: 'Three putts come from bad lag putting, not bad short putts.' },
          { name: 'One Hand Putting', setup: 'Putt with your lead hand only from 6 feet. This builds feel and stops the trail hand from taking over.', reps: '20 putts', tip: 'The lead hand should control the putter face through impact.' },
        ]
      }]
    },
    'Course Management': {
      color: '#a855f7', emoji: '🧠',
      sections: [{
        title: 'Decision Making',
        drills: [
          { name: 'Target Zone Practice', setup: 'On each hole in practice, identify a target zone rather than a specific target. Aim for a 10-metre wide window on fairways and greens.', reps: '18 holes', tip: 'Aiming at a large target reduces tension and usually produces better shots.' },
          { name: 'Leave Yourself Below the Hole', setup: 'On approach shots, aim to finish below the hole every time rather than going for the flag. Uphill putts are much easier.', reps: '18 holes', tip: 'Tour pros aim away from the flag more often than amateurs realise.' },
          { name: 'Play the Percentages', setup: 'On each shot, ask yourself: what is the shot I can make 7 out of 10 times? Play that shot, not the hero shot.', reps: '18 holes', tip: 'Bogey golf beats double bogey golf every time.' },
        ]
      }]
    },
    'Mental Game': {
      color: '#ef4444', emoji: '💆',
      sections: [{
        title: 'Focus & Routine',
        drills: [
          { name: 'Pre-Shot Routine', setup: 'Build a consistent 20-30 second routine: stand behind the ball, pick a target, take one practice swing, address and fire. Never vary it.', reps: 'Every shot', tip: 'A consistent routine is the best pressure management tool in golf.' },
          { name: 'One Shot at a Time', setup: 'After every shot — good or bad — take a breath, release it, and reset. The previous shot does not exist anymore.', reps: '18 holes', tip: 'The ability to move on is more valuable than the ability to execute perfect shots.' },
          { name: 'Pressure Putting Practice', setup: 'Set a rule: if you miss a 4-foot putt, you do 10 push-ups. Practice with consequences.', reps: '20 putts', tip: 'Practice pressure helps you perform under real pressure on the course.' },
        ]
      }]
    },
  }

  if (selected) {
    const cat = drills[selected]
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
        <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
          <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: cat.color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 24px' }}>{cat.emoji} {selected}</h1>
          {cat.sections.map((section: any) => (
            <div key={section.title} style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '900', color: cat.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>{section.title}</h2>
              {section.drills.map((drill: any) => (
                <div key={drill.name} style={{ background: '#13131f', border: `1px solid ${cat.color}20`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
                  <div style={{ fontWeight: '900', fontSize: '15px', marginBottom: '8px' }}>{drill.name}</div>
                  <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 10px', lineHeight: '1.6' }}>{drill.setup}</p>
                  <span style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: '20px', color: cat.color, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>📋 {drill.reps}</span>
                  <div style={{ background: '#0a0a0f', borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${cat.color}`, marginTop: '10px' }}>
                    <span style={{ fontSize: '11px', color: cat.color, fontWeight: '700' }}>💡 COACHING TIP </span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{drill.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('golf-hub')} style={{ background: 'none', border: 'none', color: '#84cc16', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Golf Training</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose an area to improve</p>
        {categories.map((cat) => (
          <div key={cat.label} onClick={() => setSelected(cat.label)} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', marginBottom: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{cat.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cat.label}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{cat.desc}</div>
            </div>
            <div style={{ color: cat.color, fontSize: '24px' }}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RugbyHub({ setActiveNav, rugbySessions }: any) {
  const totalSessions = rugbySessions.length
  const totalTries = rugbySessions.reduce((sum: number, s: any) => sum + (s.tries || 0), 0)
  const totalTackles = rugbySessions.reduce((sum: number, s: any) => sum + (s.tackles || 0), 0)

  const options = [
    { title: 'Log a Session', desc: 'Match, training or skills session', emoji: '📝', nav: 'log-rugby', color: '#f59e0b' },
    { title: 'Suggested Sessions', desc: 'Tackling, attacking, fitness and set pieces', emoji: '💡', nav: 'rugby-plans', color: '#06b6d4' },
    { title: 'My Stats', desc: 'Tries, tackles, carries and session history', emoji: '📊', nav: 'rugby-stats', color: '#a855f7' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>🏉 Rugby</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track matches, training and skills</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Sessions', value: totalSessions, color: '#f59e0b' },
            { label: 'Tries', value: totalTries, color: '#22c55e' },
            { label: 'Tackles', value: totalTackles, color: '#ef4444' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '700' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map((item) => (
            <div key={item.title} onClick={() => setActiveNav(item.nav)} style={{ background: '#13131f', border: `1px solid ${item.color}25`, borderLeft: `4px solid ${item.color}`, borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{item.desc}</div>
              </div>
              <div style={{ color: item.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LogRugby({ setActiveNav, rugbySessions, setRugbySessions, addSocialPost }: any) {
  const [sessionType, setSessionType] = useState('')
  const [duration, setDuration] = useState('')
  const [position, setPosition] = useState('')
  const [tries, setTries] = useState('')
  const [tackles, setTackles] = useState('')
  const [carries, setCarries] = useState('')
  const [lineouts, setLineouts] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    const newSession = {
      id: Date.now(),
      session_type: sessionType,
      duration: parseInt(duration) || 0,
      position,
      tries: parseInt(tries) || 0,
      tackles: parseInt(tackles) || 0,
      carries: parseInt(carries) || 0,
      lineouts: parseInt(lineouts) || 0,
      notes,
      date: new Date().toISOString().split('T')[0]
    }
    setRugbySessions([newSession, ...rugbySessions])

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('rugby_sessions').insert({
        user_id: session.user.id,
        session_type: sessionType,
        duration: parseInt(duration) || 0,
        position,
        tries: parseInt(tries) || 0,
        tackles: parseInt(tackles) || 0,
        carries: parseInt(carries) || 0,
        lineouts: parseInt(lineouts) || 0,
        notes
      })
    }

    addSocialPost({
      sport: 'Rugby',
      sportColor: '#f59e0b',
      emoji: '🏉',
      caption: `Logged a ${sessionType || 'rugby session'} — ${tries || 0} tries, ${tackles || 0} tackles, ${carries || 0} carries.`
    })

    playHaptic()
    playSound('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('rugby-hub')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log Rugby Session</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track your match or training</p>

        <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>SESSION TYPE</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Match', 'Training', 'Skills', 'Fitness', 'Scrimmage'].map((type) => (
            <button key={type} onClick={() => setSessionType(type)} style={{ background: sessionType === type ? '#f59e0b20' : '#13131f', border: `1.5px solid ${sessionType === type ? '#f59e0b' : '#1e1e30'}`, borderRadius: '10px', color: sessionType === type ? '#f59e0b' : '#666', padding: '10px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
          ))}
        </div>

        {sessionType && (
          <>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>POSITION</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8', 'Scrum-half', 'Fly-half', 'Centre', 'Wing', 'Fullback'].map((pos) => (
                <button key={pos} onClick={() => setPosition(pos)} style={{ background: position === pos ? '#f59e0b20' : '#13131f', border: `1.5px solid ${position === pos ? '#f59e0b' : '#1e1e30'}`, borderRadius: '20px', color: position === pos ? '#f59e0b' : '#666', padding: '7px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{pos}</button>
              ))}
            </div>

            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (minutes)" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box' }} />

            {sessionType === 'Match' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: 'TRIES', value: tries, setter: setTries },
                  { label: 'TACKLES', value: tackles, setter: setTackles },
                  { label: 'CARRIES', value: carries, setter: setCarries },
                  { label: 'LINEOUTS WON', value: lineouts, setter: setLineouts },
                ].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontSize: '11px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                    <input value={field.value} onChange={(e) => field.setter(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '18px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
            )}

            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the session go?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', marginBottom: '28px' }} />

            <button onClick={handleSave} style={{ width: '100%', background: saved ? '#d97706' : 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px #f59e0b40' }}>
              {saved ? '✓ Session Saved!' : 'Save Session'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function RugbyStats({ setActiveNav, rugbySessions, setRugbySessions }: any) {
  const totalSessions = rugbySessions.length
  const matches = rugbySessions.filter((s: any) => s.session_type === 'Match')
  const totalTries = rugbySessions.reduce((sum: number, s: any) => sum + (s.tries || 0), 0)
  const totalTackles = rugbySessions.reduce((sum: number, s: any) => sum + (s.tackles || 0), 0)
  const totalCarries = rugbySessions.reduce((sum: number, s: any) => sum + (s.carries || 0), 0)
  const totalLineouts = rugbySessions.reduce((sum: number, s: any) => sum + (s.lineouts || 0), 0)

  const handleDeleteSession = async (sessionId: any) => {
    setRugbySessions(rugbySessions.filter((s: any) => s.id !== sessionId))
    await supabase.from('rugby_sessions').delete().eq('id', sessionId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('rugby-hub')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Rugby Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your performance from logged sessions</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Total Sessions', value: totalSessions, color: '#f59e0b', emoji: '📅' },
            { label: 'Matches', value: matches.length, color: '#22c55e', emoji: '🏉' },
            { label: 'Tries', value: totalTries, color: '#ef4444', emoji: '🏆' },
            { label: 'Tackles', value: totalTackles, color: '#06b6d4', emoji: '💪' },
            { label: 'Carries', value: totalCarries, color: '#a855f7', emoji: '🏃' },
            { label: 'Lineouts Won', value: totalLineouts, color: '#f97316', emoji: '✋' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Recent Sessions</h2>
        {rugbySessions.length === 0 ? (
          <div onClick={() => setActiveNav('log-rugby')} style={{ background: '#13131f', border: '1px solid #f59e0b25', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏉</div>
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#f59e0b' }}>Ready to play?</div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first rugby session to see stats here</div>
            <span style={{ background: '#f59e0b15', border: '1px solid #f59e0b40', borderRadius: '20px', color: '#f59e0b', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Session →</span>
          </div>
        ) : (
          rugbySessions.slice(0, 5).map((s: any, i: number) => (
            <div key={s.id || i} style={{ background: '#13131f', border: '1px solid #f59e0b25', borderLeft: '4px solid #f59e0b', borderRadius: '14px', padding: '14px 18px', marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{s.session_type} · {s.position || 'No position'}</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{s.duration || 0} mins · {s.tries || 0} tries · {s.tackles || 0} tackles · {s.carries || 0} carries</div>
              </div>
              <button onClick={() => handleDeleteSession(s.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SuggestedRugbySessions({ setActiveNav }: any) {
  const [selected, setSelected] = useState<string | null>(null)

  const categories = [
    { label: 'Tackling', emoji: '💪', color: '#ef4444', desc: 'Body position, timing, safety and tackle technique' },
    { label: 'Attacking', emoji: '🏃', color: '#22c55e', desc: 'Carrying, offloads, lines of running and finishing' },
    { label: 'Set Pieces', emoji: '🏉', color: '#f59e0b', desc: 'Scrums, lineouts, restarts and defensive sets' },
    { label: 'Fitness', emoji: '🔥', color: '#ef4444', desc: 'Rugby-specific conditioning, repeated sprints and power' },
    { label: 'Skills', emoji: '🎯', color: '#06b6d4', desc: 'Passing, kicking, handling and decision making' },
    { label: 'Defence', emoji: '🛡️', color: '#a855f7', desc: 'Line speed, drift, blitz and defensive communication' },
  ]

  const drills: any = {
    Tackling: {
      color: '#ef4444', emoji: '💪',
      sections: [{
        title: 'Tackle Technique',
        drills: [
          { name: 'Chop Tackle Drill', setup: 'Partner walks towards you. Drive in low, cheek to cheek contact, wrap around the legs and drive through.', reps: '3 sets of 8 each side', tip: 'Head to the side, eyes open. Never lead with the top of your head.' },
          { name: 'One-on-One Tackle', setup: 'Attacker runs at half pace in a channel. Defender must make the tackle from a square defensive position.', reps: '10 live tackles', tip: 'Stay on your feet as long as possible. Early commitment gives the ball carrier time to step.' },
          { name: 'Jackle Drill', setup: 'After making a tackle, work on getting over the ball quickly and competing for the turnover.', reps: '10 reps', tip: 'Get low, stay square and drive through the gate.' },
        ]
      }]
    },
    Attacking: {
      color: '#22c55e', emoji: '🏃',
      sections: [{
        title: 'Carrying & Finishing',
        drills: [
          { name: 'Fend and Go', setup: 'Run at a defender holding a pad. Plant your outside foot and use a strong fend to beat them on the inside.', reps: '3 sets of 8', tip: 'The fend arm should be straight and strong. Use your hip to generate power.' },
          { name: 'Offload Circuit', setup: 'Two players run side by side. Ball carrier takes contact from a pad holder and offloads to the support runner.', reps: '4 sets of 6', tip: 'Get the ball away before you are fully wrapped up. Offloads win matches.' },
          { name: 'Try Finishing', setup: 'Sprint from 30 metres out and practise grounding the ball cleanly under pressure.', reps: '10 reps', tip: 'Hold the ball in two hands. Plant it firmly. Never assume the try is scored until you feel the grass.' },
        ]
      }]
    },
    'Set Pieces': {
      color: '#f59e0b', emoji: '🏉',
      sections: [{
        title: 'Scrum & Lineout',
        drills: [
          { name: 'Scrum Machine Drive', setup: 'Drive into the scrum machine, focusing on body position: flat back, hips above knees, feet wide.', reps: '4 sets of 30 seconds', tip: 'Power comes from leg drive, not from pushing with your arms.' },
          { name: 'Lineout Throwing', setup: 'Practice throwing to the front, middle and back of the lineout from 10 metres distance.', reps: '30 throws', tip: 'Consistent release point is more important than power. Drill the same motion every time.' },
          { name: 'Restart Receiving', setup: 'Kick offs and restarts: practise calling early, positioning under the ball and securing clean possession.', reps: '15 kicks', tip: 'Communication is the most important factor. Call early and loud.' },
        ]
      }]
    },
    Fitness: {
      color: '#ef4444', emoji: '🔥',
      sections: [{
        title: 'Rugby Conditioning',
        drills: [
          { name: 'Repeated Sprint Protocol', setup: 'Sprint 40 metres, walk back, repeat. Your goal is to keep splits within 5% across all reps.', reps: '10 sprints', tip: 'Rugby is repeated short sprints. Train exactly that.' },
          { name: 'Contact Conditioning', setup: 'Hit a tackle bag hard, get up fast, sprint 10 metres, return, repeat.', reps: '6 sets of 5', tip: 'The ability to get up and accelerate after contact is the most sport-specific fitness you can train.' },
          { name: 'Beep Test Intervals', setup: 'Run shuttles at increasing pace until you reach your target level, then recover and repeat.', reps: '3 rounds', tip: 'Rugby requires high aerobic capacity. Do not neglect base fitness.' },
        ]
      }]
    },
    Skills: {
      color: '#06b6d4', emoji: '🎯',
      sections: [{
        title: 'Handling & Passing',
        drills: [
          { name: 'Pop Pass Accuracy', setup: 'Two players pass while running at pace. Focus on clean release, spiral and accuracy to the chest.', reps: '5 minutes continuous', tip: 'Pass to where the receiver will be, not where they are.' },
          { name: 'Spiral Kick Practice', setup: 'Practise spiral kicks from both feet, aiming for distance and accuracy to a target zone.', reps: '20 kicks each foot', tip: 'Keep your head still and follow through straight at the target.' },
          { name: 'Pressure Handling', setup: 'Receive passes while a defender closes in. Make a quick decision: run, pass or kick.', reps: '15 reps', tip: 'Rugby decisions are made under pressure. Practice that way.' },
        ]
      }]
    },
    Defence: {
      color: '#a855f7', emoji: '🛡️',
      sections: [{
        title: 'Defensive Systems',
        drills: [
          { name: 'Line Speed Drill', setup: 'Defensive line moves up together on a cue. Everyone must hit the gain line at the same time.', reps: '10 rounds', tip: 'A fractured defensive line gives the attack easy options. Communicate and move together.' },
          { name: 'Drift Defence', setup: 'Practise drifting out to cover the width of the attack without losing your shape or man.', reps: '8 sets', tip: 'Stay connected. The drift only works if everyone reads the same picture.' },
          { name: 'Blitz Defence', setup: 'Flat defensive line moves up fast on the first receiver. Practise timing and angle of approach.', reps: '8 sets', tip: 'Speed of line is only useful if everyone goes together. One slow defender breaks the system.' },
        ]
      }]
    },
  }

  if (selected) {
    const cat = drills[selected]
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
        <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
          <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: cat.color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 24px' }}>{cat.emoji} {selected}</h1>
          {cat.sections.map((section: any) => (
            <div key={section.title} style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '900', color: cat.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>{section.title}</h2>
              {section.drills.map((drill: any) => (
                <div key={drill.name} style={{ background: '#13131f', border: `1px solid ${cat.color}20`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
                  <div style={{ fontWeight: '900', fontSize: '15px', marginBottom: '8px' }}>{drill.name}</div>
                  <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 10px', lineHeight: '1.6' }}>{drill.setup}</p>
                  <span style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: '20px', color: cat.color, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>📋 {drill.reps}</span>
                  <div style={{ background: '#0a0a0f', borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${cat.color}`, marginTop: '10px' }}>
                    <span style={{ fontSize: '11px', color: cat.color, fontWeight: '700' }}>💡 COACHING TIP </span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{drill.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('rugby-hub')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Rugby Training</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose an area to improve</p>
        {categories.map((cat) => (
          <div key={cat.label} onClick={() => setSelected(cat.label)} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', marginBottom: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{cat.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cat.label}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{cat.desc}</div>
            </div>
            <div style={{ color: cat.color, fontSize: '24px' }}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CricketHub({ setActiveNav, cricketSessions }: any) {
  const totalSessions = cricketSessions.length
  const totalRuns = cricketSessions.reduce((sum: number, s: any) => sum + (s.runs || 0), 0)
  const totalWickets = cricketSessions.reduce((sum: number, s: any) => sum + (s.wickets || 0), 0)

  const options = [
    { title: 'Log a Session', desc: 'Batting, bowling or fielding session', emoji: '📝', nav: 'log-cricket', color: '#06b6d4' },
    { title: 'Suggested Sessions', desc: 'Batting, bowling, fielding and fitness drills', emoji: '💡', nav: 'cricket-plans', color: '#f59e0b' },
    { title: 'My Stats', desc: 'Runs, wickets, average and session history', emoji: '📊', nav: 'cricket-stats', color: '#a855f7' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>🏏 Cricket</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track batting, bowling and fielding</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Sessions', value: totalSessions, color: '#06b6d4' },
            { label: 'Runs', value: totalRuns, color: '#22c55e' },
            { label: 'Wickets', value: totalWickets, color: '#ef4444' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '700' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map((item) => (
            <div key={item.title} onClick={() => setActiveNav(item.nav)} style={{ background: '#13131f', border: `1px solid ${item.color}25`, borderLeft: `4px solid ${item.color}`, borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{item.desc}</div>
              </div>
              <div style={{ color: item.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LogCricket({ setActiveNav, cricketSessions, setCricketSessions, addSocialPost }: any) {
  const [sessionType, setSessionType] = useState('')
  const [duration, setDuration] = useState('')
  const [runs, setRuns] = useState('')
  const [ballsFaced, setBallsFaced] = useState('')
  const [wickets, setWickets] = useState('')
  const [oversBowled, setOversBowled] = useState('')
  const [catches, setCatches] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const battingAverage = runs && ballsFaced ? (parseInt(runs) / Math.max(1, parseInt(ballsFaced)) * 100).toFixed(1) : '0.0'

  const handleSave = async () => {
    const newSession = {
      id: Date.now(),
      session_type: sessionType,
      duration: parseInt(duration) || 0,
      runs: parseInt(runs) || 0,
      balls_faced: parseInt(ballsFaced) || 0,
      wickets: parseInt(wickets) || 0,
      overs_bowled: parseFloat(oversBowled) || 0,
      catches: parseInt(catches) || 0,
      notes,
      date: new Date().toISOString().split('T')[0]
    }
    setCricketSessions([newSession, ...cricketSessions])

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('cricket_sessions').insert({
        user_id: session.user.id,
        session_type: sessionType,
        duration: parseInt(duration) || 0,
        runs: parseInt(runs) || 0,
        balls_faced: parseInt(ballsFaced) || 0,
        wickets: parseInt(wickets) || 0,
        overs_bowled: parseFloat(oversBowled) || 0,
        catches: parseInt(catches) || 0,
        notes
      })
    }

    addSocialPost({
      sport: 'Cricket',
      sportColor: '#06b6d4',
      emoji: '🏏',
      caption: `Logged a ${sessionType || 'cricket session'} — ${runs || 0} runs off ${ballsFaced || 0} balls, ${wickets || 0} wickets.`
    })

    playHaptic()
    playSound('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('cricket-hub')} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log Cricket Session</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track your batting, bowling or fielding</p>

        <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '10px' }}>SESSION TYPE</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Match', 'Batting Practice', 'Bowling Practice', 'Fielding', 'Net Session'].map((type) => (
            <button key={type} onClick={() => setSessionType(type)} style={{ background: sessionType === type ? '#06b6d420' : '#13131f', border: `1.5px solid ${sessionType === type ? '#06b6d4' : '#1e1e30'}`, borderRadius: '10px', color: sessionType === type ? '#06b6d4' : '#666', padding: '10px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{type}</button>
          ))}
        </div>

        {sessionType && (
          <>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (minutes)" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box' }} />

            {(sessionType === 'Match' || sessionType === 'Batting Practice' || sessionType === 'Net Session') && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'RUNS', value: runs, setter: setRuns, placeholder: '45' },
                  { label: 'BALLS FACED', value: ballsFaced, setter: setBallsFaced, placeholder: '60' },
                ].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontSize: '11px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                    <input value={field.value} onChange={(e) => field.setter(e.target.value)} placeholder={field.placeholder} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '18px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
            )}

            {(sessionType === 'Match' || sessionType === 'Bowling Practice' || sessionType === 'Net Session') && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'WICKETS', value: wickets, setter: setWickets, placeholder: '2' },
                  { label: 'OVERS BOWLED', value: oversBowled, setter: setOversBowled, placeholder: '8.4' },
                ].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontSize: '11px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                    <input value={field.value} onChange={(e) => field.setter(e.target.value)} placeholder={field.placeholder} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '18px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
            )}

            {runs && ballsFaced && (
              <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '14px', padding: '14px 18px', marginBottom: '16px' }}>
                <div style={{ color: '#666', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>STRIKE RATE</div>
                <div style={{ color: '#06b6d4', fontSize: '24px', fontWeight: '900' }}>{battingAverage}</div>
              </div>
            )}

            

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>CATCHES</label>
              <input value={catches} onChange={(e) => setCatches(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '18px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box' }} />
            </div>

            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the session go?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', marginBottom: '28px' }} />

            <button onClick={handleSave} style={{ width: '100%', background: saved ? '#0891b2' : 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px #06b6d440' }}>
              {saved ? '✓ Session Saved!' : 'Save Session'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function CricketStats({ setActiveNav, cricketSessions, setCricketSessions }: any) {
  const totalSessions = cricketSessions.length
  const totalRuns = cricketSessions.reduce((sum: number, s: any) => sum + (s.runs || 0), 0)
  const totalBallsFaced = cricketSessions.reduce((sum: number, s: any) => sum + (s.balls_faced || 0), 0)
  const totalWickets = cricketSessions.reduce((sum: number, s: any) => sum + (s.wickets || 0), 0)
  const totalOvers = cricketSessions.reduce((sum: number, s: any) => sum + (s.overs_bowled || 0), 0)
  const totalCatches = cricketSessions.reduce((sum: number, s: any) => sum + (s.catches || 0), 0)
  const strikeRate = totalBallsFaced > 0 ? ((totalRuns / totalBallsFaced) * 100).toFixed(1) : 'N/A'
  const bowlingAverage = totalWickets > 0 ? (totalOvers / totalWickets).toFixed(1) : 'N/A'
  const highScore = cricketSessions.length > 0 ? Math.max(...cricketSessions.map((s: any) => s.runs || 0)) : 0
  const bestBowling = cricketSessions.length > 0 ? Math.max(...cricketSessions.map((s: any) => s.wickets || 0)) : 0

  const handleDeleteSession = async (sessionId: any) => {
    setCricketSessions(cricketSessions.filter((s: any) => s.id !== sessionId))
    await supabase.from('cricket_sessions').delete().eq('id', sessionId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('cricket-hub')} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Cricket Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your performance from logged sessions</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Sessions', value: totalSessions, color: '#06b6d4', emoji: '📅' },
            { label: 'Total Runs', value: totalRuns, color: '#22c55e', emoji: '🏏' },
            { label: 'High Score', value: highScore, color: '#f59e0b', emoji: '🏆' },
            { label: 'Strike Rate', value: strikeRate, color: '#a855f7', emoji: '⚡' },
            { label: 'Wickets', value: totalWickets, color: '#ef4444', emoji: '🎯' },
            { label: 'Best Bowling', value: `${bestBowling}wk`, color: '#f97316', emoji: '🏏' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>Averages</h2>
        {[
          { label: 'Batting Strike Rate', value: strikeRate, color: '#22c55e' },
          { label: 'Bowling Average (overs/wkt)', value: bowlingAverage, color: '#ef4444' },
          { label: 'Total Catches', value: totalCatches, color: '#06b6d4' },
          { label: 'Total Overs Bowled', value: totalOvers.toFixed(1), color: '#a855f7' },
        ].map((item) => (
          <div key={item.label} style={{ background: '#13131f', borderLeft: `4px solid ${item.color}`, borderRadius: '14px', padding: '14px 18px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '700' }}>{item.label}</span>
            <span style={{ color: item.color, fontWeight: '800' }}>{item.value}</span>
          </div>
        ))}

        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>Recent Sessions</h2>
        {cricketSessions.length === 0 ? (
          <div onClick={() => setActiveNav('log-cricket')} style={{ background: '#13131f', border: '1px solid #06b6d425', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏏</div>
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#06b6d4' }}>Ready to bat?</div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first cricket session to see stats here</div>
            <span style={{ background: '#06b6d415', border: '1px solid #06b6d440', borderRadius: '20px', color: '#06b6d4', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Session →</span>
          </div>
        ) : (
          cricketSessions.slice(0, 5).map((s: any, i: number) => (
            <div key={s.id || i} style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '14px', padding: '14px 18px', marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{s.session_type}</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{s.runs || 0} runs · {s.balls_faced || 0} balls · {s.wickets || 0} wkts · {s.overs_bowled || 0} overs</div>
              </div>
              <button onClick={() => handleDeleteSession(s.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SuggestedCricketSessions({ setActiveNav }: any) {
  const [selected, setSelected] = useState<string | null>(null)

  const categories = [
    { label: 'Batting', emoji: '🏏', color: '#22c55e', desc: 'Technique, shot selection, footwork and timing' },
    { label: 'Bowling', emoji: '🎯', color: '#ef4444', desc: 'Line and length, swing, seam and spin bowling' },
    { label: 'Fielding', emoji: '🧤', color: '#06b6d4', desc: 'Catching, throwing, ground fielding and positioning' },
    { label: 'Fitness', emoji: '🔥', color: '#f59e0b', desc: 'Cricket-specific conditioning, agility and explosiveness' },
    { label: 'Mental Game', emoji: '🧠', color: '#a855f7', desc: 'Concentration, pressure handling and match awareness' },
    { label: 'Net Sessions', emoji: '🕸️', color: '#f97316', desc: 'Structured net practice for batting and bowling' },
  ]

  const drills: any = {
    Batting: {
      color: '#22c55e', emoji: '🏏',
      sections: [{
        title: 'Technique & Timing',
        drills: [
          { name: 'Straight Drive Drill', setup: 'Feed balls on a good length. Focus on driving straight down the ground with a high elbow, straight bat and full follow-through.', reps: '30 balls', tip: 'The straight drive is the foundation of good batting. Master it before attacking other areas.' },
          { name: 'Back Foot Punching', setup: 'Feed short balls outside off stump. Rock back and punch through the covers or point.', reps: '25 balls', tip: 'Weight transfers back early. Do not fall over to the off side.' },
          { name: 'Leave Practice', setup: 'Feed balls outside off stump. Practise leaving them with soft hands and minimal movement.', reps: '20 balls', tip: 'The best batters know which balls to leave. Leaving well is a skill.' },
        ]
      }]
    },
    Bowling: {
      color: '#ef4444', emoji: '🎯',
      sections: [{
        title: 'Line & Length',
        drills: [
          { name: 'Target Zone Bowling', setup: 'Place a target on a good length on and just outside off stump. Bowl 20 balls trying to hit the target.', reps: '20 deliveries', tip: 'Good bowling starts with good line and length. Everything else builds on top.' },
          { name: 'Swing Bowling Practice', setup: 'Bowl with a shiny side and dull side. Practise outswing grip with seam upright and wrist behind the ball.', reps: '15 deliveries', tip: 'Swing comes from wrist position and seam angle, not from muscling the ball.' },
          { name: 'Yorker Practice', setup: 'Bowl full deliveries aimed at the base of the stumps. Essential for death bowling in limited overs cricket.', reps: '20 deliveries', tip: 'A well-executed yorker is almost unplayable. Practise it regularly.' },
        ]
      }]
    },
    Fielding: {
      color: '#06b6d4', emoji: '🧤',
      sections: [{
        title: 'Catching & Throwing',
        drills: [
          { name: 'High Catch Practice', setup: 'Have a partner hit or throw high catches. Call early, get into position underneath and take the ball at chest height.', reps: '20 catches', tip: 'Never take your eye off the ball. Watch it all the way into your hands.' },
          { name: 'Ground Fielding Circuit', setup: 'Dive and slide to stop balls hit to your left and right. Get up quickly and throw accurately to the stumps.', reps: '15 reps each side', tip: 'Committed fielding saves runs and builds pressure on the batting side.' },
          { name: 'Direct Hit Throwing', setup: 'Set up a set of stumps 20-30 metres away. Run in, pick up a ball and attempt to hit the stumps.', reps: '15 throws', tip: 'Pick up position is everything. Get your hands low and in front of your feet.' },
        ]
      }]
    },
    Fitness: {
      color: '#f59e0b', emoji: '🔥',
      sections: [{
        title: 'Cricket Conditioning',
        drills: [
          { name: 'Between the Wickets Running', setup: 'Sprint the 22-yard pitch back and forth as fast as possible. Rest and repeat.', reps: '10 sets of 4 lengths', tip: 'Running between the wickets is one of the most important fitness skills in cricket.' },
          { name: 'Agility Ladder for Footwork', setup: 'Use an agility ladder to improve foot speed and coordination specific to batting footwork patterns.', reps: '5 minutes', tip: 'Good footwork gets you to the pitch of the ball. Work it every session.' },
          { name: 'Explosive Throw Circuit', setup: 'Combine sprinting to a ball with a powerful throw at the stumps. Simulate real match fielding.', reps: '12 reps', tip: 'Fielding fitness is often neglected. It can win matches on its own.' },
        ]
      }]
    },
    'Mental Game': {
      color: '#a855f7', emoji: '🧠',
      sections: [{
        title: 'Focus & Composure',
        drills: [
          { name: 'One Ball at a Time', setup: 'In net sessions, reset mentally between every delivery. Forget the previous ball completely.', reps: 'Every net session', tip: 'Cricket is a game of concentration. Losing focus for one ball can end your innings.' },
          { name: 'Pressure Net Sessions', setup: 'Set a target: if you get out in nets, you do a physical challenge. Create competitive scenarios.', reps: '30 minute session', tip: 'Practise under pressure so you can perform under pressure in matches.' },
          { name: 'Visualisation Routine', setup: 'Before batting or bowling, spend 2 minutes visualising your technique, your best shots or deliveries, and a strong performance.', reps: 'Before every session', tip: 'Mental rehearsal is used by elite players worldwide. It works.' },
        ]
      }]
    },
    'Net Sessions': {
      color: '#f97316', emoji: '🕸️',
      sections: [{
        title: 'Structured Net Practice',
        drills: [
          { name: 'Purposeful Batting Nets', setup: 'Set a specific goal for each net session: play only through the off side, or only play straight, or focus on leaving outside off.', reps: '20 overs', tip: 'Random batting in nets does not improve you. Have a purpose every session.' },
          { name: 'Bowling Spell Simulation', setup: 'Bowl in spells of 4-6 overs. Maintain your action, line and length as if in a real match situation.', reps: '4-6 overs', tip: 'Bowl the way you want to bowl in matches. Nets are for rehearsing match bowling.' },
          { name: 'Scenario Practice', setup: 'Create match situations: last 5 overs batting, needing 40, or bowling with 2 wickets to take in 3 overs.', reps: '3-4 scenarios', tip: 'Scenario practice is the closest thing to real match experience you can get in training.' },
        ]
      }]
    },
  }

  if (selected) {
    const cat = drills[selected]
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
        <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
          <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: cat.color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 24px' }}>{cat.emoji} {selected}</h1>
          {cat.sections.map((section: any) => (
            <div key={section.title} style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '900', color: cat.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>{section.title}</h2>
              {section.drills.map((drill: any) => (
                <div key={drill.name} style={{ background: '#13131f', border: `1px solid ${cat.color}20`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
                  <div style={{ fontWeight: '900', fontSize: '15px', marginBottom: '8px' }}>{drill.name}</div>
                  <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 10px', lineHeight: '1.6' }}>{drill.setup}</p>
                  <span style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, borderRadius: '20px', color: cat.color, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>📋 {drill.reps}</span>
                  <div style={{ background: '#0a0a0f', borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${cat.color}`, marginTop: '10px' }}>
                    <span style={{ fontSize: '11px', color: cat.color, fontWeight: '700' }}>💡 COACHING TIP </span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{drill.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('cricket-hub')} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Cricket Training</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose an area to improve</p>
        {categories.map((cat) => (
          <div key={cat.label} onClick={() => setSelected(cat.label)} style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', marginBottom: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{cat.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cat.label}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{cat.desc}</div>
            </div>
            <div style={{ color: cat.color, fontSize: '24px' }}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}
function CyclingHub({ setActiveNav, cyclingSessions }: any) {
  const totalDistance = cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
  const totalElevation = cyclingSessions.reduce((sum: number, s: any) => sum + (s.elevation || 0), 0)
  const recentHighEffort = cyclingSessions.slice(0, 3).filter((s: any) => (s.effort || 0) >= 8)
  const loadWarning = cyclingSessions.length >= 3 && recentHighEffort.length === 3

  const options = [
    { title: 'Log Ride', desc: 'Record distance, speed, elevation and effort', emoji: '✚', nav: 'log-cycling', color: '#10b981' },
    { title: 'Personal Records', desc: 'View longest ride, fastest speed and biggest climbs', emoji: '🏆', nav: 'cycling-records', color: '#a855f7' },
    { title: 'Suggested Sessions', desc: 'Endurance, climbing, sprints and recovery rides', emoji: '💡', nav: 'cycling-plans', color: '#f59e0b' },
    { title: 'My Stats', desc: 'View total rides, distance, speed and elevation', emoji: '📊', nav: 'cycling-stats', color: '#06b6d4' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>🚴 Cycling</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Track rides, distance, speed and elevation</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Rides', value: cyclingSessions.length, color: '#10b981' },
            { label: 'Distance', value: `${totalDistance.toFixed(1)}km`, color: '#06b6d4' },
            { label: 'Elevation', value: `${totalElevation}m`, color: '#f59e0b' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '10px', color: '#555', marginTop: '4px', fontWeight: '700' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {loadWarning && (
          <div style={{ background: '#ef444412', border: '1px solid #ef444440', borderLeft: '4px solid #ef4444', borderRadius: '14px', padding: '14px 16px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '13px', color: '#ef4444' }}>High Training Load</div>
              <div style={{ color: '#aaa', fontSize: '12px', marginTop: '3px' }}>Your last 3 rides were all effort 8+. Consider an easy ride or rest day.</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map((item) => (
            <div key={item.title} onClick={() => setActiveNav(item.nav)} style={{ background: '#13131f', border: `1px solid ${item.color}25`, borderLeft: `4px solid ${item.color}`, borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{item.desc}</div>
              </div>
              <div style={{ color: item.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function CyclingStats({ setActiveNav, cyclingSessions, setCyclingSessions }: any) {
  const totalRides = cyclingSessions.length
  const totalDistance = cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
  const totalElevation = cyclingSessions.reduce((sum: number, s: any) => sum + (s.elevation || 0), 0)
  const longestRide = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.distance || 0)) : 0
  const fastestSpeed = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.avgSpeed || 0)) : 0
  const avgDistance = totalRides > 0 ? (totalDistance / totalRides).toFixed(1) : '0.0'

  const handleDeleteSession = async (sessionId: any) => {
    setCyclingSessions(cyclingSessions.filter((s: any) => s.id !== sessionId))
    await supabase.from('cycling_sessions').delete().eq('id', sessionId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('cycling-hub')} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>Cycling Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Distance, speed, elevation and ride history</p>

        <div style={{ background: '#13131f', border: '1px solid #10b98125', borderLeft: '4px solid #10b981', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#10b981', fontSize: '13px', fontWeight: '900', marginBottom: '12px' }}>OVERVIEW</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Rides', value: totalRides, color: '#10b981' },
              { label: 'Distance', value: `${totalDistance.toFixed(1)}km`, color: '#06b6d4' },
              { label: 'Elevation', value: `${totalElevation}m`, color: '#f59e0b' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '13px', padding: '13px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '20px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#06b6d4', fontSize: '13px', fontWeight: '900', marginBottom: '12px' }}>PERSONAL BESTS</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Longest', value: `${longestRide}km`, color: '#10b981' },
              { label: 'Fastest', value: `${fastestSpeed}km/h`, color: '#ef4444' },
              { label: 'Avg Ride', value: `${avgDistance}km`, color: '#a855f7' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '13px', padding: '13px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '18px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '9px', fontWeight: '700', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 14px' }}>Recent Rides</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {cyclingSessions.length === 0 && (
            <div onClick={() => setActiveNav('log-cycling')} style={{ background: '#13131f', border: '1px solid #10b98125', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚴</div>
              <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#10b981' }}>Ready to ride?</div>
              <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first ride to see stats here</div>
              <span style={{ background: '#10b98115', border: '1px solid #10b98140', borderRadius: '20px', color: '#10b981', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Ride →</span>
            </div>
          )}

          {cyclingSessions.slice(0, 6).map((ride: any) => (
            <div key={ride.id} style={{ background: '#13131f', border: '1px solid #10b98125', borderLeft: '4px solid #10b981', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{ride.rideType || 'Ride'}</div>
              <div style={{ color: '#666', fontSize: '12px', marginBottom: '6px' }}>{ride.distance || 0}km · {ride.duration || 0} mins</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {ride.rideType && <span style={{ background: '#10b98115', border: '1px solid #10b98130', borderRadius: '20px', color: '#10b981', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{ride.rideType}</span>}
                {ride.avgSpeed > 0 && <span style={{ background: '#ef444415', border: '1px solid #ef444430', borderRadius: '20px', color: '#ef4444', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>⚡ {ride.avgSpeed}km/h</span>}
                {ride.elevation > 0 && <span style={{ background: '#f59e0b15', border: '1px solid #f59e0b30', borderRadius: '20px', color: '#f59e0b', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>⛰️ {ride.elevation}m</span>}
                {ride.date && <span style={{ background: '#1e1e30', borderRadius: '20px', color: '#555', fontSize: '10px', fontWeight: '600', padding: '3px 8px' }}>{ride.date}</span>}
              </div>
              </div>
              <button onClick={() => handleDeleteSession(ride.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function CyclingRecords({ setActiveNav, cyclingSessions }: any) {
  const longestRide = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.distance || 0)) : 0
  const fastestSpeed = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.avgSpeed || 0)) : 0
  const biggestClimb = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.elevation || 0)) : 0
  const longestDuration = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.duration || 0)) : 0
  const hardestEffort = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.effort || 0)) : 0

  const records = [
    { title: 'Longest Ride', value: `${longestRide}km`, emoji: '🚴', color: '#10b981' },
    { title: 'Fastest Avg Speed', value: `${fastestSpeed}km/h`, emoji: '⚡', color: '#ef4444' },
    { title: 'Biggest Climb', value: `${biggestClimb}m`, emoji: '⛰️', color: '#f59e0b' },
    { title: 'Longest Duration', value: `${longestDuration} mins`, emoji: '⏱️', color: '#06b6d4' },
    { title: 'Hardest Effort', value: `${hardestEffort}/10`, emoji: '🔥', color: '#a855f7' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('cycling-hub')} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>Cycling Records</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your best rides and personal milestones</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {records.map((record) => (
            <div key={record.title} style={{ background: '#13131f', border: `1px solid ${record.color}25`, borderLeft: `4px solid ${record.color}`, borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${record.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{record.emoji}</div>
              <div>
                <div style={{ color: record.color, fontSize: '24px', fontWeight: '900' }}>{record.value}</div>
                <div style={{ color: '#aaa', fontSize: '13px', fontWeight: '700' }}>{record.title}</div>
              </div>
            </div>
          ))}
        </div>

        {cyclingSessions.length === 0 && (
          <div style={{ marginTop: '20px', background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '16px', color: '#666' }}>
            Log your first ride to start setting records.
          </div>
        )}
      </div>
    </div>
  )
}
function SuggestedCyclingSessions({ setActiveNav, setSelectedCyclingCategory }: any) {
  const categories = [
    { label: 'Endurance', emoji: '🚴', color: '#10b981', desc: 'Build aerobic fitness, longer rides and steady pacing' },
    { label: 'Climbing', emoji: '⛰️', color: '#f59e0b', desc: 'Hill repeats, climbing strength, cadence and pacing' },
    { label: 'Sprint Training', emoji: '⚡', color: '#ef4444', desc: 'Short explosive efforts, acceleration and race finishes' },
    { label: 'Recovery', emoji: '😌', color: '#06b6d4', desc: 'Easy rides, active recovery and low-intensity spinning' },
    { label: 'Race Preparation', emoji: '🏁', color: '#a855f7', desc: 'Race simulation, pacing, attacks and group riding' },
    { label: 'Bike Handling', emoji: '🛞', color: '#eab308', desc: 'Cornering, braking, descending and control skills' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('cycling-hub')} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px' }}>Cycling Training</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose an area to improve</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => {
                setSelectedCyclingCategory(cat.label)
                setActiveNav('cycling-session-detail')
              }}
              style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{cat.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '900', fontSize: '16px' }}>{cat.label}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '4px', lineHeight: '1.4' }}>{cat.desc}</div>
              </div>
              <div style={{ color: cat.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function CyclingSessionDetail({ category, setActiveNav }: any) {
const sessionData: any = {
  Endurance: {
    emoji: '🚴',
    color: '#10b981',
    sections: [
      {
        title: 'Base Fitness',
        drills: [
          { name: 'Zone 2 Ride', setup: 'Ride at a steady pace where you can still talk. Keep effort smooth and controlled.', reps: '45–90 mins', tip: 'This builds your engine without burning you out.' },
          { name: 'Progressive Long Ride', setup: 'Start easy, ride steady in the middle, then finish slightly harder.', reps: '60–120 mins', tip: 'Good pacing matters more than starting fast.' },
          { name: 'Cadence Control', setup: 'Hold a smooth cadence around 80–95 rpm on flat roads.', reps: '4 x 8 mins', tip: 'Smooth pedalling saves energy on long rides.' },
        ]
      },
      {
        title: 'Long Ride Skills',
        drills: [
          { name: 'Fuel Practice Ride', setup: 'Practise drinking regularly and taking a snack every 30–40 minutes.', reps: '90+ mins', tip: 'Long rides are partly fitness and partly fuelling.' },
          { name: 'Negative Split Ride', setup: 'Ride the second half slightly faster than the first half.', reps: '40–80 mins', tip: 'This teaches control and strong finishes.' },
        ]
      }
    ]
  },

  Climbing: {
    emoji: '⛰️',
    color: '#f59e0b',
    sections: [
      {
        title: 'Hill Strength',
        drills: [
          { name: 'Hill Repeats', setup: 'Ride hard uphill, recover slowly downhill, then repeat.', reps: '6–10 repeats', tip: 'Keep your effort consistent across all reps.' },
          { name: 'Low Cadence Climb', setup: 'Use a harder gear and climb seated with control.', reps: '4 x 5 mins', tip: 'Keep your upper body still and drive through the pedals.' },
          { name: 'Standing Climb Practice', setup: 'Alternate 30 seconds seated and 30 seconds standing while climbing.', reps: '5–8 mins', tip: 'Do not rock side to side too much.' },
        ]
      },
      {
        title: 'Climbing Technique',
        drills: [
          { name: 'Pacing Climb', setup: 'Start the climb easier than you want, then build effort near the top.', reps: '3 climbs', tip: 'Most riders blow up by starting climbs too hard.' },
          { name: 'Hill Sprint Finish', setup: 'Climb steady, then sprint the final 10–15 seconds.', reps: '5 reps', tip: 'Great for building power when tired.' },
        ]
      }
    ]
  },

  'Sprint Training': {
    emoji: '⚡',
    color: '#ef4444',
    sections: [
      {
        title: 'Explosive Speed',
        drills: [
          { name: '10 Second Sprints', setup: 'Roll easy, then sprint all-out for 10 seconds. Fully recover.', reps: '8–10 sprints', tip: 'Stop if your speed drops badly.' },
          { name: '30 Second Power Efforts', setup: 'Ride very hard for 30 seconds, then easy spin for 2–3 minutes.', reps: '6 rounds', tip: 'Keep form clean even when it hurts.' },
          { name: 'Standing Start Sprint', setup: 'Start slowly in a harder gear and accelerate hard.', reps: '6 reps', tip: 'Build power from low speed.' },
        ]
      },
      {
        title: 'Race Finishing',
        drills: [
          { name: 'Lead-Out Sprint', setup: 'Ride steady for 2 minutes, build speed, then sprint for 15 seconds.', reps: '5 rounds', tip: 'Practise building speed before the final sprint.' },
          { name: 'Sprint After Fatigue', setup: 'Ride hard for 3 minutes, then sprint for 10 seconds.', reps: '4 rounds', tip: 'This feels like sprinting at the end of a race.' },
        ]
      }
    ]
  },

  Recovery: {
    emoji: '😌',
    color: '#06b6d4',
    sections: [
      {
        title: 'Easy Riding',
        drills: [
          { name: 'Easy Spin', setup: 'Very light ride with no pressure on speed or distance.', reps: '20–45 mins', tip: 'You should finish feeling fresher, not destroyed.' },
          { name: 'Mobility + Spin', setup: 'Do light stretching first, then ride easily.', reps: '30 mins', tip: 'Perfect after hard days.' },
          { name: 'High Cadence Easy Ride', setup: 'Use an easy gear and spin smoothly at a higher cadence.', reps: '25–40 mins', tip: 'Keep it easy; this is not a workout test.' },
        ]
      },
      {
        title: 'Recovery Advice',
        drills: [
          { name: 'Post-Ride Stretch', setup: 'Stretch calves, quads, hamstrings, hips and lower back.', reps: '10 mins', tip: 'Small recovery habits help you train more often.' },
          { name: 'Hydration Check', setup: 'Drink after your ride and eat a proper meal if it was long or hard.', reps: 'After ride', tip: 'Recovery starts as soon as the ride ends.' },
        ]
      }
    ]
  },

  'Race Preparation': {
    emoji: '🏁',
    color: '#a855f7',
    sections: [
      {
        title: 'Race Skills',
        drills: [
          { name: 'Race Simulation', setup: 'Warm up, then ride race-pace sections with short surges.', reps: '45–75 mins', tip: 'Practise pacing instead of going flat out from the start.' },
          { name: 'Attack & Recover', setup: 'Surge for 20 seconds, then settle back into a strong pace.', reps: '8 efforts', tip: 'Useful for responding to changes in pace.' },
          { name: 'Tempo Blocks', setup: 'Ride at a strong but sustainable effort.', reps: '3 x 10 mins', tip: 'Tempo work builds race strength.' },
        ]
      },
      {
        title: 'Tactics',
        drills: [
          { name: 'Pace Plan Ride', setup: 'Choose a target pace and stick to it for the whole ride.', reps: '30–60 mins', tip: 'Good pacing beats random effort.' },
          { name: 'Final 5 Minute Push', setup: 'Ride normally, then push hard for the final 5 minutes.', reps: '1 ride', tip: 'Practise finishing strong.' },
        ]
      }
    ]
  },

  'Bike Handling': {
    emoji: '🛞',
    color: '#eab308',
    sections: [
      {
        title: 'Control Skills',
        drills: [
          { name: 'Cornering Practice', setup: 'Practise smooth corners, looking through the turn and keeping outside pedal down.', reps: '10–15 mins', tip: 'Look where you want the bike to go.' },
          { name: 'Braking Control', setup: 'Practise controlled braking from different speeds using both brakes smoothly.', reps: '10 reps', tip: 'Brake before corners, not during them.' },
          { name: 'Slow Speed Balance', setup: 'Ride slowly in a straight line while staying relaxed.', reps: '5 mins', tip: 'Control at low speed improves confidence.' },
        ]
      },
      {
        title: 'Confidence Skills',
        drills: [
          { name: 'Descending Practice', setup: 'On a safe downhill, focus on relaxed arms, stable body position and controlled braking.', reps: '3–5 descents', tip: 'Stay loose and look far ahead.' },
          { name: 'Obstacle Awareness', setup: 'Practise safely avoiding potholes or small obstacles by looking ahead and choosing a line early.', reps: '10 mins', tip: 'The earlier you spot hazards, the smoother you ride.' },
        ]
      }
    ]
  }
}
const data = sessionData[category]

return (
  <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
    <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
      <button onClick={() => setActiveNav('cycling-plans')} style={{ background: 'none', border: 'none', color: data.color, fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

      <h1 style={{ fontSize: '28px', fontWeight: '900' }}>{data.emoji} {category}</h1>

      {data.sections.map((section: any) => (
        <div key={section.title} style={{ marginBottom: '24px' }}>
          <h2 style={{ color: data.color, fontSize: '13px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>{section.title}</h2>

          {section.drills.map((drill: any) => (
            <div key={drill.name} style={{ background: '#13131f', border: `1px solid ${data.color}25`, borderLeft: `4px solid ${data.color}`, borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
              <div style={{ fontWeight: '900', marginBottom: '6px' }}>{drill.name}</div>
              <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '10px', lineHeight: '1.5' }}>{drill.setup}</div>
              <div style={{ color: data.color, fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>📋 {drill.reps}</div>
              <div style={{ color: '#888', fontSize: '12px', lineHeight: '1.5' }}>💡 {drill.tip}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
)
}
function CyclingAchievements({ setActiveNav, cyclingSessions }: any) {
  const achievements = [
    {
      title: 'First Ride',
      emoji: '🚴',
      earned: cyclingSessions.length >= 1,
    },
    {
      title: '10 Rides',
      emoji: '🚴',
      earned: cyclingSessions.length >= 10,
    },
    {
      title: '100km Total',
      emoji: '🏆',
      earned:
        cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0) >= 100,
    },
    {
      title: '500km Total',
      emoji: '🥇',
      earned:
        cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0) >= 500,
    },
    {
      title: 'Century Ride',
      emoji: '💯',
      earned: cyclingSessions.some((s: any) => (s.distance || 0) >= 100),
    },
    {
      title: 'Mountain Goat',
      emoji: '⛰️',
      earned: cyclingSessions.some((s: any) => (s.elevation || 0) >= 1000),
    },
    {
      title: 'Speed Demon',
      emoji: '⚡',
      earned: cyclingSessions.some((s: any) => (s.avgSpeed || 0) >= 30),
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', maxWidth: '430px', margin: '0 auto', padding: '50px 24px' }}>
      <button
        onClick={() => setActiveNav('cycling-hub')}
        style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: '700', marginBottom: '20px' }}
      >
        ← Back
      </button>

      <h1>🏆 Cycling Achievements</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
        {achievements.map((achievement) => (
          <div
            key={achievement.title}
            style={{
              background: '#13131f',
              borderRadius: '16px',
              padding: '16px',
              border: achievement.earned
                ? '1px solid #10b981'
                : '1px solid #2a2a35',
              opacity: achievement.earned ? 1 : 0.5,
            }}
          >
            <div style={{ fontSize: '24px' }}>{achievement.emoji}</div>
            <div style={{ fontWeight: '800', marginTop: '8px' }}>
              {achievement.title}
            </div>
            <div style={{ color: achievement.earned ? '#10b981' : '#666' }}>
              {achievement.earned ? 'Unlocked' : 'Locked'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
function LogBoxing({
  setActiveNav,
  boxingSessions,
  setBoxingSessions,
  addSocialPost
}: any) {
  const [sessionType, setSessionType] = useState('Heavy Bag')
  const [duration, setDuration] = useState('')
  const [rounds, setRounds] = useState('')
  const [punches, setPunches] = useState('')
  const [notes, setNotes] = useState('')
  const [fitness, setFitness] = useState('5')
  const [defence, setDefence] = useState('5')
  const [punchesLanded, setPunchesLanded] = useState('')
const [jabs, setJabs] = useState('')
const [crosses, setCrosses] = useState('')
const [hooks, setHooks] = useState('')
const [uppercuts, setUppercuts] = useState('')
const [knockdowns, setKnockdowns] = useState('')
const [calories, setCalories] = useState('')
const [combo, setCombo] = useState('')
const [intensity, setIntensity] = useState('5')

// High-Level Feature State Additions
const [sparringRounds, setSparringRounds] = useState('0')
const [heavyBagRounds, setHeavyBagRounds] = useState('0')
const [padWorkRounds, setPadWorkRounds] = useState('0')

const totalCalculatedRounds = parseInt(sparringRounds) + parseInt(heavyBagRounds) + parseInt(padWorkRounds);



  const saveSession = async () => {
    const newSession = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      sessionType,
      duration: Number(duration) || 0,
      rounds: Number(rounds) || 0,
      punches: Number(punches) || 0,
      fitness: Number(fitness),
      defence: Number(defence),
      punchesLanded: Number(punchesLanded) || 0,
      jabs: Number(jabs) || 0,
      crosses: Number(crosses) || 0,
      hooks: Number(hooks) || 0,
      uppercuts: Number(uppercuts) || 0,
      knockdowns: Number(knockdowns) || 0,
      calories: Number(calories) || 0,
      combo,
      intensity: Number(intensity),
      notes
    }

    setBoxingSessions([newSession, ...boxingSessions])

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('boxing_sessions').insert({
        user_id: session.user.id,
        session_type: sessionType,
        duration: Number(duration) || 0,
        rounds: Number(rounds) || 0,
        punches: Number(punches) || 0,
        punches_landed: Number(punchesLanded) || 0,
        jabs: Number(jabs) || 0,
        crosses: Number(crosses) || 0,
        hooks: Number(hooks) || 0,
        uppercuts: Number(uppercuts) || 0,
        knockdowns: Number(knockdowns) || 0,
        calories: Number(calories) || 0,
        combo,
        intensity: Number(intensity),
        fitness: Number(fitness),
        defence: Number(defence),
        notes
      })
    }

    addSocialPost?.({
      sport: 'Boxing',
      sportColor: '#ef4444',
      emoji: '🥊',
      caption: `Completed a ${sessionType} session — ${duration} mins, ${rounds} rounds.`
    })

  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', maxWidth: '430px', margin: '0 auto', padding: '50px 24px' }}>
      <button onClick={() => setActiveNav('boxing-hub')} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: '700', cursor: 'pointer', marginBottom: '20px' }}>
        ← Back
      </button>

      <h1 style={{ marginTop: 0 }}>🥊 Log Boxing Session</h1>

      <label style={{ display: 'block', marginBottom: '10px', color: '#aaa', fontWeight: '700' }}>
        SESSION TYPE
      </label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {[
          'Heavy Bag',
          'Pad Work',
          'Sparring',
          'Technical Drills',
          'Footwork',
          'Strength & Conditioning'
        ].map((type) => (
          <button
            key={type}
            onClick={() => setSessionType(type)}
            style={{
              background: sessionType === type ? '#ef444420' : '#13131f',
              border: `1px solid ${sessionType === type ? '#ef4444' : '#1e1e30'}`,
              borderRadius: '20px',
              color: sessionType === type ? '#ef4444' : '#aaa',
              padding: '8px 12px',
              cursor: 'pointer'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <input
          placeholder="Duration (mins)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ padding: '12px', borderRadius: '10px', background: '#13131f', border: '1px solid #1e1e30', color: 'white' }}
        />

        <input
          placeholder="Rounds"
          value={rounds}
          onChange={(e) => setRounds(e.target.value)}
          style={{ padding: '12px', borderRadius: '10px', background: '#13131f', border: '1px solid #1e1e30', color: 'white' }}
        />
      </div>

      <input
        placeholder="Punches Thrown"
        value={punches}
        onChange={(e) => setPunches(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          background: '#13131f',
          border: '1px solid #1e1e30',
          color: 'white',
          marginBottom: '16px',
          boxSizing: 'border-box'
        }}
      />
      {(sessionType === 'Heavy Bag' || sessionType === 'Pad Work') && (
  <>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
      <input
        placeholder="Punches Landed"
        value={punchesLanded}
        onChange={(e) => setPunchesLanded(e.target.value)}
        style={{ padding: '12px', borderRadius: '10px', background: '#13131f', border: '1px solid #1e1e30', color: 'white' }}
      />

      <input
        placeholder="Jabs"
        value={jabs}
        onChange={(e) => setJabs(e.target.value)}
        style={{ padding: '12px', borderRadius: '10px', background: '#13131f', border: '1px solid #1e1e30', color: 'white' }}
      />

      <input
        placeholder="Crosses"
        value={crosses}
        onChange={(e) => setCrosses(e.target.value)}
        style={{ padding: '12px', borderRadius: '10px', background: '#13131f', border: '1px solid #1e1e30', color: 'white' }}
      />

      <input
        placeholder="Hooks"
        value={hooks}
        onChange={(e) => setHooks(e.target.value)}
        style={{ padding: '12px', borderRadius: '10px', background: '#13131f', border: '1px solid #1e1e30', color: 'white' }}
      />

      <input
        placeholder="Uppercuts"
        value={uppercuts}
        onChange={(e) => setUppercuts(e.target.value)}
        style={{ padding: '12px', borderRadius: '10px', background: '#13131f', border: '1px solid #1e1e30', color: 'white' }}
      />
    </div>

    <input
      placeholder="Main combo worked on"
      value={combo}
      onChange={(e) => setCombo(e.target.value)}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        background: '#13131f',
        border: '1px solid #1e1e30',
        color: 'white',
        marginBottom: '16px',
        boxSizing: 'border-box'
      }}
    />
  </>
)}

{sessionType === 'Sparring' && (
  <input
    placeholder="Knockdowns"
    value={knockdowns}
    onChange={(e) => setKnockdowns(e.target.value)}
    style={{
      width: '100%',
      padding: '12px',
      borderRadius: '10px',
      background: '#13131f',
      border: '1px solid #1e1e30',
      color: 'white',
      marginBottom: '16px',
      boxSizing: 'border-box'
    }}
  />
)}

{sessionType === 'Strength & Conditioning' && (
  <input
    placeholder="Calories Burned"
    value={calories}
    onChange={(e) => setCalories(e.target.value)}
    style={{
      width: '100%',
      padding: '12px',
      borderRadius: '10px',
      background: '#13131f',
      border: '1px solid #1e1e30',
      color: 'white',
      marginBottom: '16px',
      boxSizing: 'border-box'
    }}
  />
)}
      

      <label style={{ display: 'block', marginBottom: '8px' }}>
  Intensity Rating: {intensity}/10
</label>

<input
  type="range"
  min="1"
  max="10"
  value={intensity}
  onChange={(e) => setIntensity(e.target.value)}
  style={{ width: '100%', marginBottom: '18px' }}
/>


      <label style={{ display: 'block', marginBottom: '8px' }}>
        Fitness Rating: {fitness}/10
      </label>

      <input
        type="range"
        min="1"
        max="10"
        value={fitness}
        onChange={(e) => setFitness(e.target.value)}
        style={{ width: '100%', marginBottom: '18px' }}
      />

      <label style={{ display: 'block', marginBottom: '8px' }}>
        Defence Rating: {defence}/10
      </label>

      <input
        type="range"
        min="1"
        max="10"
        value={defence}
        onChange={(e) => setDefence(e.target.value)}
        style={{ width: '100%', marginBottom: '18px' }}
      />

      <textarea
        placeholder="Session notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          background: '#13131f',
          border: '1px solid #1e1e30',
          color: 'white',
          boxSizing: 'border-box',
          marginBottom: '20px'
        }}
      />

      <button
        onClick={saveSession}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg,#ef4444,#dc2626)',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          padding: '14px',
          fontWeight: '900',
          cursor: 'pointer'
        }}
      >
        Save Session
      </button>
    </div>
  )
}
function LogCycling({ setActiveNav, cyclingSessions, setCyclingSessions, addSocialPost }: any) {
  const [rideType, setRideType] = useState('Road Ride')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [avgSpeed, setAvgSpeed] = useState('')
  const [elevation, setElevation] = useState('')
  const [effort, setEffort] = useState(5)
  const [notes, setNotes] = useState('')

  const saveRide = async () => {
    const newRide = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      rideType,
      distance: Number(distance),
      duration: Number(duration),
      avgSpeed: Number(avgSpeed),
      elevation: Number(elevation),
      effort,
      notes
    }

    setCyclingSessions([newRide, ...cyclingSessions])

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('cycling_sessions').insert({
        user_id: session.user.id,
        ride_type: rideType,
        distance: Number(distance) || 0,
        duration: Number(duration) || 0,
        avg_speed: Number(avgSpeed) || 0,
        elevation: Number(elevation) || 0,
        effort,
        notes
      })
    }

    addSocialPost?.({
      sport: 'Cycling',
      sportColor: '#10b981',
      emoji: '🚴',
      caption: `Logged a ${Number(distance)}km ${rideType} — ${duration} mins at ${avgSpeed}km/h.`
    })

    setActiveNav('cycling-hub')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', padding: '24px', maxWidth: '430px', margin: '0 auto' }}>
      <button onClick={() => setActiveNav('cycling-hub')} style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: '700', marginBottom: '20px' }}>
        ← Back
      </button>

      <h1>🚴 Log Ride</h1>

      <select
        value={rideType}
        onChange={(e) => setRideType(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '10px', background: '#13131f', color: 'white' }}
      >
        <option>Road Ride</option>
        <option>Mountain Bike</option>
        <option>Recovery Ride</option>
        <option>Interval Session</option>
        <option>Long Ride</option>
        <option>Commute</option>
      </select>

      <input placeholder="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} style={inputStyle} />
      <input placeholder="Duration (mins)" value={duration} onChange={(e) => setDuration(e.target.value)} style={inputStyle} />
      <input placeholder="Average Speed (km/h)" value={avgSpeed} onChange={(e) => setAvgSpeed(e.target.value)} style={inputStyle} />
      <input placeholder="Elevation Gain (m)" value={elevation} onChange={(e) => setElevation(e.target.value)} style={inputStyle} />

      <label>Effort: {effort}/10</label>
      <input
        type="range"
        min="1"
        max="10"
        value={effort}
        onChange={(e) => setEffort(Number(e.target.value))}
        style={{ width: '100%', marginBottom: '20px' }}
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '12px',
          borderRadius: '10px',
          background: '#13131f',
          color: 'white',
          marginBottom: '20px'
        }}
      />

      <button
        onClick={saveRide}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          border: 'none',
          background: '#10b981',
          color: 'white',
          fontWeight: '800'
        }}
      >
        Save Ride
      </button>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  borderRadius: '10px',
  background: '#13131f',
  border: '1px solid #222',
  color: 'white',
  boxSizing: 'border-box' as const
}
function BoxingStats({ setActiveNav, boxingSessions, setBoxingSessions }: any) {
  const totalSessions = boxingSessions.length
  const totalRounds = boxingSessions.reduce((sum: number, s: any) => sum + (s.rounds || 0), 0)
  const totalPunches = boxingSessions.reduce((sum: number, s: any) => sum + (s.punches || 0), 0)
  const totalLanded = boxingSessions.reduce((sum: number, s: any) => sum + (s.punchesLanded || 0), 0)
  const accuracy = totalPunches > 0 ? Math.round((totalLanded / totalPunches) * 100) : 0
  const avgFitness = totalSessions > 0
  ? (boxingSessions.reduce((sum: number, s: any) => sum + (s.fitness || 0), 0) / totalSessions).toFixed(1)
  : '0.0'

const avgDefence = totalSessions > 0
  ? (boxingSessions.reduce((sum: number, s: any) => sum + (s.defence || 0), 0) / totalSessions).toFixed(1)
  : '0.0'

const avgIntensity = totalSessions > 0
  ? (boxingSessions.reduce((sum: number, s: any) => sum + (s.intensity || 0), 0) / totalSessions).toFixed(1)
  : '0.0'

  const totalJabs = boxingSessions.reduce((sum: number, s: any) => sum + (s.jabs || 0), 0)
  const totalCrosses = boxingSessions.reduce((sum: number, s: any) => sum + (s.crosses || 0), 0)
  const totalHooks = boxingSessions.reduce((sum: number, s: any) => sum + (s.hooks || 0), 0)
  const totalUppercuts = boxingSessions.reduce((sum: number, s: any) => sum + (s.uppercuts || 0), 0)

  const sparringSessions = boxingSessions.filter((s: any) => s.sessionType === 'Sparring').length
  const knockdowns = boxingSessions.reduce((sum: number, s: any) => sum + (s.knockdowns || 0), 0)

  const bestPunches = boxingSessions.length ? Math.max(...boxingSessions.map((s: any) => s.punches || 0)) : 0
  const bestRounds = boxingSessions.length ? Math.max(...boxingSessions.map((s: any) => s.rounds || 0)) : 0
  const longestSession = boxingSessions.length ? Math.max(...boxingSessions.map((s: any) => s.duration || 0)) : 0

  const sessionTypes = ['Heavy Bag', 'Pad Work', 'Sparring', 'Technical Drills', 'Footwork', 'Strength & Conditioning']

  const handleDeleteSession = async (sessionId: any) => {
    setBoxingSessions(boxingSessions.filter((s: any) => s.id !== sessionId))
    await supabase.from('boxing_sessions').delete().eq('id', sessionId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('boxing-hub')} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>Boxing Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Rounds, technical work, accuracy and training trends</p>

        <div style={{ background: '#13131f', border: '1px solid #ef444425', borderLeft: '4px solid #ef4444', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: '900', marginBottom: '12px' }}>OVERVIEW</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Sessions', value: totalSessions, color: '#ef4444' },
              { label: 'Rounds', value: totalRounds, color: '#f97316' },
{ label: 'Intensity', value: `${avgIntensity}/10`, color: '#06b6d4' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '13px', padding: '13px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '22px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #f9731625', borderLeft: '4px solid #f97316', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#f97316', fontSize: '13px', fontWeight: '900', marginBottom: '12px' }}>PUNCH VOLUME</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
            
              { label: 'Accuracy', value: `${accuracy}%`, color: '#22c55e' },
              { label: 'Jabs', value: totalJabs, color: '#06b6d4' },
              { label: 'Crosses', value: totalCrosses, color: '#a855f7' },
              { label: 'Hooks', value: totalHooks, color: '#f97316' },
              { label: 'Uppercuts', value: totalUppercuts, color: '#eab308' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '13px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '20px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '10px', fontWeight: '700', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#a855f7', fontSize: '13px', fontWeight: '900', marginBottom: '12px' }}>SESSION BREAKDOWN</div>

          {sessionTypes.map((type) => {
            const count = boxingSessions.filter((s: any) => s.sessionType === type).length
            const percent = totalSessions > 0 ? Math.round((count / totalSessions) * 100) : 0

            return (
              <div key={type} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                  <span style={{ color: '#aaa', fontWeight: '700' }}>{type}</span>
                  <span style={{ color: '#666' }}>{count} sessions · {percent}%</span>
                </div>
                <div style={{ height: '7px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${percent}%`, height: '100%', background: '#ef4444' }} />
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ background: '#13131f', border: '1px solid #22c55e25', borderLeft: '4px solid #22c55e', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#22c55e', fontSize: '13px', fontWeight: '900', marginBottom: '12px' }}>PERSONAL BESTS</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Best Fitness', value: `${avgFitness}/10`, color: '#ef4444' },
              { label: 'Most Rounds', value: bestRounds, color: '#f97316' },
              { label: 'Longest', value: `${longestSession}m`, color: '#06b6d4' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#0a0a0f', border: `1px solid ${stat.color}25`, borderRadius: '13px', padding: '13px', textAlign: 'center' }}>
                <div style={{ color: stat.color, fontSize: '19px', fontWeight: '900' }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '9px', fontWeight: '700', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ color: '#06b6d4', fontSize: '13px', fontWeight: '900', marginBottom: '12px' }}>SPARRING</div>
          <div style={{ color: '#aaa', fontSize: '14px' }}>
            {sparringSessions} sparring sessions · {knockdowns} knockdowns
          </div>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 14px' }}>Recent Sessions</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {boxingSessions.length === 0 && (
            <div onClick={() => setActiveNav('log-boxing')} style={{ background: '#13131f', border: '1px solid #ef444425', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🥊</div>
              <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px', color: '#ef4444' }}>Ready to start boxing?</div>
              <div style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>Log your first boxing session to see stats here</div>
              <span style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '20px', color: '#ef4444', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}>Log a Session →</span>
            </div>
          )}

          {boxingSessions.slice(0, 6).map((session: any) => (
            <div key={session.id} style={{ background: '#13131f', border: '1px solid #ef444425', borderLeft: '4px solid #ef4444', borderRadius: '14px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{session.sessionType}</div>
              <div style={{ color: '#666', fontSize: '12px', marginBottom: '6px' }}>{session.duration || 0} mins · {session.rounds || 0} rounds</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {session.sessionType && <span style={{ background: '#ef444415', border: '1px solid #ef444430', borderRadius: '20px', color: '#ef4444', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{session.sessionType}</span>}
                {session.punches > 0 && <span style={{ background: '#f9731615', border: '1px solid #f9731630', borderRadius: '20px', color: '#f97316', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>{session.punches} punches</span>}
                {session.intensity > 0 && <span style={{ background: '#a855f715', border: '1px solid #a855f730', borderRadius: '20px', color: '#a855f7', fontSize: '10px', fontWeight: '700', padding: '3px 8px' }}>Intensity {session.intensity}/10</span>}
              </div>
              </div>
              <button onClick={() => handleDeleteSession(session.id)} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '8px', color: '#ef4444', padding: '8px 10px', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BoxingRecords({ setActiveNav, boxingSessions }: any) {
  const bestPunches = boxingSessions.length ? Math.max(...boxingSessions.map((s: any) => s.punches || 0)) : 0
  const bestAccuracy = (() => {
    const withPunches = boxingSessions.filter((s: any) => (s.punches || 0) > 0)
    if (withPunches.length === 0) return 0
    return Math.max(...withPunches.map((s: any) => Math.round(((s.punchesLanded || 0) / s.punches) * 100)))
  })()
  const mostRounds = boxingSessions.length ? Math.max(...boxingSessions.map((s: any) => s.rounds || 0)) : 0
  const longestSession = boxingSessions.length ? Math.max(...boxingSessions.map((s: any) => s.duration || 0)) : 0
  const mostKnockdowns = boxingSessions.length ? Math.max(...boxingSessions.map((s: any) => s.knockdowns || 0)) : 0

  const records = [
    { title: 'Most Punches in a Session', value: bestPunches, emoji: '🥊', color: '#ef4444' },
    { title: 'Best Accuracy', value: `${bestAccuracy}%`, emoji: '🎯', color: '#22c55e' },
    { title: 'Most Rounds', value: mostRounds, emoji: '🔁', color: '#f97316' },
    { title: 'Longest Session', value: `${longestSession} mins`, emoji: '⏱️', color: '#06b6d4' },
    { title: 'Most Knockdowns Landed', value: mostKnockdowns, emoji: '💥', color: '#a855f7' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('boxing-hub')} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>Boxing Records</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your best sessions, automatically tracked</p>

        {boxingSessions.length === 0 && (
          <div style={{ background: '#13131f', border: '1px dashed #1e1e30', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#666', fontSize: '13px', marginBottom: '20px' }}>
            Log a boxing session to start setting records.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {records.map((record) => (
            <div key={record.title} style={{ background: '#13131f', border: `1px solid ${record.color}25`, borderLeft: `4px solid ${record.color}`, borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${record.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{record.emoji}</div>
              <div>
                <div style={{ color: record.color, fontSize: '24px', fontWeight: '900' }}>{record.value}</div>
                <div style={{ color: '#aaa', fontSize: '13px', fontWeight: '700' }}>{record.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SuggestedBoxingSessions({ setActiveNav, setSelectedBoxingCategory }: any) {
  const categories = [
    { label: 'Punching Power', emoji: '🥊', color: '#ef4444', desc: 'Build stronger shots, hip rotation and heavy bag power' },
    { label: 'Speed & Combinations', emoji: '⚡', color: '#f97316', desc: 'Improve hand speed, rhythm, punch flow and combinations' },
    { label: 'Defence', emoji: '🛡️', color: '#06b6d4', desc: 'Slips, rolls, blocks, parries and counter-punching' },
    { label: 'Footwork', emoji: '👣', color: '#a855f7', desc: 'Movement, angles, pivots, balance and ring control' },
    { label: 'Conditioning', emoji: '🔥', color: '#22c55e', desc: 'Boxing fitness, repeated rounds, explosiveness and endurance' },
    { label: 'Sparring Prep', emoji: '🥊', color: '#eab308', desc: 'Prepare for live rounds with controlled technical work' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('boxing-hub')} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px' }}>Boxing Training</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Choose an area to improve</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => {
                setSelectedBoxingCategory(cat.label)
                setActiveNav('boxing-session-detail')
              }}
              style={{ background: '#13131f', border: `1px solid ${cat.color}25`, borderLeft: `4px solid ${cat.color}`, borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{cat.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '900', fontSize: '16px' }}>{cat.label}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '4px', lineHeight: '1.4' }}>{cat.desc}</div>
              </div>
              <div style={{ color: cat.color, fontSize: '22px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BoxingSessionDetail({ category, setActiveNav }: any) {
  const sessionData: any = {
    'Punching Power': {
      emoji: '🥊',
      color: '#ef4444',
      sections: [
        {
          title: 'Heavy Bag Power',
          drills: [
            {
              name: 'Power Jab',
              setup: 'Throw single jabs with full hip rotation, balance and shoulder snap. Reset your stance after every punch.',
              reps: '3 x 2 min rounds',
              tip: 'Power starts from your feet and hips, not just your arm.'
            },
            {
              name: 'Power Combinations',
              setup: 'Throw 1-2, 1-2-hook and jab-cross-body hook combinations at controlled power.',
              reps: '4 x 2 min rounds',
              tip: 'Stay balanced after every combination so you can defend or move.'
            },
            {
              name: 'Body Shot Rounds',
              setup: 'Work hooks and straight shots to the body on the heavy bag. Bend your knees and punch through the target.',
              reps: '3 rounds',
              tip: 'Do not lean forward. Level change with your legs.'
            }
          ]
        }
      ]
    },

    'Speed & Combinations': {
      emoji: '⚡',
      color: '#f97316',
      sections: [
        {
          title: 'Speed & Flow',
          drills: [
            {
              name: 'Rapid Fire Jab',
              setup: 'Throw fast jabs continuously while keeping your guard high and feet active.',
              reps: '30 sec on / 30 sec off x 6',
              tip: 'Relax your shoulders. Tension makes you slower.'
            },
            {
              name: '3-Punch Flow',
              setup: 'Work smooth 3-punch combinations on pads or bag. Focus on rhythm and clean technique.',
              reps: '5 rounds',
              tip: 'Speed comes from staying loose, not rushing.'
            },
            {
              name: 'Combo Ladder',
              setup: 'Build from 2 punches to 5 punches: 1-2, 1-2-3, 1-2-3-2, then add a defensive move.',
              reps: '10 minutes',
              tip: 'Always finish combos with your hands back to guard.'
            }
          ]
        }
      ]
    },

    Defence: {
      emoji: '🛡️',
      color: '#06b6d4',
      sections: [
        {
          title: 'Defensive Reactions',
          drills: [
            {
              name: 'Slip Line',
              setup: 'Move under a rope while stepping forward and backwards. Add counters after each slip.',
              reps: '5 mins',
              tip: 'Move your feet and body together, not just your head.'
            },
            {
              name: 'Roll & Counter',
              setup: 'Practise rolling under hooks, then return with hook-cross or hook-hook combinations.',
              reps: '3 rounds',
              tip: 'Keep your eyes on your opponent during the roll.'
            },
            {
              name: 'Block-Parry-Counter',
              setup: 'Partner throws light jabs and crosses. Block or parry, then counter with one clean shot.',
              reps: '4 x 2 min rounds',
              tip: 'Defence should lead into attack, not just survival.'
            }
          ]
        }
      ]
    },

    Footwork: {
      emoji: '👣',
      color: '#a855f7',
      sections: [
        {
          title: 'Movement & Angles',
          drills: [
            {
              name: 'Box Step Drill',
              setup: 'Move around a marked square while maintaining stance, guard and balance.',
              reps: '5 mins',
              tip: 'Never cross your feet. Small steps keep you balanced.'
            },
            {
              name: 'Pivot Drill',
              setup: 'Step and pivot around an imaginary opponent after throwing a jab or 1-2.',
              reps: '3 rounds',
              tip: 'The aim is to create an angle, not just spin in place.'
            },
            {
              name: 'In-Out Movement',
              setup: 'Step into range with a jab, then step back out before an imaginary counter.',
              reps: '4 rounds',
              tip: 'Do not admire your work. Hit, move, reset.'
            }
          ]
        }
      ]
    },

    Conditioning: {
      emoji: '🔥',
      color: '#22c55e',
      sections: [
        {
          title: 'Fight Fitness',
          drills: [
            {
              name: 'Sprint Intervals',
              setup: 'Sprint for 30 seconds, walk for 30 seconds. Keep every sprint explosive.',
              reps: '10 rounds',
              tip: 'Boxing fitness is repeated high-intensity efforts.'
            },
            {
              name: 'Burpee Finisher',
              setup: 'Perform explosive burpees with good form. Add a shadow boxing combo after every 5 reps.',
              reps: '50 total',
              tip: 'Stay sharp when tired. That is the point of the drill.'
            },
            {
              name: '3-Minute Fight Rounds',
              setup: 'Shadow box, sprawl, punch-out and move continuously for full rounds.',
              reps: '4 x 3 min rounds',
              tip: 'Pace yourself like a real round: bursts, movement, recovery.'
            }
          ]
        }
      ]
    },

    'Sparring Prep': {
      emoji: '🥊',
      color: '#eab308',
      sections: [
        {
          title: 'Pre-Sparring Control',
          drills: [
            {
              name: 'Controlled Technical Spar',
              setup: 'Work at 50% intensity focusing on movement, defence and clean counters.',
              reps: '4 rounds',
              tip: 'Winning exchanges is less important than learning.'
            },
            {
              name: 'Reaction Drill',
              setup: 'Partner gives visual cues. React with slip, block, parry, counter or movement.',
              reps: '10 mins',
              tip: 'React to what you see. Do not guess.'
            },
            {
              name: 'Jab-Only Sparring',
              setup: 'Light sparring where both fighters can only use the jab. Focus on distance and timing.',
              reps: '3 rounds',
              tip: 'The jab controls range, rhythm and pressure.'
            }
          ]
        }
      ]
    }
  }

  const data = sessionData[category]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('boxing-plans')} style={{ background: 'none', border: 'none', color: data.color, fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>
          ← Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{ width: '58px', height: '58px', borderRadius: '50%', border: `2px solid ${data.color}`, background: `${data.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
            {data.emoji}
          </div>

          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '900' }}>{category}</h1>
            <p style={{ color: '#666', margin: '4px 0 0', fontSize: '13px' }}>Boxing development drills</p>
          </div>
        </div>

        {data.sections.map((section: any) => (
          <div key={section.title} style={{ marginBottom: '24px' }}>
            <h2 style={{ color: data.color, fontSize: '13px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
              {section.title}
            </h2>

            {section.drills.map((drill: any) => (
              <div
                key={drill.name}
                style={{
                  background: '#13131f',
                  border: `1px solid ${data.color}25`,
                  borderLeft: `4px solid ${data.color}`,
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '12px'
                }}
              >
                <div style={{ fontWeight: '900', marginBottom: '6px', fontSize: '15px' }}>
                  {drill.name}
                </div>

                <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '10px', lineHeight: '1.5' }}>
                  {drill.setup}
                </div>

                <div style={{ display: 'inline-block', color: data.color, background: `${data.color}18`, border: `1px solid ${data.color}35`, borderRadius: '999px', padding: '5px 10px', fontSize: '11px', fontWeight: '900', marginBottom: '10px' }}>
                  📋 {drill.reps}
                </div>

                <div style={{ background: '#0a0a0f', border: `1px solid ${data.color}25`, borderRadius: '12px', padding: '10px', color: '#888', fontSize: '12px', lineHeight: '1.5' }}>
                  <strong style={{ color: data.color }}>💡 Coaching tip:</strong> {drill.tip}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
  
  
function LogBasketball({ setActiveNav, basketballSessions, setBasketballSessions, addSocialPost }: any) {
  const [sessionType, setSessionType] = useState('')
  const [duration, setDuration] = useState('')
  const [points, setPoints] = useState('')
  const [assists, setAssists] = useState('')
  const [rebounds, setRebounds] = useState('')
  const [steals, setSteals] = useState('')
  const [blocks, setBlocks] = useState('')
  const [shotsMade, setShotsMade] = useState('')
  const [shotsTaken, setShotsTaken] = useState('')
  const [focus, setFocus] = useState('')
  const [notes, setNotes] = useState('')

  // High-Level Feature State Additions
  const [paintMakes, setPaintMakes] = useState('0')
  const [midMakes, setMidMakes] = useState('0')
  const [threeMakes, setThreeMakes] = useState('0')

  const calculatedTotalPoints = (parseInt(paintMakes) * 2) + (parseInt(midMakes) * 2) + (parseInt(threeMakes) * 3);

  const handleSave = async () => {
    const newSession = {
      id: Date.now(),
      sessionType,
      duration: parseInt(duration) || 0,
      points: parseInt(points) || 0,
      assists: parseInt(assists) || 0,
      rebounds: parseInt(rebounds) || 0,
      steals: parseInt(steals) || 0,
      blocks: parseInt(blocks) || 0,
      shotsMade: parseInt(shotsMade) || 0,
      shotsTaken: parseInt(shotsTaken) || 0,
      focus,
      notes,
      date: new Date().toISOString().split('T')[0]
    }

    setBasketballSessions([newSession, ...basketballSessions])

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('basketball_sessions').insert({
        user_id: session.user.id,
        session_type: sessionType,
        duration: parseInt(duration) || 0,
        points: parseInt(points) || 0,
        assists: parseInt(assists) || 0,
        rebounds: parseInt(rebounds) || 0,
        steals: parseInt(steals) || 0,
        blocks: parseInt(blocks) || 0,
        shots_made: parseInt(shotsMade) || 0,
        shots_taken: parseInt(shotsTaken) || 0,
        focus,
        notes
      })
    }

    addSocialPost({
      sport: 'Basketball',
      sportColor: '#f97316',
      emoji: '🏀',
      caption: `Logged a ${sessionType || 'basketball session'} — ${points || 0} points, ${assists || 0} assists and ${rebounds || 0} rebounds.`
    })

    playHaptic()
    playSound('success')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('basketball-hub')} style={{ background: 'none', border: 'none', color: '#f97316', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px' }}>Log Basketball</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 26px' }}>Track games, training and shooting volume</p>

        <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '700', display: 'block', marginBottom: '10px' }}>SESSION TYPE</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Game', 'Skills', 'Training'].map((type) => (
            <button key={type} onClick={() => setSessionType(type)} style={{ background: sessionType === type ? '#f9731620' : '#13131f', border: `1.5px solid ${sessionType === type ? '#f97316' : '#1e1e30'}`, borderRadius: '10px', color: sessionType === type ? '#f97316' : '#666', padding: '10px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>{type}</button>
          ))}
        </div>

        {sessionType && (
          <>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration minutes" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', marginBottom: '14px', boxSizing: 'border-box' }} />

            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
  {sessionType === 'Game' ? 'GAME TYPE' : sessionType === 'Skills' ? 'SKILL FOCUS' : 'TRAINING FOCUS'}
</label>

<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
  {(sessionType === 'Game'
    ? ['5v5 Match', '3v3', '1v1', 'Scrimmage']
    : sessionType === 'Skills'
    ? ['Shooting', 'Handles', 'Finishing', 'Passing', 'Defence']
    : ['Conditioning', 'Agility', 'Strength', 'Footwork', 'Team Training']
  ).map((f) => (
    <button key={f} onClick={() => setFocus(f)} style={{ background: focus === f ? '#f9731620' : '#13131f', border: `1.5px solid ${focus === f ? '#f97316' : '#1e1e30'}`, borderRadius: '20px', color: focus === f ? '#f97316' : '#666', padding: '7px 13px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>{f}</button>
  ))}
</div>

{sessionType === 'Game' && (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
    {[
      ['Points', points, setPoints],
      ['Assists', assists, setAssists],
      ['Rebounds', rebounds, setRebounds],
      ['Steals', steals, setSteals],
      ['Blocks', blocks, setBlocks],
      ['Shots Made', shotsMade, setShotsMade],
      ['Shots Taken', shotsTaken, setShotsTaken],
    ].map(([label, value, setter]: any) => (
      <div key={label}>
        <label style={{ fontSize: '11px', color: '#666', display: 'block', marginBottom: '6px' }}>{label}</label>
        <input value={value} onChange={(e) => setter(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '800', textAlign: 'center', boxSizing: 'border-box' }} />
      </div>
    ))}
  </div>
)}

{(sessionType === 'Skills' || sessionType === 'Training') && (
  <div style={{ marginBottom: '18px' }}>
    <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
      {sessionType === 'Skills' ? 'DRILLS COMPLETED' : 'TRAINING WORK COMPLETED'}
    </label>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
      {(sessionType === 'Skills'
        ? ['Form Shooting', 'Free Throws', '3 Point Shooting', 'Layups', 'Ball Handling', 'Crossover Work', 'Passing', 'Defensive Slides']
        : ['Conditioning Runs', 'Agility Ladder', 'Defensive Footwork', 'Sprint Intervals', 'Strength Work', 'Plyometrics', 'Team Practice', 'Recovery']
      ).map((drill) => (
        <button
          key={drill}
          onClick={() => setNotes(notes ? notes + `, ${drill}` : drill)}
          style={{
            background: '#f9731615',
            border: '1px solid #f9731640',
            borderRadius: '20px',
            color: '#f97316',
            padding: '7px 12px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          + {drill}
        </button>
      ))}
    </div>

    <div style={{ color: '#666', fontSize: '12px', lineHeight: '1.5' }}>
      Tap drills to add them to your notes, or type your own below.
    </div>
    <input
  placeholder={
    sessionType === 'Skills'
      ? 'Type your own drill (e.g. Step-back shooting, weak-hand layups...)'
      : 'Type your own training activity (e.g. hill sprints, gym session...)'
  }
  onKeyDown={(e) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      setNotes(notes ? notes + `, ${e.currentTarget.value}` : e.currentTarget.value)
      e.currentTarget.value = ''
    }
  }}
  style={{
    width: '100%',
    marginTop: '12px',
    background: '#13131f',
    border: '1.5px solid #1e1e30',
    borderRadius: '10px',
    color: 'white',
    padding: '12px',
    boxSizing: 'border-box'
  }}
/>
  </div>
)}

            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes: what went well, what to improve?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', marginBottom: '24px' }} />

            <button onClick={handleSave} style={{ width: '100%', background: saved ? '#ea580c' : 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '900', cursor: 'pointer' }}>
              {saved ? '✓ Basketball Session Saved!' : 'Save Session'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
function SwimmingHub({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const options = [
    { id: 'log-swim', label: 'Log Swim', emoji: '📝', desc: 'Distance, stroke, lengths and pace', color: '#3b82f6' },
    { id: 'swimming-plans', label: 'Suggested Sessions', emoji: '💡', desc: 'Technique, endurance, sprint and recovery', color: '#f59e0b' },
    { id: 'swimming-prs', label: 'Personal Records', emoji: '🏆', desc: 'Fastest 100m, 400m and 1500m', color: '#22c55e' },
    { id: 'swimming-stats', label: 'My Stats', emoji: '📊', desc: 'Distance, lengths, pace and stroke mix', color: '#a855f7' },
  ]

  return <SportHubTemplate setActiveNav={setActiveNav} title="Swimming Hub" emoji="🏊" color="#3b82f6" options={options} />
}

function SportHubTemplate({ setActiveNav, title, emoji, color, options, banner }: any) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '50px 24px 8px' }}>
          <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: `2.5px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', background: '#13131f', boxShadow: `0 0 16px ${color}50` }}>{emoji}</div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{title}</h1>
              <p style={{ color: '#666', fontSize: '13px', margin: '2px 0 0' }}>What do you want to do?</p>
            </div>
          </div>
        </div>

        {banner && <div style={{ padding: '0 24px' }}>{banner}</div>}

        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {options.map((opt: any) => (
            <div key={opt.id} onClick={() => setActiveNav(opt.id)} style={{ background: '#13131f', border: `1px solid ${opt.color}30`, borderLeft: `4px solid ${opt.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${opt.color}10` }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${opt.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{opt.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{opt.label}</div>
                <div style={{ color: '#666', fontSize: '13px' }}>{opt.desc}</div>
              </div>
              <div style={{ color: opt.color, fontSize: '24px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function FootballHub({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [activeNav, setActiveNavLocal] = useState('track')
  const options = [
    { id: 'log-session', label: 'Log a Session', emoji: '📝', desc: 'Record training or match details', color: '#22c55e' },
    { id: 'fixtures', label: 'Fixtures & Results', emoji: '📅', desc: '5-a-side, Sunday league, kickabout', color: '#06b6d4' },
    { id: 'suggested-drills', label: 'Suggested Drills', emoji: '💡', desc: 'Browse drills for your position', color: '#f59e0b' },
    { id: 'my-stats', label: 'My Stats', emoji: '📊', desc: 'Goals, assists, sessions and more', color: '#a855f7' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '50px 24px 8px' }}>
          <button onClick={() => setActiveNav('track')} style={{ background: 'none', border: 'none', color: '#22c55e', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2.5px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', background: '#13131f', boxShadow: '0 0 16px #22c55e50' }}>⚽</div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>Football Hub</h1>
              <p style={{ color: '#666', fontSize: '13px', margin: '2px 0 0' }}>What do you want to do?</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {options.map((opt) => (
            <div key={opt.id} onClick={() => setActiveNav(opt.id)} style={{ background: '#13131f', border: `1px solid ${opt.color}30`, borderLeft: `4px solid ${opt.color}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${opt.color}10` }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${opt.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{opt.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{opt.label}</div>
                <div style={{ color: '#666', fontSize: '13px' }}>{opt.desc}</div>
              </div>
              <div style={{ color: '#444', fontSize: '20px' }}>›</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#0d0d1a', borderTop: '1px solid #1e1e30', display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px', zIndex: 100 }}>
        {[{ id: 'home', label: 'Home', emoji: '🏠' }, { id: 'sports', label: 'Sports', emoji: '🏅' }, { id: 'track', label: 'Track', emoji: '📈' }, { id: 'social', label: 'Social', emoji: '👥' }, { id: 'profile', label: 'Profile', emoji: '👤' }].map((item) => (
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNav === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function TrackPage({ setActiveNav, footballSessions, gymSessions, tennisSessions, runningSessions, swimmingSessions, basketballSessions, boxingSessions, cyclingSessions, golfSessions, rugbySessions, cricketSessions }: any) {  const [activeNav, setActiveNavLocal] = useState('track')

const recentSessions = [
  ...footballSessions.map((s: any) => ({
    sport: 'Football', title: s.sessionType || s.session_type || 'Football Session',
    detail: `${s.duration || 0} min · ${s.goals || 0} goals · ${s.assists || 0} assists`,
    date: s.date || 'Recent', color: '#22c55e'
  })),
  ...gymSessions.map((s: any) => ({
    sport: 'Gym', title: s.title || 'Gym Workout',
    detail: `${s.duration || 0} min · ${s.exercises ? s.exercises.filter((e: any) => e.name).length : 0} exercises`,
    date: s.date || 'Recent', color: '#a855f7'
  })),
  ...tennisSessions.map((s: any) => ({
    sport: 'Tennis', title: s.sessionType || 'Tennis Session',
    detail: `${s.duration || 0} min · ${s.focus || 'General'}`,
    date: s.date || 'Recent', color: '#eab308'
  })),
  ...runningSessions.map((s: any) => ({
    sport: 'Running', title: s.runType || 'Run',
    detail: `${s.distance || 0}km · ${s.time || 0} min · ${s.pace || 'N/A'}`,
    date: s.date || 'Recent', color: '#06b6d4'
  })),
  ...swimmingSessions.map((s: any) => ({
    sport: 'Swimming', title: s.stroke || s.swimType || 'Swim',
    detail: `${s.distance || 0}m · ${s.time || 0} min · ${s.pace || 'N/A'}`,
    date: s.date || 'Recent', color: '#3b82f6'
  })),
  ...basketballSessions.map((s: any) => ({
    sport: 'Basketball', title: s.sessionType || 'Basketball Session',
    detail: `${s.duration || 0} min · ${s.points || 0} pts · ${s.assists || 0} ast`,
    date: s.date || 'Recent', color: '#f97316'
  })),
  ...boxingSessions.map((s: any) => ({
    sport: 'Boxing', title: s.sessionType || 'Boxing Session',
    detail: `${s.duration || 0} min · ${s.rounds || 0} rounds`,
    date: s.date || 'Recent', color: '#ef4444'
  })),
  ...cyclingSessions.map((s: any) => ({
    sport: 'Cycling', title: s.rideType || 'Ride',
    detail: `${s.distance || 0}km · ${s.duration || 0} min`,
    date: s.date || 'Recent', color: '#10b981'
  })),
  ...golfSessions.map((s: any) => ({
    sport: 'Golf', title: s.session_type || 'Golf Session',
    detail: `${s.holes || 0} holes · Score ${s.score || '-'}`,
    date: s.date || 'Recent', color: '#84cc16'
  })),
  ...rugbySessions.map((s: any) => ({
    sport: 'Rugby', title: s.session_type || 'Rugby Session',
    detail: `${s.duration || 0} min · ${s.tries || 0} tries`,
    date: s.date || 'Recent', color: '#f59e0b'
  })),
  ...cricketSessions.map((s: any) => ({
    sport: 'Cricket', title: s.session_type || 'Cricket Session',
    detail: `${s.runs || 0} runs · ${s.wickets || 0} wickets`,
    date: s.date || 'Recent', color: '#06b6d4'
  })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  const sportCards = [
    { id: 'football-hub', name: 'Football', emoji: '⚽', color: '#22c55e', sessions: footballSessions.length },
    { id: 'gym-hub', name: 'Gym', emoji: '🏋️', color: '#a855f7', sessions: gymSessions.length },
    { id: 'tennis-hub', name: 'Tennis', emoji: '🎾', color: '#eab308', sessions: tennisSessions.length },
    { id: 'running-hub', name: 'Running', emoji: '🏃', color: '#06b6d4', sessions: runningSessions.length },
    { id: 'swimming-hub', name: 'Swimming', emoji: '🏊', color: '#3b82f6', sessions: swimmingSessions.length },
    { id: 'basketball-hub', name: 'Basketball', emoji: '🏀', color: '#f97316', sessions: basketballSessions.length },
    { id: 'boxing-hub', name: 'Boxing', emoji: '🥊', color: '#ef4444', sessions: boxingSessions.length },
    { id: 'cycling-hub', name: 'Cycling', emoji: '🚴', color: '#10b981', sessions: cyclingSessions.length },
    { id: 'golf-hub', name: 'Golf', emoji: '⛳', color: '#84cc16', sessions: golfSessions.length },
    { id: 'rugby-hub', name: 'Rugby', emoji: '🏉', color: '#f59e0b', sessions: rugbySessions.length },
    { id: 'cricket-hub', name: 'Cricket', emoji: '🏏', color: '#06b6d4', sessions: cricketSessions.length },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '50px 24px 24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>Track</h1>
          <p style={{ color: '#666', fontSize: '14px', margin: '6px 0 0' }}>Select a sport to log or track</p>
        </div>

        {/* Sport Cards */}
        <div style={{ padding: '0 24px 28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {sportCards.map((sport) => (
            <div key={sport.id} onClick={() => setActiveNav(sport.id)} style={{ background: '#13131f', border: `1px solid ${sport.color}25`, borderRadius: '20px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: `0 0 30px ${sport.color}10` }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: `radial-gradient(circle, ${sport.color}20 0%, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: `2.5px solid ${sport.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', background: '#0a0a0f', boxShadow: `0 0 16px ${sport.color}40`, flexShrink: 0 }}>{sport.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '18px' }}>{sport.name}</div>
                <div style={{ color: '#555', fontSize: '13px', marginTop: '3px' }}>{sport.sessions} sessions logged</div>
              </div>
              <div style={{ color: sport.color, fontSize: '24px', fontWeight: '300' }}>›</div>
            </div>
          ))}
        </div>

        {/* Recent Sessions */}
        <div style={{ padding: '0 24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>Recent Sessions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentSessions.map((session, i) => (
              <div key={i} style={{ background: '#13131f', borderRadius: '14px', borderLeft: `4px solid ${session.color}`, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>{session.sport} — {session.title}</div>
                  <div style={{ color: '#555', fontSize: '12px', marginTop: '3px' }}>{session.detail}</div>
                </div>
                <div style={{ color: '#444', fontSize: '12px', flexShrink: 0 }}>{session.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#0d0d1a', borderTop: '1px solid #1e1e30', display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px', zIndex: 100 }}>
        {[{ id: 'home', label: 'Home', emoji: '🏠' }, { id: 'sports', label: 'Sports', emoji: '🏅' }, { id: 'track', label: 'Track', emoji: '📈' }, { id: 'social', label: 'Social', emoji: '👥' }, { id: 'profile', label: 'Profile', emoji: '👤' }].map((item) => (
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNav === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
function AnalyticsDashboard({
  setActiveNav,
  footballSessions,
  gymSessions,
  tennisSessions,
  runningSessions,
  swimmingSessions,
  basketballSessions,
  boxingSessions,
  cyclingSessions,
  golfSessions,
  rugbySessions,
  cricketSessions
}: any) {
  const allSessions = [
    ...footballSessions.map((s: any) => ({ ...s, sport: 'Football', color: '#22c55e', emoji: '⚽', date: s.date || s.created_at?.split('T')[0] })),
    ...gymSessions.map((s: any) => ({ ...s, sport: 'Gym', color: '#a855f7', emoji: '🏋️', date: s.date || s.created_at?.split('T')[0] })),
    ...tennisSessions.map((s: any) => ({ ...s, sport: 'Tennis', color: '#eab308', emoji: '🎾', date: s.date || s.created_at?.split('T')[0] })),
    ...runningSessions.map((s: any) => ({ ...s, sport: 'Running', color: '#06b6d4', emoji: '🏃', date: s.date || s.created_at?.split('T')[0] })),
    ...swimmingSessions.map((s: any) => ({ ...s, sport: 'Swimming', color: '#3b82f6', emoji: '🏊', date: s.date || s.created_at?.split('T')[0] })),
    ...basketballSessions.map((s: any) => ({ ...s, sport: 'Basketball', color: '#f97316', emoji: '🏀', date: s.date || s.created_at?.split('T')[0] })),
    ...boxingSessions.map((s: any) => ({ ...s, sport: 'Boxing', color: '#ef4444', emoji: '🥊', date: s.date || s.created_at?.split('T')[0] })),
    ...cyclingSessions.map((s: any) => ({ ...s, sport: 'Cycling', color: '#10b981', emoji: '🚴', date: s.date || s.created_at?.split('T')[0] })),
    ...golfSessions.map((s: any) => ({ ...s, sport: 'Golf', color: '#84cc16', emoji: '⛳', date: s.date || s.created_at?.split('T')[0] })),
    ...rugbySessions.map((s: any) => ({ ...s, sport: 'Rugby', color: '#f59e0b', emoji: '🏉', date: s.date || s.created_at?.split('T')[0] })),
    ...cricketSessions.map((s: any) => ({ ...s, sport: 'Cricket', color: '#06b6d4', emoji: '🏏', date: s.date || s.created_at?.split('T')[0] })),
  ]

  const today = new Date()
  const weekAgo = new Date()
  weekAgo.setDate(today.getDate() - 7)

  const thisWeek = allSessions.filter((s: any) => s.date && new Date(s.date) >= weekAgo)

  const totalDistance =
    runningSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0) +
    cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0) +
    swimmingSessions.reduce((sum: number, s: any) => sum + ((s.distance || 0) / 1000), 0)

  const sportCounts = [
    { sport: 'Football', emoji: '⚽', color: '#22c55e', count: footballSessions.length },
    { sport: 'Gym', emoji: '🏋️', color: '#a855f7', count: gymSessions.length },
    { sport: 'Running', emoji: '🏃', color: '#06b6d4', count: runningSessions.length },
    { sport: 'Cycling', emoji: '🚴', color: '#10b981', count: cyclingSessions.length },
    { sport: 'Boxing', emoji: '🥊', color: '#ef4444', count: boxingSessions.length },
    { sport: 'Basketball', emoji: '🏀', color: '#f97316', count: basketballSessions.length },
    { sport: 'Tennis', emoji: '🎾', color: '#eab308', count: tennisSessions.length },
    { sport: 'Swimming', emoji: '🏊', color: '#3b82f6', count: swimmingSessions.length },
    { sport: 'Golf', emoji: '⛳', color: '#84cc16', count: golfSessions.length },
    { sport: 'Rugby', emoji: '🏉', color: '#f59e0b', count: rugbySessions.length },
    { sport: 'Cricket', emoji: '🏏', color: '#06b6d4', count: cricketSessions.length },
  ].filter(s => s.count > 0)

  const maxCount = Math.max(...sportCounts.map(s => s.count), 1)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', maxWidth: '430px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('home')} style={{ background: 'none', border: 'none', color: '#a855f7', fontWeight: '800', marginBottom: '18px' }}>
          ← Back
        </button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>Analytics</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your training overview across every sport</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '22px' }}>
          {[
            { label: 'Total Sessions', value: allSessions.length, emoji: '🔥', color: '#a855f7' },
            { label: 'This Week', value: thisWeek.length, emoji: '📅', color: '#06b6d4' },
            { label: 'Sports Used', value: sportCounts.length, emoji: '🏅', color: '#22c55e' },
            { label: 'Distance', value: `${totalDistance.toFixed(1)}km`, emoji: '📍', color: '#f97316' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '18px', padding: '16px' }}>
              <div style={{ fontSize: '24px' }}>{stat.emoji}</div>
              <div style={{ color: stat.color, fontSize: '24px', fontWeight: '900', marginTop: '8px' }}>{stat.value}</div>
              <div style={{ color: '#666', fontSize: '11px', fontWeight: '700', marginTop: '3px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px', padding: '18px', marginBottom: '22px' }}>
          <div style={{ fontSize: '16px', fontWeight: '900', marginBottom: '14px' }}>Sport Breakdown</div>

          {sportCounts.map((item) => (
            <div key={item.sport} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800' }}>{item.emoji} {item.sport}</span>
                <span style={{ color: item.color, fontSize: '12px', fontWeight: '900' }}>{item.count}</span>
              </div>
              <div style={{ height: '8px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${(item.count / maxCount) * 100}%`, height: '100%', background: item.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Training Calendar */}
        <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px', padding: '18px', marginBottom: '22px' }}>
          <div style={{ fontSize: '16px', fontWeight: '900', marginBottom: '16px' }}>📅 Training Calendar</div>
          {(() => {
            const now = new Date()
            const year = now.getFullYear()
            const month = now.getMonth()
            const firstDay = new Date(year, month, 1).getDay()
            const daysInMonth = new Date(year, month + 1, 0).getDate()
            
            const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
            
            const daySessions: Record<string, { sport: string, color: string }[]> = {}
            allSessions.forEach((s: any) => {
              const d = s.date
              if (!d) return
              if (!daySessions[d]) daySessions[d] = []
              daySessions[d].push({ sport: s.sport, color: s.color })
            })

            const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            
            return (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span style={{ color: '#a855f7', fontWeight: '800', fontSize: '14px' }}>
                    {now.toLocaleString('default', { month: 'long' })} {year}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                  {dayHeaders.map((d) => (
                    <div key={d} style={{ fontSize: '10px', color: '#555', fontWeight: '700', padding: '4px 0' }}>{d}</div>
                  ))}
                  {[...Array(adjustedFirstDay)].map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    const sessions = daySessions[dateStr]
                    const isToday = day === now.getDate()
                    
                    return (
                      <div key={day} style={{
                        aspectRatio: '1',
                        borderRadius: '8px',
                        background: sessions ? (sessions.length > 1 ? '#a855f730' : `${sessions[0].color}25`) : '#0a0a0f',
                        border: isToday ? '2px solid #a855f7' : sessions ? `1px solid ${sessions[0].color}40` : '1px solid transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: isToday ? '800' : '600',
                        color: sessions ? 'white' : '#333',
                        position: 'relative',
                      }}>
                        {day}
                        {sessions && sessions.length > 1 && (
                          <div style={{ position: 'absolute', bottom: '3px', display: 'flex', gap: '1px' }}>
                            {sessions.slice(0, 3).map((s, j) => (
                              <div key={j} style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.color }} />
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '14px', fontSize: '11px', color: '#666' }}>
                  <span>● Has session</span>
                  <span>○ No session</span>
                </div>
              </div>
            )
          })()}
        </div>
        
        <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px', padding: '18px' }}>
          <div style={{ fontSize: '16px', fontWeight: '900', marginBottom: '12px' }}>Smart Insight</div>
          <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.5' }}>
            {thisWeek.length === 0
              ? 'You have not logged any sessions this week yet. Start with one easy session to build momentum.'
              : thisWeek.length >= 5
                ? 'Strong week. You are training consistently across your sports.'
                : `You have logged ${thisWeek.length} session${thisWeek.length === 1 ? '' : 's'} this week. Try reaching 5 for a strong weekly target.`}
          </div>
        </div>
      </div>
    </div>
  )
}

function SessionDetailPage({ setActiveNav, session }: any) {
  if (!session) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', maxWidth: '430px', margin: '0 auto', padding: '50px 24px' }}>
        <button onClick={() => setActiveNav('recent-activity')} style={{ background: 'none', border: 'none', color: '#a855f7', fontWeight: '800', marginBottom: '20px' }}>
          ← Back
        </button>
        <h1>No session selected</h1>
      </div>
    )
  }

  const durationVal = session.duration || session.time
  const extraStats = [
    ['Duration', durationVal ? `${durationVal} mins` : null],
    ['Distance', session.distance ? `${session.distance}${session.sport === 'Swimming' ? 'm' : 'km'}` : null],
    ['Pace', session.pace || null],
    ['Speed', session.avgSpeed ? `${session.avgSpeed}km/h` : null],
    ['Elevation', session.elevation ? `${session.elevation}m` : null],
    ['Rounds', session.rounds ? `${session.rounds}` : null],
    ['Goals', session.goals ? `${session.goals}` : null],
    ['Assists', session.assists ? `${session.assists}` : null],
    ['Points', session.points ? `${session.points}` : null],
    ['Runs', session.runs ? `${session.runs}` : null],
    ['Wickets', session.wickets ? `${session.wickets}` : null],
    ['Score', session.score ? `${session.score}` : null],
    ['Effort', session.effort || session.intensity ? `${session.effort || session.intensity}/10` : null],
  ].filter((s) => s[1])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', maxWidth: '430px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('recent-activity')} style={{ background: 'none', border: 'none', color: session.color || '#a855f7', fontWeight: '800', marginBottom: '20px' }}>
          ← Back
        </button>

        <div style={{ background: '#13131f', border: `1px solid ${session.color}35`, borderLeft: `4px solid ${session.color}`, borderRadius: '22px', padding: '22px', marginBottom: '20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: `${session.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '18px' }}>
            {session.emoji}
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px' }}>{session.title}</h1>
          <div style={{ color: session.color, fontSize: '14px', fontWeight: '900', marginBottom: '8px' }}>{session.sport}</div>
          <div style={{ color: '#666', fontSize: '13px' }}>{session.date}</div>
        </div>

        {extraStats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {extraStats.map(([label, value]: any) => (
              <div key={label} style={{ background: '#13131f', border: `1px solid ${session.color}25`, borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                <div style={{ color: session.color, fontSize: '20px', fontWeight: '900' }}>{value}</div>
                <div style={{ color: '#666', fontSize: '11px', fontWeight: '700', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '18px', padding: '18px' }}>
          <div style={{ fontSize: '15px', fontWeight: '900', marginBottom: '8px' }}>Session Notes</div>
          <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.5' }}>
            {session.notes || session.detail || 'No notes added for this session.'}
          </div>
        </div>
      </div>
    </div>
  )
}

function RecentActivityPage({
  setActiveNav,
  setSelectedSession,
  footballSessions,
  tennisSessions,
  runningSessions,
  swimmingSessions,
  basketballSessions,
  boxingSessions,
  cyclingSessions,
  golfSessions,
  rugbySessions,
  cricketSessions
}: any) {
  const [sportFilter, setSportFilter] = useState('All')
  const activity = [
    ...footballSessions.map((s: any) => ({
      sport: 'Football', emoji: '⚽', color: '#22c55e',
      title: s.session_type || s.sessionType || 'Football Session',
      detail: `${s.duration || 0} mins · ${s.goals || 0} goals · ${s.assists || 0} assists`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'football-hub'
    })),
    ...tennisSessions.map((s: any) => ({
      sport: 'Tennis', emoji: '🎾', color: '#eab308',
      title: s.sessionType || 'Tennis Session',
      detail: `${s.duration || 0} mins · ${s.focus || 'General'}`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'tennis-hub'
    })),
    ...runningSessions.map((s: any) => ({
      sport: 'Running', emoji: '🏃', color: '#06b6d4',
      title: s.runType || 'Run',
      detail: `${s.distance || 0}km · ${s.time || s.duration || 0} mins · ${s.pace || ''}`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'running-hub'
    })),
    ...swimmingSessions.map((s: any) => ({
      sport: 'Swimming', emoji: '🏊', color: '#3b82f6',
      title: s.swimType || s.stroke || 'Swim',
      detail: `${s.distance || 0}m · ${s.time || s.duration || 0} mins · ${s.pace || ''}`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'swimming-hub'
    })),
    ...basketballSessions.map((s: any) => ({
      sport: 'Basketball', emoji: '🏀', color: '#f97316',
      title: s.sessionType || 'Basketball Session',
      detail: `${s.duration || 0} mins · ${s.focus || 'Training'}`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'basketball-hub'
    })),
    ...boxingSessions.map((s: any) => ({
      sport: 'Boxing', emoji: '🥊', color: '#ef4444',
      title: s.sessionType || 'Boxing Session',
      detail: `${s.duration || 0} mins · ${s.rounds || 0} rounds`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'boxing-hub'
    })),
    ...cyclingSessions.map((s: any) => ({
      sport: 'Cycling', emoji: '🚴', color: '#10b981',
      title: s.rideType || 'Ride',
      detail: `${s.distance || 0}km · ${s.duration || 0} mins · ${s.avgSpeed || 0}km/h`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'cycling-hub'
    })),
    ...golfSessions.map((s: any) => ({
      sport: 'Golf', emoji: '⛳', color: '#84cc16',
      title: s.session_type || 'Golf Session',
      detail: `${s.holes || 0} holes · score ${s.score || '-'}`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'golf-hub'
    })),
    ...rugbySessions.map((s: any) => ({
      sport: 'Rugby', emoji: '🏉', color: '#f59e0b',
      title: s.session_type || 'Rugby Session',
      detail: `${s.duration || 0} mins · ${s.tries || 0} tries`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'rugby-hub'
    })),
    ...cricketSessions.map((s: any) => ({
      sport: 'Cricket', emoji: '🏏', color: '#06b6d4',
      title: s.session_type || 'Cricket Session',
      detail: `${s.runs || 0} runs · ${s.wickets || 0} wickets`,
      date: s.date || s.created_at?.split('T')[0] || 'Recent',
      nav: 'cricket-hub'
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const sportFiltered = sportFilter === 'All' ? activity : activity.filter((item: any) => item.sport === sportFilter)
  const filteredActivity = noteSearch.trim() 
    ? sportFiltered.filter((item: any) => 
        (item.title || '').toLowerCase().includes(noteSearch.toLowerCase()) ||
        (item.detail || '').toLowerCase().includes(noteSearch.toLowerCase()) ||
        (item.sport || '').toLowerCase().includes(noteSearch.toLowerCase())
      )
    : sportFiltered
  const [noteSearch, setNoteSearch] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', maxWidth: '430px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('home')} style={{ background: 'none', border: 'none', color: '#a855f7', fontWeight: '800', marginBottom: '18px' }}>
          ← Back
        </button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>Recent Activity</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px' }}>All your latest logged sessions</p>
        
        <input
          value={noteSearch}
          onChange={(e) => setNoteSearch(e.target.value)}
          placeholder="Search sessions, notes, exercises..."
          style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '12px 14px', fontSize: '14px', marginBottom: '16px', boxSizing: 'border-box' }}
        />

        {/* Sport Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '8px' }}>
          {['All', 'Football', 'Gym', 'Running', 'Tennis', 'Swimming', 'Basketball', 'Boxing', 'Cycling', 'Golf', 'Rugby', 'Cricket'].map((sport) => {
            const colors: Record<string, string> = {
              All: '#a855f7', Football: '#22c55e', Gym: '#a855f7', Running: '#06b6d4', Tennis: '#eab308',
              Swimming: '#3b82f6', Basketball: '#f97316', Boxing: '#ef4444', Cycling: '#10b981',
              Golf: '#84cc16', Rugby: '#f59e0b', Cricket: '#06b6d4'
            }
            const color = colors[sport]
            const active = sportFilter === sport
            return (
              <button
                key={sport}
                onClick={() => setSportFilter(sport)}
                style={{
                  background: active ? `${color}20` : '#13131f',
                  border: `1.5px solid ${active ? color : '#1e1e30'}`,
                  borderRadius: '20px',
                  color: active ? color : '#666',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {sport}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredActivity.map((item: any, i: number) => (
            <div
              key={i}
              onClick={() => {
  setSelectedSession(item)
  setActiveNav('session-detail')
}}
              style={{
                background: '#13131f',
                border: `1px solid ${item.color}25`,
                borderLeft: `4px solid ${item.color}`,
                borderRadius: '18px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                {item.emoji}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '900', fontSize: '15px' }}>{item.sport}</div>
                <div style={{ color: '#aaa', fontSize: '13px', marginTop: '2px' }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>{item.detail}</div>
              </div>

              <div style={{ color: item.color, fontSize: '20px' }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SportsPage({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [activeNavLocal, setActiveNavLocal] = useState('sports')
  const [selectedSport, setSelectedSport] = useState('Football')
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const sportQueries: Record<string, string> = {
    Football: 'football soccer',
    Gym: 'gym fitness weightlifting',
    Tennis: 'tennis',
    Running: 'running marathon athletics',
    Swimming: 'swimming',
    Basketball: 'basketball NBA',
    Cycling: 'cycling tour de france',
Golf: 'golf PGA',
Boxing: 'boxing',
Rugby: 'rugby',
Cricket: 'cricket',
  }

  const fetchNews = async (sport: string) => {
    setLoading(true)
    setArticles([])
    try {
      const query = sportQueries[sport]
      const res = await fetch(
        `https://qzmcrjsgitpmntddttfk.supabase.co/functions/v1/fetch-news?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Authorization': 'Bearer sb_publishable_hY5Qxqx6sqFntkDTkr_OoA_HYwe_mDc'
          }
        }
      )
      const data = await res.json()
      setArticles(data.articles?.filter((a: any) => a.title && a.image) || [])
    } catch (e) {
      setArticles([])
    }
    setLoading(false)
  }

  useEffect(() => { fetchNews(selectedSport) }, [])

  const handleSportSelect = (sport: string) => {
    setSelectedSport(sport)
    fetchNews(sport)
  }

  const handleMediaSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    
    const q = query.toLowerCase()
    
    // Search for posts with matching sport or caption
    const { data: posts } = await supabase.from('posts')
      .select('*')
      .or(`sport.ilike.%${q}%,caption.ilike.%${q}%`)
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (posts) {
      setSearchResults(posts.filter((p: any) => p.video_url || p.image_url))
    }
  }
  
  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
    if (diff < 60) return `${diff}m ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return `${Math.floor(diff / 1440)}d ago`
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '50px 24px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 4px' }}>Sports News</h1>
            
          </div>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Latest clips and highlights</p>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Latest from your sports</p>
        </div>

        {/* Sport Selector */}
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
            {sports.map((sport) => (
              <div key={sport.name} onClick={() => sport.available && handleSportSelect(sport.name)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                cursor: sport.available ? 'pointer' : 'default',
                opacity: sport.available ? 1 : 0.4,
                minWidth: '70px',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  border: `2.5px solid ${sport.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px',
                  background: selectedSport === sport.name ? `${sport.color}25` : '#13131f',
                  boxShadow: selectedSport === sport.name ? `0 0 20px ${sport.color}60` : sport.available ? `0 0 12px ${sport.color}30` : 'none',
                  transition: 'all 0.2s',
                }}>
                  {sport.emoji}
                </div>
                <span style={{ fontSize: '11px', color: selectedSport === sport.name ? 'white' : '#aaa', fontWeight: '600' }}>{sport.name}</span>
              </div>
            ))}
          </div>
        </div>

        
        
        {/* News Feed */}
        <div style={{ padding: '0 24px' }}>
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[1,2,3].map((i) => (
                <div key={i} style={{ background: '#13131f', borderRadius: '16px', height: '200px', opacity: 0.5, animation: 'pulse 1.5s infinite' }} />
              ))}
            </div>
          )}

          {!loading && articles.length === 0 && (
            <p style={{ color: '#444', textAlign: 'center', marginTop: '40px' }}>No articles found</p>
          )}

          {!loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {articles.map((article, i) => (
                <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
                  {article.image && (
  <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
    <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => e.target.style.display = 'none'} />
  </div>
                    )}
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', color: sports.find(s => s.name === selectedSport)?.color || '#a855f7', fontWeight: '700', background: `${sports.find(s => s.name === selectedSport)?.color}20`, padding: '3px 8px', borderRadius: '20px' }}>{selectedSport}</span>
                        <span style={{ fontSize: '11px', color: '#555' }}>{article.source?.name}</span>
                        <span style={{ fontSize: '11px', color: '#555', marginLeft: 'auto' }}>{timeAgo(article.publishedAt)}</span>
                      </div>
                      <div style={{ fontWeight: '700', fontSize: '14px', lineHeight: '1.4', color: 'white' }}>{article.title}</div>
                      {article.description && (
                        <div style={{ color: '#666', fontSize: '12px', marginTop: '6px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.description}</div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#0d0d1a', borderTop: '1px solid #1e1e30', display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px', zIndex: 100 }}>
        {[{ id: 'home', label: 'Home', emoji: '🏠' }, { id: 'sports', label: 'Sports', emoji: '🏅' }, { id: 'track', label: 'Track', emoji: '📈' }, { id: 'social', label: 'Social', emoji: '👥' }, { id: 'profile', label: 'Profile', emoji: '👤' }].map((item) => (
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} onTouchStart={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNavLocal === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
function QuickRunForm({ onSave, setRunningSessions, runningSessions, addSocialPost, triggerPRToast, setRunningPRs, runningPRs }: any) {
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [saved, setSaved] = useState(false)

  const calculatePace = () => {
    const d = parseFloat(distance)
    const t = parseFloat(time)
    if (!d || !t) return '0:00'
    const pace = t / d
    const mins = Math.floor(pace)
    const secs = Math.round((pace - mins) * 60)
    return `${mins}:${secs.toString().padStart(2, '0')}/km`
  }

  const handleSave = () => {
    const d = parseFloat(distance) || 0
    const t = parseFloat(time) || 0
    const pace = calculatePace()
    const newRun = { id: Date.now(), runType: 'Quick Run', distance: d, time: t, pace, effort: 'Moderate', surface: '', notes: '', date: new Date().toISOString().split('T')[0] }
    
    setRunningSessions([newRun, ...runningSessions])
    if (addSocialPost) addSocialPost({ sport: 'Running', sportColor: '#06b6d4', emoji: '🏃', caption: `Quick run: ${d}km in ${t} mins at ${pace}.` })
    
    const newPRs = [...runningPRs]
    const checkPR = (label: string, target: number) => {
      if (d >= target) {
        const existing = newPRs.find((pr: any) => pr.label === label)
        if (!existing || t < existing.time) {
          if (existing) { existing.time = t; existing.pace = pace; existing.date = 'Today' }
          else { newPRs.push({ label, distance: target, time: t, pace, date: 'Today' }) }
          if (triggerPRToast) triggerPRToast(`🏆 New ${label} PR!`, `${t} mins at ${pace}`, '🏃', '#06b6d4')
        }
      }
    }
    checkPR('1K', 1); checkPR('5K', 5); checkPR('10K', 10)
    setRunningPRs(newPRs)
    
    setSaved(true)
    setTimeout(() => { setSaved(false); onSave() }, 1500)
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Distance (km)</label>
          <input value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="5" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Time (mins)</label>
          <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="25" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
        </div>
      </div>
      {distance && time && (
        <div style={{ background: '#0a0a0f', border: '1px solid #06b6d425', borderLeft: '3px solid #06b6d4', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px' }}>
          <span style={{ color: '#06b6d4', fontSize: '18px', fontWeight: '900' }}>{calculatePace()}</span>
          <span style={{ color: '#666', fontSize: '12px', marginLeft: '6px' }}>per km</span>
        </div>
      )}
      <button onClick={handleSave} disabled={!distance || !time} style={{ width: '100%', background: (!distance || !time) ? '#1e1e30' : saved ? '#16a34a' : 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: (!distance || !time) ? 'default' : 'pointer' }}>
        {saved ? '✓ Run Saved!' : 'Save Quick Run'}
      </button>
    </div>
  )
}

function QuickGymForm({ onSave, setGymSessions, gymSessions, addSocialPost, triggerPRToast }: any) {
  const [exercise, setExercise] = useState('')
  const [weight, setWeight] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!exercise.trim()) return
    const newWorkout = { id: Date.now(), title: 'Quick Workout', date: new Date().toISOString().split('T')[0], duration: 30, exercises: [{ name: exercise, sets: '3', reps: '8', weight }], notes: '', rpe: 7 }
    setGymSessions([newWorkout, ...(gymSessions || [])])
    if (addSocialPost) addSocialPost({ sport: 'Gym', sportColor: '#a855f7', emoji: '🏋️', caption: `Quick workout: ${exercise} ${weight}kg` })
    if (triggerPRToast && weight && parseFloat(weight) > 0) {
      const previousPRs: Record<string, number> = {}
      ;(gymSessions || []).forEach((s: any) => { ;(s.exercises || []).forEach((ex: any) => { if (ex.name && ex.weight && (!previousPRs[ex.name] || parseFloat(ex.weight) > previousPRs[ex.name])) { previousPRs[ex.name] = parseFloat(ex.weight) } }) })
      if (!previousPRs[exercise] || parseFloat(weight) > previousPRs[exercise]) { triggerPRToast('🏆 New Gym PR!', `${exercise}: ${weight}kg`, '🏋️', '#a855f7') }
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); onSave() }, 1500)
  }

  return (
    <div>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Exercise</label>
        <input value={exercise} onChange={(e) => setExercise(e.target.value)} placeholder="e.g. Bench Press" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Weight (kg)</label>
        <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="60" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
      </div>
      <button onClick={handleSave} disabled={!exercise.trim()} style={{ width: '100%', background: !exercise.trim() ? '#1e1e30' : saved ? '#16a34a' : 'linear-gradient(135deg, #a855f7, #7c3aed)', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: !exercise.trim() ? 'default' : 'pointer' }}>
        {saved ? '✓ Workout Saved!' : 'Save Quick Workout'}
      </button>
    </div>
  )
}

function QuickSwimForm({ onSave, setSwimmingSessions, swimmingSessions, addSocialPost, triggerPRToast, setSwimmingPRs, swimmingPRs }: any) {
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [saved, setSaved] = useState(false)

  const calculatePace = () => {
    const d = parseFloat(distance)
    const t = parseFloat(time)
    if (!d || !t) return '0:00/100m'
    const pace = t / (d / 100)
    const mins = Math.floor(pace)
    const secs = Math.round((pace - mins) * 60)
    return `${mins}:${secs.toString().padStart(2, '0')}/100m`
  }

  const handleSave = () => {
    const d = parseFloat(distance) || 0
    const t = parseFloat(time) || 0
    const pace = calculatePace()
    const newSwim = { id: Date.now(), swimType: 'Quick Swim', stroke: 'Freestyle', poolLength: 25, distance: d, time: t, pace, lengths: Math.round(d / 25), effort: 'Moderate', notes: '', date: new Date().toISOString().split('T')[0] }
    
    setSwimmingSessions([newSwim, ...swimmingSessions])
    if (addSocialPost) addSocialPost({ sport: 'Swimming', sportColor: '#3b82f6', emoji: '🏊', caption: `Quick swim: ${d}m in ${t} mins at ${pace}.` })
    
    const newPRs = [...swimmingPRs]
    const checkPR = (label: string, target: number) => {
      if (d >= target) {
        const existing = newPRs.find((pr: any) => pr.label === label)
        if (!existing || t < existing.time) {
          if (existing) { existing.time = t; existing.pace = pace; existing.date = 'Today' }
          else { newPRs.push({ label, distance: target, time: t, pace, date: 'Today' }) }
          if (triggerPRToast) triggerPRToast(`🏆 New ${label} PR!`, `${t} mins at ${pace}`, '🏊', '#3b82f6')
        }
      }
    }
    checkPR('100m', 100); checkPR('400m', 400); checkPR('1500m', 1500)
    setSwimmingPRs(newPRs)
    
    setSaved(true)
    setTimeout(() => { setSaved(false); onSave() }, 1500)
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Distance (m)</label>
          <input value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="1000" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Time (mins)</label>
          <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="25" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
        </div>
      </div>
      {distance && time && (
        <div style={{ background: '#0a0a0f', border: '1px solid #3b82f625', borderLeft: '3px solid #3b82f6', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px' }}>
          <span style={{ color: '#3b82f6', fontSize: '18px', fontWeight: '900' }}>{calculatePace()}</span>
          <span style={{ color: '#666', fontSize: '12px', marginLeft: '6px' }}>per 100m</span>
        </div>
      )}
      <button onClick={handleSave} disabled={!distance || !time} style={{ width: '100%', background: (!distance || !time) ? '#1e1e30' : saved ? '#16a34a' : 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: (!distance || !time) ? 'default' : 'pointer' }}>
        {saved ? '✓ Swim Saved!' : 'Save Quick Swim'}
      </button>
    </div>
  )
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('home')

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = confettiKeyframes
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])
  const [weeklyGoalTarget, setWeeklyGoalTarget] = useState(() => {
    if (typeof window === 'undefined') return 5
    return parseInt(localStorage.getItem('weeklyGoalTarget') || '5')
  })
  const [showGoalSetter, setShowGoalSetter] = useState(false)
  
  const [showSportGoalSetter, setShowSportGoalSetter] = useState(false)
  const [activePrograms, setActivePrograms] = useState<any[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('activePrograms')
    return saved ? JSON.parse(saved) : []
  })
  const [programProgress, setProgramProgress] = useState<Record<string, Record<string, boolean>>>(() => {
    if (typeof window === 'undefined') return {}
    const saved = localStorage.getItem('programProgress')
    return saved ? JSON.parse(saved) : {}
  })
  const [selectedProgramDetail, setSelectedProgramDetail] = useState<any>(null)
  const [showProgramModal, setShowProgramModal] = useState(false)
  const [showProgramDetail, setShowProgramDetail] = useState(false)
  const [challenges, setChallenges] = useState<any[]>([])
const [challengeLeaderboard, setChallengeLeaderboard] = useState<Record<string, any[]>>({})
  const [showChallengeModal, setShowChallengeModal] = useState(false)
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('dismissedNotifications')
    return saved ? JSON.parse(saved) : []
  })
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null)
  const [showCreateChallenge, setShowCreateChallenge] = useState(false)
  const [newChallenge, setNewChallenge] = useState({ title: '', sport: 'Running', metric: 'km', target: '', emoji: '🏃', color: '#06b6d4' })
  const [userChallengeProgress, setUserChallengeProgress] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {}
    const saved = localStorage.getItem('challengeProgress')
    return saved ? JSON.parse(saved) : {}
  })
const [sportGoals, setSportGoals] = useState<Record<string, number>>(() => {
  if (typeof window === 'undefined') return {}
  const saved = localStorage.getItem('sportGoals')
  return saved ? JSON.parse(saved) : {}
})
const [goalSport, setGoalSport] = useState('Running')
const [goalTarget, setGoalTarget] = useState('10')
const [goalMetric, setGoalMetric] = useState('km')
  const [showQuickLog, setShowQuickLog] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('onboardingComplete') !== 'true'
  })
  const [showAICoach, setShowAICoach] = useState(false)
const [coachMessages, setCoachMessages] = useState<any[]>(() => {
  if (typeof window === 'undefined') return [{ role: 'assistant', content: 'Hey! I\'m your AI coach. Ask me anything about your training — what should I do today, am I overtraining, how can I improve my 5K time?' }]
  const saved = localStorage.getItem('coachMessages')
  return saved ? JSON.parse(saved) : [{ role: 'assistant', content: 'Hey! I\'m your AI coach. Ask me anything about your training — what should I do today, am I overtraining, how can I improve my 5K time?' }]
})
const [coachInput, setCoachInput] = useState('')
const [coachLoading, setCoachLoading] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('soundEnabled') !== 'false' : true)
const [hapticEnabled, setHapticEnabled] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('hapticEnabled') !== 'false' : true)
  const [dashboardLayout, setDashboardLayout] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['notifications', 'stats', 'streak', 'challenges', 'goals', 'programs', 'recap', 'weekly', 'workouts']
    const saved = localStorage.getItem('dashboardLayout')
    return saved ? JSON.parse(saved) : ['notifications', 'stats', 'streak', 'challenges', 'goals', 'programs', 'recap', 'weekly', 'workouts']
  })
  const [hiddenWidgets, setHiddenWidgets] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('hiddenWidgets')
    return saved ? JSON.parse(saved) : []
  })
  const [showCustomize, setShowCustomize] = useState(false)
  const [showAchievement, setShowAchievement] = useState<any>(null)
  const [timerRunning, setTimerRunning] = useState(false)
const [timerSeconds, setTimerSeconds] = useState(0)
const [timerIntervalId, setTimerIntervalId] = useState<any>(null)
const [showTimer, setShowTimer] = useState(false)
  const [streakFreezes, setStreakFreezes] = useState(() => {
    if (typeof window === 'undefined') return 0
    return parseInt(localStorage.getItem('streakFreezes') || '0')
  })
  const [freezeUsedThisWeek, setFreezeUsedThisWeek] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('freezeUsedThisWeek') === 'true'
  })
  const [showStreakFreeze, setShowStreakFreeze] = useState(false)
  const [showRecap, setShowRecap] = useState(false)
const [recapType, setRecapType] = useState<'monthly' | 'yearly'>('monthly')
  const [isListening, setIsListening] = useState(false)
const [voiceText, setVoiceText] = useState('')
  const [sessionComparison, setSessionComparison] = useState<any>(null)
const [showComparison, setShowComparison] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [onboardingSports, setOnboardingSports] = useState<string[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('onboardingSports')
  return saved ? JSON.parse(saved) : []
})
  const [onboardingGoal, setOnboardingGoal] = useState('5')
  const [lightMode, setLightMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('lightMode') === 'true'
  })
  const [showSearch, setShowSearch] = useState(false)
const [searchQuery, setSearchQuery] = useState('')
const [searchResults, setSearchResults] = useState<any[]>([])
  const [aiReport, setAiReport] = useState('')
const [aiReportLoading, setAiReportLoading] = useState(false)
const [quickLogSport, setQuickLogSport] = useState('')
const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
const [displayName, setDisplayName] = useState(() => {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('displayName') || ''
})
  const [showConfetti, setShowConfetti] = useState(false)
  const [prToast, setPrToast] = useState<{ title: string, detail: string, emoji: string, color: string } | null>(null)
const [unreadLikes, setUnreadLikes] = useState(0)

useEffect(() => {
  const checkUnreadLikes = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { data: myPosts } = await supabase.from('posts').select('likes').eq('user_id', session.user.id)
    if (!myPosts) return

    const totalLikes = myPosts.reduce((sum: number, p: any) => sum + (p.likes || 0), 0)
    const lastSeenLikes = parseInt(localStorage.getItem('lastSeenLikes') || '0')

    setUnreadLikes(Math.max(0, totalLikes - lastSeenLikes))
  }
  checkUnreadLikes()
  const interval = setInterval(checkUnreadLikes, 15000)
  return () => clearInterval(interval)
}, [])

const generateWeeklyReport = async () => {
  setAiReportLoading(true)
  setAiReport('')

  // Collect all data
  const weekStart = getWeekStart()
  const thisWeekRuns = runningSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekCycles = cyclingSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekSwims = swimmingSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekGym = gymSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekFootball = footballSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekTennis = tennisSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekBasketball = basketballSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekBoxing = boxingSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekGolf = golfSessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekRugby = rugbySessions.filter((s: any) => (s.date || '') >= weekStart)
  const thisWeekCricket = cricketSessions.filter((s: any) => (s.date || '') >= weekStart)

  const totalRunDist = thisWeekRuns.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
  const totalRunTime = thisWeekRuns.reduce((sum: number, s: any) => sum + (s.time || 0), 0)
  const bestRunPace = thisWeekRuns.length > 0 ? thisWeekRuns.reduce((best: any, s: any) => {
    if (!s.pace || s.pace === '0:00/km') return best
    const toSecs = (p: string) => { const parts = p.replace('/km','').split(':'); return parseInt(parts[0])*60+parseInt(parts[1]||'0') }
    return !best || toSecs(s.pace) < toSecs(best.pace) ? s : best
  }, null) : null

  const totalCycleDist = thisWeekCycles.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
  const totalCycleElev = thisWeekCycles.reduce((sum: number, s: any) => sum + (s.elevation || 0), 0)
  const bestCycleSpeed = thisWeekCycles.length > 0 ? Math.max(...thisWeekCycles.map((s: any) => s.avgSpeed || 0)) : 0

  const totalSwimDist = thisWeekSwims.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
  const totalSwimTime = thisWeekSwims.reduce((sum: number, s: any) => sum + (s.time || 0), 0)

  const gymExercises: string[] = []
  const gymPRs: string[] = []
  thisWeekGym.forEach((s: any) => {
    ;(s.exercises || []).forEach((ex: any) => {
      if (ex.name) gymExercises.push(`${ex.name} (${ex.sets || 0}x${ex.reps || 0} @ ${ex.weight || 0}kg)`)
    })
  })

  const totalFootballGoals = thisWeekFootball.reduce((sum: number, s: any) => sum + (s.goals || 0), 0)
  const totalFootballAssists = thisWeekFootball.reduce((sum: number, s: any) => sum + (s.assists || 0), 0)
  const footballMatches = thisWeekFootball.filter((s: any) => s.sessionType === 'Match' || s.session_type === 'Match')

  const totalTennisSessions = thisWeekTennis.length
  const totalBasketballPts = thisWeekBasketball.reduce((sum: number, s: any) => sum + (s.points || 0), 0)
  const totalBoxingRounds = thisWeekBoxing.reduce((sum: number, s: any) => sum + (s.rounds || 0), 0)
  const golfRounds = thisWeekGolf.filter((s: any) => s.session_type === 'Round')
  const rugbyTries = thisWeekRugby.reduce((sum: number, s: any) => sum + (s.tries || 0), 0)
  const cricketRuns = thisWeekCricket.reduce((sum: number, s: any) => sum + (s.runs || 0), 0)

  const totalWeekSessions = thisWeekRuns.length + thisWeekCycles.length + thisWeekSwims.length + thisWeekGym.length + thisWeekFootball.length + thisWeekTennis.length + thisWeekBasketball.length + thisWeekBoxing.length + thisWeekGolf.length + thisWeekRugby.length + thisWeekCricket.length

  const sportCount = [thisWeekRuns, thisWeekCycles, thisWeekSwims, thisWeekGym, thisWeekFootball, thisWeekTennis, thisWeekBasketball, thisWeekBoxing, thisWeekGolf, thisWeekRugby, thisWeekCricket].filter(a => a.length > 0).length

  const prevWeekStart = new Date(weekStart)
  prevWeekStart.setDate(prevWeekStart.getDate() - 7)
  const prevWeekStr = prevWeekStart.toISOString().split('T')[0]
  const prevWeekSessions = [...runningSessions, ...cyclingSessions, ...swimmingSessions, ...gymSessions, ...footballSessions, ...tennisSessions, ...basketballSessions, ...boxingSessions, ...golfSessions, ...rugbySessions, ...cricketSessions].filter((s: any) => {
    const d = s.date || s.created_at?.split('T')[0]
    return d && d >= prevWeekStr && d < weekStart
  }).length

  const weekTrend = prevWeekSessions > 0 ? Math.round(((totalWeekSessions - prevWeekSessions) / prevWeekSessions) * 100) : 0

  const prompt = `You are an elite multi-sport performance coach and data analyst. Write a comprehensive, detailed, personalised weekly training report for an athlete. Be direct, specific, and insightful. Use the data to highlight achievements, identify patterns, flag concerns, and give actionable recommendations.

ATHLETE DATA — THIS WEEK:

TRAINING OVERVIEW:
- Total sessions: ${totalWeekSessions} across ${sportCount} sports
- Compared to last week: ${weekTrend >= 0 ? '+' : ''}${weekTrend}% ${weekTrend > 0 ? 'increase' : weekTrend < 0 ? 'decrease' : 'same as last week'}

RUNNING:
- Sessions: ${thisWeekRuns.length}
- Total distance: ${totalRunDist.toFixed(1)}km
- Total time: ${totalRunTime} mins
- Best pace: ${bestRunPace ? bestRunPace.pace : 'N/A'}
${thisWeekRuns.map((s: any) => `  · ${s.runType || 'Run'}: ${s.distance || 0}km in ${s.time || 0} mins, pace ${s.pace || 'N/A'}, effort: ${s.effort || 'N/A'}, surface: ${s.surface || 'N/A'}`).join('\n')}

CYCLING:
- Sessions: ${thisWeekCycles.length}
- Total distance: ${totalCycleDist.toFixed(1)}km
- Total elevation: ${totalCycleElev}m
- Best speed: ${bestCycleSpeed}km/h
${thisWeekCycles.map((s: any) => `  · ${s.rideType || 'Ride'}: ${s.distance || 0}km, ${s.duration || 0} mins, ${s.avgSpeed || 0}km/h, ${s.elevation || 0}m elevation`).join('\n')}

SWIMMING:
- Sessions: ${thisWeekSwims.length}
- Total distance: ${totalSwimDist}m
- Total time: ${totalSwimTime} mins
${thisWeekSwims.map((s: any) => `  · ${s.swimType || 'Swim'}: ${s.distance || 0}m in ${s.time || 0} mins, stroke: ${s.stroke || 'N/A'}, pace: ${s.pace || 'N/A'}`).join('\n')}

GYM:
- Sessions: ${thisWeekGym.length}
- Exercises performed: ${gymExercises.length > 0 ? gymExercises.join(', ') : 'None'}
${thisWeekGym.map((s: any) => `  · ${s.title || 'Workout'}: ${s.duration || 0} mins, RPE: ${s.rpe || 'N/A'}/10`).join('\n')}

FOOTBALL:
- Sessions: ${thisWeekFootball.length}
- Goals: ${totalFootballGoals}
- Assists: ${totalFootballAssists}
- Matches played: ${footballMatches.length}
${thisWeekFootball.map((s: any) => `  · ${s.sessionType || s.session_type || 'Session'}: ${s.duration || 0} mins${s.opponent ? ' vs ' + s.opponent : ''}${s.result ? ', result: ' + s.result : ''}, goals: ${s.goals || 0}, assists: ${s.assists || 0}, rating: ${s.rating || 'N/A'}/10`).join('\n')}

OTHER SPORTS:
- Tennis: ${totalTennisSessions} sessions
- Basketball: ${thisWeekBasketball.length} sessions, ${totalBasketballPts} points
- Boxing: ${thisWeekBoxing.length} sessions, ${totalBoxingRounds} rounds
- Golf: ${golfRounds.length} rounds${golfRounds.length > 0 ? ', best score: ' + Math.min(...golfRounds.map((s: any) => s.score || 999)) : ''}
- Rugby: ${thisWeekRugby.length} sessions, ${rugbyTries} tries
- Cricket: ${thisWeekCricket.length} sessions, ${cricketRuns} runs

INSTRUCTIONS:
Write a detailed 4-5 paragraph report covering:

1. OVERALL ASSESSMENT (2-3 sentences): Summarise the week. Is volume up or down? Are they spreading across too many sports or well-balanced? Acknowledge total sessions and sports played.

2. STRENGTHS & HIGHLIGHTS (3-4 sentences): What stood out? Fastest pace, heaviest lifts, most goals, longest ride, most consistent sport. Give specific praise with numbers. If they set any obvious PRs, call them out.

3. AREAS FOR IMPROVEMENT (3-4 sentences): What's missing? Are they neglecting certain sports? Is there a pattern of hard efforts without recovery? Low volume in a sport they usually do? Be honest but constructive. If training load is very high, flag recovery concerns.

4. TRAINING BALANCE ANALYSIS (2-3 sentences): Look at the mix of cardio (running, cycling, swimming) vs strength (gym) vs skill sports (football, tennis, basketball, boxing, golf, rugby, cricket). Is there a good balance or is it skewed?

5. RECOMMENDATIONS FOR NEXT WEEK (3-4 sentences): Give 2-3 specific, actionable suggestions. What should they do more of? Less of? Try something new? Adjust intensity? Include a suggested session or target.

Tone: Direct, professional, motivating. Like a coach who cares about performance. Don't be generic — reference their actual numbers. End with a motivational push.`

try {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-or-v1-8cf...0b4',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    setAiReport(`Error ${response.status}: ${errorText}`)
    setAiReportLoading(false)
    return
  }
  
  const data = await response.json()
  const text = data.choices?.[0]?.message?.content || 'Could not generate report.'
  setAiReport(text)
} catch (e: any) {
  setAiReport(`Error: ${e?.message || 'Unknown'}`)
}
setAiReportLoading(false)
}

const checkAchievement = (type: string, value: any) => {
  let achievement = null
  
  if (type === 'running' && runningSessions.length === 1 && runningSessions[0]?.distance >= 5) {
    achievement = { title: 'First 5K!', emoji: '🏃', color: '#06b6d4', detail: `Ran ${value}km in their first session!`, metric: 'distance', value: `${value}km` }
  } else if (type === 'running' && value >= 10) {
    achievement = { title: 'Double Digits!', emoji: '🏃', color: '#06b6d4', detail: `Just crushed a ${value}km run!`, metric: 'Longest Run', value: `${value}km` }
  } else if (type === 'gym' && value >= 100) {
    achievement = { title: 'Century Lift!', emoji: '🏋️', color: '#a855f7', detail: `Hit ${value}kg — triple figures!`, metric: 'PR Weight', value: `${value}kg` }
  } else if (type === 'swimming' && value >= 1000) {
    achievement = { title: 'Kilometre Swim!', emoji: '🏊', color: '#3b82f6', detail: `Swam ${value}m in one session!`, metric: 'Distance', value: `${value}m` }
  } else if (type === 'cycling' && value >= 50) {
    achievement = { title: 'Half Century Ride!', emoji: '🚴', color: '#10b981', detail: `Rode ${value}km — epic effort!`, metric: 'Distance', value: `${value}km` }
  } else if (type === 'football' && value >= 3) {
    achievement = { title: 'Hat-trick Hero!', emoji: '⚽', color: '#22c55e', detail: `Scored ${value} goals in one match!`, metric: 'Goals', value: `${value}` }
  } else if (type === 'streak' && value >= 7) {
    achievement = { title: '7 Day Streak!', emoji: '🔥', color: '#ef4444', detail: `Trained every day for a full week!`, metric: 'Streak', value: `${value} days` }
  } else if (type === 'sessions' && value >= 100) {
    achievement = { title: 'Century Club!', emoji: '💯', color: '#a855f7', detail: `Logged 100 total sessions!`, metric: 'Total', value: `${value} sessions` }
  }
  
  if (achievement) {
    playHaptic()
    playSound('achievement')
    setShowAchievement(achievement)
  }
}

const triggerPRToast = (title: string, detail: string, emoji: string, color: string) => {
  setShowConfetti(true)
  setPrToast({ title, detail, emoji, color })
  setTimeout(() => {
    setShowConfetti(false)
    setPrToast(null)
  }, 3500)
}
  useEffect(() => {
    localStorage.setItem('weeklyGoalTarget', weeklyGoalTarget.toString())
  }, [weeklyGoalTarget])
const [activeSport, setActiveSport] = useState<string | null>(null);
const [selectedBasketballCategory, setSelectedBasketballCategory] = useState('')
const [selectedBoxingCategory, setSelectedBoxingCategory] = useState('')
const [selectedCyclingCategory, setSelectedCyclingCategory] = useState('')
const [selectedSession, setSelectedSession] = useState<any>(null)
const [user, setUser] = useState<any>(null)
const [authLoading, setAuthLoading] = useState(true)
const [footballSessions, setFootballSessions] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('footballSessions')
  return saved ? JSON.parse(saved) : []
})
const [gymSessions, setGymSessions] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('gymSessions')
  return saved ? JSON.parse(saved) : []
})
const [workoutLogs, setWorkoutLogs] = useState<any[]>([])
const [tennisSessions, setTennisSessions] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('tennisSessions')
  return saved ? JSON.parse(saved) : []
})

const [tennisResults, setTennisResults] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('tennisResults')
  return saved ? JSON.parse(saved) : []
})
const [runningSessions, setRunningSessions] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('runningSessions')
  return saved ? JSON.parse(saved) : []
})

const [runningPRs, setRunningPRs] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('runningPRs')
  return saved ? JSON.parse(saved) : []
})
const [swimmingSessions, setSwimmingSessions] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('swimmingSessions')
  return saved ? JSON.parse(saved) : []
})
const [basketballSessions, setBasketballSessions] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('basketballSessions')
  return saved ? JSON.parse(saved) : []
})

useEffect(() => {
  localStorage.setItem('basketballSessions', JSON.stringify(basketballSessions))
}, [basketballSessions])
const [boxingSessions, setBoxingSessions] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('boxingSessions')
  return saved ? JSON.parse(saved) : []
})
const [cyclingSessions, setCyclingSessions] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('cyclingSessions')
  return saved ? JSON.parse(saved) : []
})
const [golfSessions, setGolfSessions] = useState<any[]>([])
const [rugbySessions, setRugbySessions] = useState<any[]>([])
const [cricketSessions, setCricketSessions] = useState<any[]>([])

const loadChallenges = async () => {
    const { data } = await supabase.from('challenges').select('*').order('created_at', { ascending: false })
    if (data) {
      setChallenges(data)
      data.forEach((c: any) => loadLeaderboard(c.id))
    }
  }

  const loadLeaderboard = async (challengeId: number) => {
    const { data } = await supabase.from('challenge_participants').select('*').eq('challenge_id', challengeId).order('progress', { ascending: false })
    if (data) {
      setChallengeLeaderboard(prev => ({ ...prev, [challengeId]: data }))
    }
  }

  const joinChallenge = async (challengeId: number) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    
    const currentProgress = userChallengeProgress[challengeId.toString()] || 0
    await supabase.from('challenge_participants').upsert({
      challenge_id: challengeId,
      user_id: session.user.id,
      username: displayName || 'Athlete',
      progress: currentProgress
    }, { onConflict: 'challenge_id,user_id' })
    
    loadLeaderboard(challengeId)
  }

  const leaveChallenge = async (challengeId: number) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    
    await supabase.from('challenge_participants').delete().eq('challenge_id', challengeId).eq('user_id', session.user.id)
    loadLeaderboard(challengeId)
  }

  const updateChallengeProgress = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    
    for (const challenge of challenges) {
      const progress = userChallengeProgress[challenge.id.toString()] || 0
      await supabase.from('challenge_participants').update({ progress, username: displayName || 'Athlete' }).eq('challenge_id', challenge.id).eq('user_id', session.user.id)
    }
    
    challenges.forEach((c: any) => loadLeaderboard(c.id))
  }

  useEffect(() => {
  const loadSessions = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const uid = session.user.id

    const [golf, rugby, cricket, basketball, boxing, cycling, football] = await Promise.all([
      supabase.from('golf_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('rugby_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('cricket_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('basketball_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('boxing_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('cycling_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('football_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
    ])

    if (golf.data) setGolfSessions(golf.data)
    if (rugby.data) setRugbySessions(rugby.data)
    if (cricket.data) setCricketSessions(cricket.data)
    if (basketball.data) setBasketballSessions(basketball.data)
    if (boxing.data) setBoxingSessions(boxing.data.map((s: any) => ({
      ...s,
      sessionType: s.session_type,
      punchesLanded: s.punches_landed,
    })))
    if (cycling.data) setCyclingSessions(cycling.data.map((s: any) => ({
      ...s,
      rideType: s.ride_type,
      avgSpeed: s.avg_speed,
    })))
    if (football.data) setFootballSessions(football.data)
  }
  loadSessions()
}, [user])
loadChallenges()

useEffect(() => {
  localStorage.setItem('cyclingSessions', JSON.stringify(cyclingSessions))
}, [cyclingSessions])

useEffect(() => {
  localStorage.setItem('boxingSessions', JSON.stringify(boxingSessions))
}, [boxingSessions])

const [swimmingPRs, setSwimmingPRs] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('swimmingPRs')
  return saved ? JSON.parse(saved) : []
})
const [socialPosts, setSocialPosts] = useState<any[]>(() => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('socialPosts')
  return saved ? JSON.parse(saved) : []
})
useEffect(() => {
  localStorage.setItem('tennisSessions', JSON.stringify(tennisSessions))
}, [tennisSessions])

useEffect(() => {
  localStorage.setItem('tennisResults', JSON.stringify(tennisResults))
}, [tennisResults])
useEffect(() => {
  localStorage.setItem('runningSessions', JSON.stringify(runningSessions))
}, [runningSessions])

useEffect(() => {
  localStorage.setItem('runningPRs', JSON.stringify(runningPRs))
}, [runningPRs])
useEffect(() => {
  localStorage.setItem('swimmingSessions', JSON.stringify(swimmingSessions))
}, [swimmingSessions])

useEffect(() => {
  localStorage.setItem('swimmingPRs', JSON.stringify(swimmingPRs))
}, [swimmingPRs])
useEffect(() => {
  localStorage.setItem('socialPosts', JSON.stringify(socialPosts))
}, [socialPosts])
useEffect(() => {
  localStorage.setItem('weeklyGoalTarget', weeklyGoalTarget.toString())
}, [weeklyGoalTarget])
useEffect(() => {
  localStorage.setItem('sportGoals', JSON.stringify(sportGoals))
}, [sportGoals])


useEffect(() => {
  localStorage.setItem('challengeProgress', JSON.stringify(userChallengeProgress))
  if (user && challenges.length > 0) {
    updateChallengeProgress()
  }

  
}, [userChallengeProgress])
useEffect(() => {
  localStorage.setItem('footballSessions', JSON.stringify(footballSessions))
}, [footballSessions])

useEffect(() => {
  localStorage.setItem('gymSessions', JSON.stringify(gymSessions))
}, [gymSessions])


useEffect(() => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  if (dayOfWeek === 1) {
    setFreezeUsedThisWeek(false)
    localStorage.setItem('freezeUsedThisWeek', 'false')
    if (currentStreak >= 7 && streakFreezes < 2) {
      setStreakFreezes(prev => prev + 1)
      localStorage.setItem('streakFreezes', (streakFreezes + 1).toString())
    }
  }
}, [])

const playHaptic = () => {
  if (hapticEnabled && typeof window !== 'undefined' && (navigator as any).vibrate) {
    (navigator as any).vibrate(15)
  }
}

const playSound = (type: 'click' | 'success' | 'achievement') => {
  if (!soundEnabled || typeof window === 'undefined') return
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  if (type === 'click') {
    osc.frequency.value = 800
    gain.gain.value = 0.03
    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  } else if (type === 'success') {
    osc.frequency.value = 600
    gain.gain.value = 0.06
    osc.start()
    osc.frequency.setValueAtTime(900, ctx.currentTime + 0.1)
    osc.stop(ctx.currentTime + 0.2)
  } else if (type === 'achievement') {
    osc.frequency.value = 400
    gain.gain.value = 0.06
    osc.start()
    osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1)
    osc.frequency.setValueAtTime(900, ctx.currentTime + 0.2)
    gain.gain.setValueAtTime(0.03, ctx.currentTime + 0.25)
    osc.stop(ctx.currentTime + 0.4)
  }
}


const startTimer = () => {
  setTimerRunning(true)
  const id = setInterval(() => {
    setTimerSeconds(prev => prev + 1)
  }, 1000)
  setTimerIntervalId(id)
}

const pauseTimer = () => {
  setTimerRunning(false)
  if (timerIntervalId) clearInterval(timerIntervalId)
  setTimerIntervalId(null)
}

const resetTimer = () => {
  pauseTimer()
  setTimerSeconds(0)
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

const getTimerMinutes = () => Math.round(timerSeconds / 60)

const handleCoachMessage = async () => {
  if (!coachInput.trim() || coachLoading) return
  
  const userMsg = coachInput.trim()
  setCoachInput('')
  const newMessages = [...coachMessages, { role: 'user', content: userMsg }]
  setCoachMessages(newMessages)
  setCoachLoading(true)
  
  // Build context from user data
  const totalSessions = runningSessions.length + cyclingSessions.length + gymSessions.length + footballSessions.length
  const recentRuns = runningSessions.slice(0, 3).map((s: any) => `${s.distance}km in ${s.time}mins`).join(', ')
  const recentGym = gymSessions.slice(0, 3).map((s: any) => s.title || 'Workout').join(', ')
  
  const context = `You are a supportive, knowledgeable sports coach. The athlete has logged ${totalSessions} total sessions. Recent runs: ${recentRuns || 'none'}. Recent gym: ${recentGym || 'none'}. They are currently on a ${currentStreak} day streak. Answer their question helpfully and give specific, actionable advice. Keep it under 150 words.`
  
  const prompt = `${context}\n\nAthlete question: ${userMsg}`
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500
          })
        })
      
      const data = await response.json()
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response. Try asking again.'
    
    const updatedMessages = [...newMessages, { role: 'assistant', content: reply }]
    setCoachMessages(updatedMessages)
    localStorage.setItem('coachMessages', JSON.stringify(updatedMessages))
  } catch (e) {
    setCoachMessages([...newMessages, { role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.' }])
  }
  setCoachLoading(false)
}

const startVoiceRecognition = () => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  if (!SpeechRecognition) {
    alert('Voice recognition is not supported in your browser. Try Chrome.')
    return
  }
  
  const recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  
  setIsListening(true)
  recognition.start()
  
  recognition.onresult = (event: any) => {
    const text = event.results[0][0].transcript
    setVoiceText(text)
    setIsListening(false)
    
    // Parse the voice command
    const lower = text.toLowerCase()
    
    // Running: "ran 5k in 24 minutes" or "run 5 kilometers 24 mins"
    if (lower.includes('ran') || lower.includes('run') || lower.includes('running')) {
      const distMatch = lower.match(/(\d+\.?\d*)\s*(k|km|kilometer|kilometers|mile|miles)/)
      const timeMatch = lower.match(/(\d+)\s*(min|mins|minute|minutes)/)
      if (distMatch && timeMatch) {
        const distance = parseFloat(distMatch[1])
        const time = parseInt(timeMatch[1])
        const newRun = {
          id: Date.now(), runType: 'Voice Logged Run', distance, time,
          pace: (() => { const p = time / distance; return `${Math.floor(p)}:${Math.round((p - Math.floor(p)) * 60).toString().padStart(2, '0')}/km` })(),
          effort: 'Moderate', surface: '', notes: `Voice logged: "${text}"`,
          date: new Date().toISOString().split('T')[0]
        }
        setRunningSessions([newRun, ...runningSessions])
        addSocialPost({ sport: 'Running', sportColor: '#06b6d4', emoji: '🏃', caption: `Voice logged: ${distance}km in ${time} mins` })
        setShowQuickLog(false)
        setQuickLogSport('')
      }
    }
    
    // Gym: "benched 80kg" or "squatted 100 kilos"
    if (lower.includes('bench') || lower.includes('squat') || lower.includes('deadlift') || lower.includes('press') || lower.includes('curl') || lower.includes('lifted')) {
      const exercise = lower.includes('bench') ? 'Bench Press' : lower.includes('squat') ? 'Squat' : lower.includes('deadlift') ? 'Deadlift' : lower.includes('press') ? 'Overhead Press' : 'Exercise'
      const weightMatch = lower.match(/(\d+\.?\d*)\s*(kg|kilo|kilos|pounds|lbs|lb)/)
      if (weightMatch) {
        const weight = parseFloat(weightMatch[1])
        const newWorkout = {
          id: Date.now(), title: `Voice Logged: ${exercise}`, date: new Date().toISOString().split('T')[0],
          duration: 30, exercises: [{ name: exercise, sets: '3', reps: '8', weight: weight.toString() }],
          notes: `Voice logged: "${text}"`, rpe: 7
        }
        setGymSessions([newWorkout, ...(gymSessions || [])])
        addSocialPost({ sport: 'Gym', sportColor: '#a855f7', emoji: '🏋️', caption: `Voice logged: ${exercise} ${weight}kg` })
        setShowQuickLog(false)
        setQuickLogSport('')
      }
    }
    
    // Swim: "swam 1000 meters in 25 minutes"
    if (lower.includes('swam') || lower.includes('swim')) {
      const distMatch = lower.match(/(\d+)\s*(m|meter|meters|metre|metres)/)
      const timeMatch = lower.match(/(\d+)\s*(min|mins|minute|minutes)/)
      if (distMatch && timeMatch) {
        const distance = parseInt(distMatch[1])
        const time = parseInt(timeMatch[1])
        const newSwim = {
          id: Date.now(), swimType: 'Voice Logged Swim', stroke: 'Freestyle', poolLength: 25,
          distance, time, pace: (() => { const p = time / (distance / 100); return `${Math.floor(p)}:${Math.round((p - Math.floor(p)) * 60).toString().padStart(2, '0')}/100m` })(),
          lengths: Math.round(distance / 25), effort: 'Moderate', notes: `Voice logged: "${text}"`,
          date: new Date().toISOString().split('T')[0]
        }
        setSwimmingSessions([newSwim, ...swimmingSessions])
        addSocialPost({ sport: 'Swimming', sportColor: '#3b82f6', emoji: '🏊', caption: `Voice logged: ${distance}m in ${time} mins` })
        setShowQuickLog(false)
        setQuickLogSport('')
      }
    }
    
    // If nothing matched, just show the text
    if (!lower.match(/ran|run|bench|squat|deadlift|press|curl|lift|swam|swim/)) {
      alert(`I heard: "${text}". Try saying something like "Ran 5K in 24 minutes" or "Benched 80kg".`)
    }
  }
  
  recognition.onerror = () => {
    setIsListening(false)
    alert('Could not hear you. Please try again.')
  }
}

const handleSearch = (query: string) => {
  setSearchQuery(query)
  if (!query.trim()) {
    setSearchResults([])
    return
  }
  
  const q = query.toLowerCase()
  const allData = [
    ...footballSessions.map((s: any) => ({ ...s, type: 'football', sport: 'Football', emoji: '⚽', color: '#22c55e', label: `${s.sessionType || s.session_type || 'Session'} ${s.opponent ? 'vs ' + s.opponent : ''}`, detail: `${s.goals || 0} goals · ${s.assists || 0} assists · ${s.duration || 0} mins` })),
    ...gymSessions.map((s: any) => ({ ...s, type: 'gym', sport: 'Gym', emoji: '🏋️', color: '#a855f7', label: s.title || 'Workout', detail: `${s.duration || 0} mins · ${s.exercises ? s.exercises.filter((e: any) => e.name).length : 0} exercises` })),
    ...runningSessions.map((s: any) => ({ ...s, type: 'running', sport: 'Running', emoji: '🏃', color: '#06b6d4', label: s.runType || 'Run', detail: `${s.distance || 0}km · ${s.time || 0} mins · ${s.pace || ''}` })),
    ...tennisSessions.map((s: any) => ({ ...s, type: 'tennis', sport: 'Tennis', emoji: '🎾', color: '#eab308', label: s.sessionType || 'Session', detail: `${s.duration || 0} mins · ${s.focus || ''}` })),
    ...swimmingSessions.map((s: any) => ({ ...s, type: 'swimming', sport: 'Swimming', emoji: '🏊', color: '#3b82f6', label: s.swimType || s.stroke || 'Swim', detail: `${s.distance || 0}m · ${s.time || 0} mins` })),
  ]
  
  const results = allData.filter(s => 
    s.sport.toLowerCase().includes(q) ||
    s.label.toLowerCase().includes(q) ||
    s.detail.toLowerCase().includes(q) ||
    (s.notes || '').toLowerCase().includes(q) ||
    (s.date || '').includes(q)
  ).slice(0, 20)
  
  setSearchResults(results)
}


// Update challenge progress based on session data
useEffect(() => {
  if (challenges.length === 0) return
  const newProgress = { ...userChallengeProgress }
  let changed = false
  
  challenges.forEach((challenge: any) => {
    let progress = 0
    if (challenge.sport === 'Running') {
      progress = runningSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
    } else if (challenge.sport === 'Cycling') {
      progress = cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
    } else if (challenge.sport === 'Swimming') {
      progress = swimmingSessions.reduce((sum: number, s: any) => sum + ((s.distance || 0) / 1000), 0)
    } else if (challenge.sport === 'Gym') {
      progress = gymSessions.length
    } else if (challenge.sport === 'Football') {
      progress = footballSessions.length
    } else {
      progress = tennisSessions.length + basketballSessions.length + boxingSessions.length + golfSessions.length + rugbySessions.length + cricketSessions.length
    }
    
    if (progress !== (newProgress[challenge.id] || 0)) {
      newProgress[challenge.id] = progress
      changed = true
    }
  })
  
  if (changed) {
    setUserChallengeProgress(newProgress)
    localStorage.setItem('challengeProgress', JSON.stringify(newProgress))
  }
}, [runningSessions, cyclingSessions, swimmingSessions, gymSessions, footballSessions, tennisSessions, basketballSessions, boxingSessions, golfSessions, rugbySessions, cricketSessions])

const addSocialPost = async (post: any) => {
  // Only save to social feed if explicitly sharing (manual posts handle this themselves)
  // This function is now just a pass-through for manual shares from log forms
  const { data: { session } } = await supabase.auth.getSession()
  if (session && post.caption) {
    const newPost = {
      user_id: session.user.id,
      username: 'Toby Furlong',
      caption: post.caption,
      sport: post.sport,
      sport_color: post.sportColor,
      emoji: post.emoji,
      likes: 0,
    }
    const { data } = await supabase.from('posts').insert(newPost).select().single()
    if (data) {
      setSocialPosts((prev) => [{ ...data, id: data.id, time: 'Just now', user: 'Toby Furlong', handle: '@tobyfurlong', hasMedia: false, mediaBg: '', ...post }, ...prev])
    }
  }
}



useEffect(() => {
  supabase.auth.getSession().then(async ({ data: { session } }) => {
    setUser(session?.user ?? null)
    setAuthLoading(false)
    if (session?.user) {
      const { data } = await supabase.from('profiles').select('avatar_url, username').eq('id', session.user.id).single()
      if (data?.avatar_url) setAvatarUrl(data.avatar_url)
      if (data?.username) setDisplayName(data.username)
      if (data?.sport_goals) { setSportGoals(data.sport_goals); localStorage.setItem('sportGoals', JSON.stringify(data.sport_goals)) }
if (data?.hidden_widgets) { setHiddenWidgets(data.hidden_widgets); localStorage.setItem('hiddenWidgets', JSON.stringify(data.hidden_widgets)) }
if (data?.sound_enabled !== undefined) { setSoundEnabled(data.sound_enabled); localStorage.setItem('soundEnabled', data.sound_enabled.toString()) }
if (data?.haptic_enabled !== undefined) { setHapticEnabled(data.haptic_enabled); localStorage.setItem('hapticEnabled', data.haptic_enabled.toString()) }
    }
  })
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null)
  })
  return () => subscription.unsubscribe()
}, [])

if (authLoading) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '90px', height: '90px', borderRadius: '24px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', boxShadow: '0 0 40px #a855f750', marginBottom: '32px' }}>
        🏅
      </div>
      <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: '0 0 8px', letterSpacing: '-1px' }}>SportSync</h1>
      <p style={{ color: '#555', fontSize: '14px', margin: '0 0 48px', fontWeight: '500' }}>Track every sport. Own every session.</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7', opacity: 0.3 + i * 0.3 }} />
        ))}
      </div>
    </div>
  )
}

if (!user) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏅</div>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', margin: '0 0 8px' }}>SportSync</h1>
      <p style={{ color: '#666', marginBottom: '40px', fontSize: '14px' }}>Sign in to continue</p>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          id="auth-email"
          placeholder="Email"
          style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }}
        />
        <input
          id="auth-password"
          placeholder="Password"
          type="password"
          style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }}
        />
        <button
          onClick={async () => {
            const email = (document.getElementById('auth-email') as HTMLInputElement).value
            const password = (document.getElementById('auth-password') as HTMLInputElement).value
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) alert(error.message)
          }}
          style={{ width: '100%', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '4px' }}
        >
          Sign In
        </button>
        <button
          onClick={async () => {
            const email = (document.getElementById('auth-email') as HTMLInputElement).value
            const password = (document.getElementById('auth-password') as HTMLInputElement).value
            const { error } = await supabase.auth.signUp({ email, password })
            if (error) alert(error.message)
            else alert('Check your email to confirm your account!')
          }}
          style={{ width: '100%', background: 'none', border: '1.5px solid #1e1e30', borderRadius: '14px', color: '#aaa', padding: '16px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}
if (activeNav === 'sports') {
  return <SportsPage setActiveNav={setActiveNav} />
}
if (activeNav === 'track') {
  return <TrackPage setActiveNav={setActiveNav} footballSessions={footballSessions} gymSessions={gymSessions} tennisSessions={tennisSessions} runningSessions={runningSessions} swimmingSessions={swimmingSessions} basketballSessions={basketballSessions} boxingSessions={boxingSessions} cyclingSessions={cyclingSessions} golfSessions={golfSessions} rugbySessions={rugbySessions} cricketSessions={cricketSessions} />
}
if (activeNav === 'football-hub') {
  return <FootballHub setActiveNav={setActiveNav} />
}
if (activeNav === 'gym-hub') {
  return <GymHub setActiveNav={setActiveNav} gymSessions={gymSessions} />
}
if (activeNav === 'tennis-hub') {
  return <TennisHub setActiveNav={setActiveNav} />
}
if (activeNav === 'running-hub') {
  return <RunningHub setActiveNav={setActiveNav} runningSessions={runningSessions} />
}
if (activeNav === 'swimming-hub') {
  return <SwimmingHub setActiveNav={setActiveNav} />
}
if (activeNav === 'basketball-hub') {
  return (
    <BasketballHub
      setActiveNav={setActiveNav}
      basketballSessions={basketballSessions}
    />
  )
}
if (activeNav === 'golf-hub') {
  return <GolfHub setActiveNav={setActiveNav} golfSessions={golfSessions} />
}
if (activeNav === 'log-golf') {
  return <LogGolf setActiveNav={setActiveNav} golfSessions={golfSessions} setGolfSessions={setGolfSessions} addSocialPost={addSocialPost} />
}
if (activeNav === 'golf-stats') {
  return <GolfStats setActiveNav={setActiveNav} golfSessions={golfSessions} setGolfSessions={setGolfSessions} />
}
if (activeNav === 'golf-plans') {
  return <SuggestedGolfSessions setActiveNav={setActiveNav} />
}
if (activeNav === 'rugby-hub') {
  return <RugbyHub setActiveNav={setActiveNav} rugbySessions={rugbySessions} />
}
if (activeNav === 'log-rugby') {
  return <LogRugby setActiveNav={setActiveNav} rugbySessions={rugbySessions} setRugbySessions={setRugbySessions} addSocialPost={addSocialPost} />
}
if (activeNav === 'rugby-stats') {
  return <RugbyStats setActiveNav={setActiveNav} rugbySessions={rugbySessions} setRugbySessions={setRugbySessions} />
}
if (activeNav === 'rugby-plans') {
  return <SuggestedRugbySessions setActiveNav={setActiveNav} />
}
if (activeNav === 'cricket-hub') {
  return <CricketHub setActiveNav={setActiveNav} cricketSessions={cricketSessions} />
}
if (activeNav === 'log-cricket') {
  return <LogCricket setActiveNav={setActiveNav} cricketSessions={cricketSessions} setCricketSessions={setCricketSessions} addSocialPost={addSocialPost} />
}
if (activeNav === 'cricket-stats') {
  return <CricketStats setActiveNav={setActiveNav} cricketSessions={cricketSessions} setCricketSessions={setCricketSessions} />
}
if (activeNav === 'cricket-plans') {
  return <SuggestedCricketSessions setActiveNav={setActiveNav} />
}
if (activeNav === 'cycling-hub') {
  return (
    <CyclingHub
      setActiveNav={setActiveNav}
      cyclingSessions={cyclingSessions}
    />
  )
}
if (activeNav === 'cycling-stats') {
  return (
    <CyclingStats
      setActiveNav={setActiveNav}
      cyclingSessions={cyclingSessions}
      setCyclingSessions={setCyclingSessions}
    />
  )
}
if (activeNav === 'cycling-records') {
  return (
    <CyclingRecords
      setActiveNav={setActiveNav}
      cyclingSessions={cyclingSessions}
    />
  )
}
if (activeNav === 'cycling-plans') {
  return (
    <SuggestedCyclingSessions
      setActiveNav={setActiveNav}
      setSelectedCyclingCategory={setSelectedCyclingCategory}
    />
  )
}
if (activeNav === 'cycling-achievements') {
  return (
    <CyclingAchievements
      setActiveNav={setActiveNav}
      cyclingSessions={cyclingSessions}
    />
  )
}

if (activeNav === 'cycling-session-detail') {
  return (
    <CyclingSessionDetail
      category={selectedCyclingCategory}
      setActiveNav={setActiveNav}
    />
  )
}

if (activeNav === 'log-basketball') {
  return (
    <LogBasketball
      setActiveNav={setActiveNav}
      basketballSessions={basketballSessions}
      setBasketballSessions={setBasketballSessions}
      addSocialPost={addSocialPost}
    />
  )
}

if (activeNav === 'basketball-stats') {
  return (
    <BasketballStats
      setActiveNav={setActiveNav}
      basketballSessions={basketballSessions}
      setBasketballSessions={setBasketballSessions}
    />
  )
}

if (activeNav === 'basketball-plans') {
  return (
    <SuggestedBasketballSessions
      setActiveNav={setActiveNav}
      setSelectedBasketballCategory={setSelectedBasketballCategory}
    />
  )
}

if (activeNav === 'basketball-session-detail') {
  return (
    <BasketballSessionDetail
      category={selectedBasketballCategory}
      setActiveNav={setActiveNav}
    />
  )
}
if (activeNav === 'basketball-fixtures') {
  return <BasketballFixtures setActiveNav={setActiveNav} />
}
if (activeNav === 'boxing-hub') {
  return (
    <BoxingHub
      setActiveNav={setActiveNav}
      boxingSessions={boxingSessions}
    />
  )
}

if (activeNav === 'log-boxing') {
  return (
    <LogBoxing
      setActiveNav={setActiveNav}
      boxingSessions={boxingSessions}
      setBoxingSessions={setBoxingSessions}
      addSocialPost={addSocialPost}
    />
  )
}
if (activeNav === 'log-cycling') {
  return (
    <LogCycling
      setActiveNav={setActiveNav}
      cyclingSessions={cyclingSessions}
      setCyclingSessions={setCyclingSessions}
      addSocialPost={addSocialPost}
    />
  )
}

if (activeNav === 'boxing-stats') {
  return (
    <BoxingStats
      setActiveNav={setActiveNav}
      boxingSessions={boxingSessions}
      setBoxingSessions={setBoxingSessions}
    />
  )
}

if (activeNav === 'boxing-records') {
  return (
    <BoxingRecords
      setActiveNav={setActiveNav}
      boxingSessions={boxingSessions}
    />
  )
}

if (activeNav === 'boxing-plans') {
  return (
    <SuggestedBoxingSessions
      setActiveNav={setActiveNav}
      setSelectedBoxingCategory={setSelectedBoxingCategory}
    />
  )
}

if (activeNav === 'boxing-session-detail') {
  return (
    <BoxingSessionDetail
      category={selectedBoxingCategory}
      setActiveNav={setActiveNav}
    />
  )
}
if (activeNav === 'log-swim') {
  return (
    <LogSwim
      setActiveNav={setActiveNav}
      swimmingSessions={swimmingSessions}
      setSwimmingSessions={setSwimmingSessions}
      swimmingPRs={swimmingPRs}
      setSwimmingPRs={setSwimmingPRs}
      addSocialPost={addSocialPost}
      triggerPRToast={triggerPRToast}
    />
  )
}

if (activeNav === 'swimming-stats') {
  return (
    <SwimmingStats
      setActiveNav={setActiveNav}
      swimmingSessions={swimmingSessions}
      setSwimmingSessions={setSwimmingSessions}
      swimmingPRs={swimmingPRs}
    />
  )
}

if (activeNav === 'swimming-prs') {
  return (
    <SwimmingPRs
      setActiveNav={setActiveNav}
      swimmingPRs={swimmingPRs}
    />
  )
}

if (activeNav === 'swimming-plans') {
  return <SuggestedSwimmingSessions setActiveNav={setActiveNav} />
}
if (activeNav === 'log-run') {
  return (
    <LogRun
      setActiveNav={setActiveNav}
      runningSessions={runningSessions}
      setRunningSessions={setRunningSessions}
      runningPRs={runningPRs}
      setRunningPRs={setRunningPRs}
      addSocialPost={addSocialPost}
      triggerPRToast={triggerPRToast}
      setSessionComparison={setSessionComparison}
      setShowComparison={setShowComparison}
    />
  )
}

if (activeNav === 'running-stats') {
  return (
    <RunningStats
      setActiveNav={setActiveNav}
      runningSessions={runningSessions}
      setRunningSessions={setRunningSessions}
      runningPRs={runningPRs}
    />
  )
}

if (activeNav === 'running-plans') {
  return <SuggestedRunningSessions setActiveNav={setActiveNav} />
}

if (activeNav === 'running-prs') {
  return (
    <RunningPRs
      setActiveNav={setActiveNav}
      runningPRs={runningPRs}
    />
  )
}
if (activeNav === 'log-session') {
  return <LogSession setActiveNav={setActiveNav} footballSessions={footballSessions} setFootballSessions={setFootballSessions} addSocialPost={addSocialPost} />
}
if (activeNav === 'fixtures') {
  return <FixturesPage setActiveNav={setActiveNav} footballSessions={footballSessions} setFootballSessions={setFootballSessions} />
}
if (activeNav === 'suggested-drills') {
  return <SuggestedDrills setActiveNav={setActiveNav} />
}
if (activeNav === 'log-tennis-session') {
  return <LogTennisSession setActiveNav={setActiveNav} tennisSessions={tennisSessions} setTennisSessions={setTennisSessions} addSocialPost={addSocialPost} />}
if (activeNav === 'tennis-matches') {
  return <TennisMatches setActiveNav={setActiveNav} tennisResults={tennisResults} setTennisResults={setTennisResults} />
}
if (activeNav === 'suggested-tennis-drills') {
  return <SuggestedTennisDrills setActiveNav={setActiveNav} />
}
if (activeNav === 'tennis-stats') {
  return <TennisStats setActiveNav={setActiveNav} tennisSessions={tennisSessions} setTennisSessions={setTennisSessions} tennisResults={tennisResults} />
}
if (activeNav === 'log-workout') {
  return <LogWorkout setActiveNav={setActiveNav} gymSessions={gymSessions} setGymSessions={setGymSessions} addSocialPost={addSocialPost} triggerPRToast={triggerPRToast} />
}
if (activeNav === 'personal-records') {
  return <PersonalRecords setActiveNav={setActiveNav} gymSessions={gymSessions} />
}

if (activeNav === 'my-stats') {
  return <FootballStats setActiveNav={setActiveNav} footballSessions={footballSessions} setFootballSessions={setFootballSessions} />
}
if (activeNav === 'suggested-workouts') {
  return <SuggestedWorkouts setActiveNav={setActiveNav} />
}
if (activeNav === 'gym-stats') {
  return <GymStats setActiveNav={setActiveNav} gymSessions={gymSessions} />
}
if (activeNav === 'session-detail') {
  return (
    <SessionDetailPage
      setActiveNav={setActiveNav}
      session={selectedSession}
    />
  )
}

if (activeNav === 'recent-activity') {
  return (
    <RecentActivityPage
      setActiveNav={setActiveNav}
      setSelectedSession={setSelectedSession}
      footballSessions={footballSessions}
      tennisSessions={tennisSessions}
      runningSessions={runningSessions}
      swimmingSessions={swimmingSessions}
      basketballSessions={basketballSessions}
      boxingSessions={boxingSessions}
      cyclingSessions={cyclingSessions}
      golfSessions={golfSessions}
      rugbySessions={rugbySessions}
      cricketSessions={cricketSessions}
    />
  )
}
if (activeNav === 'analytics') {
  return (
    <AnalyticsDashboard
      setActiveNav={setActiveNav}
      footballSessions={footballSessions}
      gymSessions={gymSessions}
      tennisSessions={tennisSessions}
      runningSessions={runningSessions}
      swimmingSessions={swimmingSessions}
      basketballSessions={basketballSessions}
      boxingSessions={boxingSessions}
      cyclingSessions={cyclingSessions}
      golfSessions={golfSessions}
      rugbySessions={rugbySessions}
      cricketSessions={cricketSessions}
    />
  )
}
if (activeNav === 'terms') {
  return <TermsPage setActiveNav={setActiveNav} />
}
if (activeNav === 'about') {
  return <AboutPage setActiveNav={setActiveNav} />
}
if (activeNav === 'privacy') {
  return <PrivacyPage setActiveNav={setActiveNav} />
}

if (activeNav === 'social') {
  return <SocialPage setActiveNav={setActiveNav} socialPosts={socialPosts} user={user} />
}
if (activeNav === 'profile') {
  return <ProfilePage setActiveNav={setActiveNav} footballSessions={footballSessions} tennisSessions={tennisSessions} runningSessions={runningSessions} swimmingSessions={swimmingSessions} basketballSessions={basketballSessions} boxingSessions={boxingSessions} cyclingSessions={cyclingSessions} golfSessions={golfSessions} rugbySessions={rugbySessions} cricketSessions={cricketSessions} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} displayName={displayName} setDisplayName={setDisplayName} user={user} lightMode={lightMode} setLightMode={setLightMode} />
}

const todayStr = new Date().toISOString().split('T')[0]

const getWeekStart = () => {
  const d = new Date()
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff)).toISOString().split('T')[0]
}
const weekStart = getWeekStart()

const isThisWeek = (dateStr: string) => dateStr >= weekStart

const totalSessions =
  tennisSessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length +
  runningSessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length +
  swimmingSessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length +
  basketballSessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length +
  boxingSessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length +
  cyclingSessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length +
  golfSessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length +
  rugbySessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length +
  cricketSessions.filter((s: any) => isThisWeek(s.date || s.created_at?.split('T')[0])).length

  const smartNotifications = (() => {
    const notifs: { id: string, emoji: string, title: string, detail: string, color: string, action: string }[] = []
    const now = new Date()
    
    const lastRun = runningSessions.sort((a: any, b: any) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())[0]
    if (lastRun) {
      const daysSinceRun = Math.floor((now.getTime() - new Date(lastRun.date || '').getTime()) / (1000 * 60 * 60 * 24))
      if (daysSinceRun >= 3 && daysSinceRun < 7) {
        notifs.push({ id: 'run-reminder', emoji: '🏃', title: `${daysSinceRun} days since your last run`, detail: `Your last run was ${lastRun.distance}km. How about a quick 5K today?`, color: '#06b6d4', action: 'log-run' })
      } else if (daysSinceRun >= 7) {
        notifs.push({ id: 'run-reminder', emoji: '🏃', title: `It has been ${daysSinceRun} days since your last run`, detail: 'Even a short run will get you back on track.', color: '#06b6d4', action: 'log-run' })
      }
    }
    
    const lastGym = gymSessions.sort((a: any, b: any) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())[0]
    if (lastGym) {
      const daysSinceGym = Math.floor((now.getTime() - new Date(lastGym.date || '').getTime()) / (1000 * 60 * 60 * 24))
      if (daysSinceGym >= 5 && daysSinceGym < 10) {
        notifs.push({ id: 'gym-reminder', emoji: '🏋️', title: `${daysSinceGym} days since your last workout`, detail: 'Your muscles are ready for another session.', color: '#a855f7', action: 'log-workout' })
      }
    }
    
    Object.entries(sportGoals).forEach(([key, target]: any) => {
      const [sport, metric] = key.split('_')
      let progress = 0
      if (sport === 'Running') progress = runningSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
      else if (sport === 'Gym') progress = gymSessions.length
      else if (sport === 'Cycling') progress = cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
      const pct = Math.round((progress / target) * 100)
      if (pct >= 80 && pct < 100) {
        notifs.push({ id: `goal-${key}`, emoji: '🎯', title: `Almost there! ${pct}% to your ${sport} goal`, detail: `Only ${target - progress} ${metric} to go!`, color: '#22c55e', action: 'track' })
      }
    })
    
    if (activePrograms.length > 0) {
      activePrograms.forEach((program: any) => {
        const prog = programProgress[program.id] || {}
        const completed = Object.keys(prog).filter(k => prog[k]).length
        const pct = Math.round((completed / program.sessions.length) * 100)
        if (pct > 0 && pct < 30) {
          notifs.push({ id: `program-${program.id}`, emoji: program.emoji, title: `Great start on ${program.title}!`, detail: `${completed} of ${program.sessions.length} sessions done.`, color: program.color, action: 'home' })
        } else if (pct >= 50 && pct < 100) {
          notifs.push({ id: `program-${program.id}`, emoji: program.emoji, title: `Halfway through ${program.title}!`, detail: `${completed}/${program.sessions.length} complete.`, color: program.color, action: 'home' })
        }
      })
    }
    
    const dayOfWeek = now.getDay()
    if (dayOfWeek === 1) {
      notifs.push({ id: 'monday-motivation', emoji: '💪', title: 'New week, new opportunities', detail: 'What do you want to achieve this week?', color: '#a855f7', action: 'home' })
    }
    
    return notifs.filter(n => !dismissedNotifications.includes(n.id)).slice(0, 4)
  })()


  const weeklyProgress = Math.min(Math.round((totalSessions / weeklyGoalTarget) * 100), 100)


const useStreakFreeze = () => {
  if (streakFreezes > 0 && !freezeUsedThisWeek) {
    setStreakFreezes(prev => prev - 1)
    setFreezeUsedThisWeek(true)
    localStorage.setItem('streakFreezes', (streakFreezes - 1).toString())
    localStorage.setItem('freezeUsedThisWeek', 'true')
    setShowStreakFreeze(false)
    return true
  }
  return false
}

const currentStreak = (() => {
  const allSessionDates = [
    ...footballSessions, ...gymSessions, ...tennisSessions, ...runningSessions,
    ...swimmingSessions, ...basketballSessions, ...boxingSessions, ...cyclingSessions,
    ...golfSessions, ...rugbySessions, ...cricketSessions
  ].map((s: any) => s.date || s.created_at?.split('T')[0]).filter(Boolean)
  const uniqueDates = [...new Set(allSessionDates)].sort().reverse()
  if (uniqueDates.length === 0) return 0
  let streak = 0
  let freezesAvailable = streakFreezes
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today)
    checkDate.setDate(checkDate.getDate() - i)
    const dateStr = checkDate.toISOString().split('T')[0]
    if (uniqueDates.includes(dateStr)) { streak++ }
    else if (freezesAvailable > 0 && i > 0) {
      // Use a freeze for this missed day
      freezesAvailable--
      streak++
    }
    else if (i > 0) { break }
  }
  return streak
})()





  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: lightMode ? '#f5f5f7' : '#0a0a0f',
        color: lightMode ? '#1a1a1a' : 'white',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '430px',
        margin: '0 auto',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      
      {/* Background gradient blobs */}
      <div
        style={{
          position: 'fixed',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '100px',
          left: '-100px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Scrollable content */}
      <div
        style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch' }}
      >
        {/* Header */}
        <div style={{ padding: '50px 24px 24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>
              SportSync
            </h1>

            <button onClick={() => setShowCustomize(true)} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '20px', color: '#aaa', padding: '6px 12px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
              ⚙️ Customize
            </button>
            
            
            
            <div
  onClick={() => setActiveNav('profile')}
  onTouchStart={() => setActiveNav('profile')}
  style={{
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #a855f7, #06b6d4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    cursor: 'pointer',
    overflow: 'hidden',
    border: avatarUrl ? '2px solid #a855f7' : 'none',
  }}
>
  {avatarUrl ? (
    <img src={avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ) : (
    '👤'
  )}
</div>
          </div>
        </div>

        {/* Progress Ring */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 24px 30px',
          }}
        >
          <div
            onClick={() => setShowGoalSetter(true)}
            style={{ position: 'relative', width: '180px', height: '180px', cursor: 'pointer' }}
          >
            <svg
              width="180"
              height="180"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="90"
                cy="90"
                r="75"
                fill="none"
                stroke="#1a1a2e"
                strokeWidth="12"
              />
              <circle
                cx="90"
                cy="90"
                r="75"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 75 * (weeklyProgress / 100)} ${2 * Math.PI * 75}`}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: '800' }}>{weeklyProgress}%</div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                {totalSessions}/{weeklyGoalTarget} sessions
              </div>
              <div style={{ fontSize: '10px', color: '#a855f7', marginTop: '4px', fontWeight: '600' }}>
                tap to set goal
              </div>
            </div>
          </div>
        </div>

        
        {(() => {
  const allAchievements = [
    { title: 'First Tennis Session', emoji: '🎾', color: '#eab308', earned: tennisSessions.length >= 1 },
    { title: 'First Run', emoji: '🏃', color: '#06b6d4', earned: runningSessions.length >= 1 },
    { title: 'First Swim', emoji: '🏊', color: '#3b82f6', earned: swimmingSessions.length >= 1 },
    { title: 'First Basketball Session', emoji: '🏀', color: '#f97316', earned: basketballSessions.length >= 1 },
    { title: 'First Boxing Session', emoji: '🥊', color: '#ef4444', earned: boxingSessions.length >= 1 },
    { title: 'First Ride', emoji: '🚴', color: '#10b981', earned: cyclingSessions.length >= 1 },
    { title: 'First Round of Golf', emoji: '⛳', color: '#84cc16', earned: golfSessions.filter((s: any) => s.session_type === 'Round').length >= 1 },
    { title: 'First Rugby Session', emoji: '🏉', color: '#f59e0b', earned: rugbySessions.length >= 1 },
    { title: 'First Cricket Session', emoji: '🏏', color: '#06b6d4', earned: cricketSessions.length >= 1 },
    { title: 'Welcome to SportSync', emoji: '🏅', color: '#a855f7', earned: true },
    { title: 'Multi-Sport Athlete', emoji: '🏅', color: '#22c55e', earned: [tennisSessions, runningSessions, swimmingSessions, basketballSessions, boxingSessions, cyclingSessions, golfSessions, rugbySessions, cricketSessions].filter(s => s.length > 0).length >= 3 },
    { title: '50km Runner', emoji: '🛣️', color: '#06b6d4', earned: runningSessions.reduce((sum: number, r: any) => sum + (r.distance || 0), 0) >= 50 },
    { title: '25 Sessions', emoji: '🔥', color: '#ef4444', earned: (tennisSessions.length + runningSessions.length + swimmingSessions.length + basketballSessions.length + boxingSessions.length + cyclingSessions.length + golfSessions.length + rugbySessions.length + cricketSessions.length + footballSessions.length) >= 25 },
    { title: 'Try Scorer', emoji: '🏆', color: '#22c55e', earned: rugbySessions.some((s: any) => (s.tries || 0) >= 1) },
    { title: 'Half Century', emoji: '🏏', color: '#22c55e', earned: cricketSessions.some((s: any) => (s.runs || 0) >= 50) },
    { title: 'Century Rider', emoji: '💯', color: '#06b6d4', earned: cyclingSessions.some((s: any) => (s.distance || 0) >= 100) },
    { title: 'Sub-90 Round', emoji: '🏌️', color: '#84cc16', earned: golfSessions.some((s: any) => s.session_type === 'Round' && (s.score || 999) < 90) },
  ]
  const latest = allAchievements.filter(a => a.earned).pop()
  if (!latest) return null
  return (
    <div style={{ padding: '0 24px', marginBottom: '24px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Latest Achievement</h2>
      <div onClick={() => setActiveNav('profile')} onTouchStart={() => setActiveNav('profile')} style={{ background: '#13131f', border: `1px solid ${latest.color}40`, borderLeft: `4px solid ${latest.color}`, borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: `0 0 20px ${latest.color}20` }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${latest.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>{latest.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '800', fontSize: '15px' }}>{latest.title}</div>
          <div style={{ color: '#666', fontSize: '12px', marginTop: '3px' }}>Tap to view all achievements</div>
        </div>
        <div style={{ color: latest.color, fontSize: '20px' }}>›</div>
      </div>
    </div>
  )
})()}
{/* AI Weekly Report */}
<div style={{ padding: '0 24px', marginBottom: '24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #13131f, #17172a)', border: '1px solid #a855f750', borderLeft: '4px solid #a855f7', borderRadius: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: aiReport ? '14px' : '0' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '900' }}>🤖 AI Weekly Report</div>
                <div style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>Personalised analysis of your training</div>
              </div>
              {!aiReport && !aiReportLoading && (
                <button onClick={generateWeeklyReport} style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '12px', color: 'white', padding: '10px 18px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Generate Report
                </button>
              )}
            </div>

            {aiReportLoading && (
              <div style={{ marginTop: '16px', textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🧠</div>
                <div style={{ color: '#a855f7', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>Analysing your week...</div>
                <div style={{ color: '#666', fontSize: '12px' }}>Crunching data across all sports</div>
              </div>
            )}

            {aiReport && (
              <div>
                <div style={{ background: '#0a0a0f', border: '1px solid #a855f730', borderRadius: '14px', padding: '16px', marginTop: '12px', color: '#ddd', fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  {aiReport}
                </div>
                <button onClick={generateWeeklyReport} style={{ marginTop: '12px', background: '#a855f715', border: '1px solid #a855f740', borderRadius: '10px', color: '#a855f7', padding: '8px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  🔄 Regenerate Report
                </button>
              </div>
            )}
          </div>
        </div>

{/* Analytics Dashboard Preview */}
<div style={{ padding: '0 24px', marginBottom: '24px' }}>
  <div
    onClick={() => setActiveNav('analytics')}
    onTouchStart={() => setActiveNav('analytics')}
    style={{
      background: 'linear-gradient(135deg, #13131f, #17172a)',
      border: '1px solid #2a2a40',
      borderLeft: '4px solid #a855f7',
      borderRadius: '20px',
      padding: '20px',
      cursor: 'pointer',
      boxShadow: '0 0 25px rgba(168,85,247,0.12)'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: '18px', fontWeight: '900' }}>Analytics Dashboard</div>
        <div style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>
          View weekly trends, totals and performance insights
        </div>
      </div>
      <div style={{ fontSize: '30px' }}>📊</div>
    </div>

    <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '800', marginTop: '14px' }}>
      Open dashboard ›
    </div>
  </div>
</div>

{/* Recent Activity Preview */}
{(() => {
  const totalRecent =
    footballSessions.length +
    tennisSessions.length +
    runningSessions.length +
    swimmingSessions.length +
    basketballSessions.length +
    boxingSessions.length +
    cyclingSessions.length +
    golfSessions.length +
    rugbySessions.length +
    cricketSessions.length

  if (totalRecent === 0) return null

  return (
    <div style={{ padding: '0 24px', marginBottom: '24px' }}>
      <div
        onClick={() => setActiveNav('recent-activity')}
        onTouchStart={() => setActiveNav('recent-activity')}
        style={{
          background: 'linear-gradient(135deg, #13131f, #17172a)',
          border: '1px solid #2a2a40',
          borderRadius: '20px',
          padding: '20px',
          cursor: 'pointer',
          boxShadow: '0 0 25px rgba(168,85,247,0.12)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>Recent Activity</div>
            <div style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>
              View your latest logged sessions
            </div>
          </div>

          <div style={{ fontSize: '28px' }}>📋</div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          {['⚽', '🏃', '🥊', '🚴', '🏀'].map((emoji, i) => (
            <div key={i} style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#0a0a0f',
              border: '1px solid #2a2a40',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '17px'
            }}>
              {emoji}
            </div>
          ))}
        </div>

        <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: '800', marginTop: '14px' }}>
          {totalRecent} total sessions logged ›
        </div>
      </div>
    </div>
  )
})()}

 {/* Smart Notifications */}
 {smartNotifications.length > 0 && !hiddenWidgets.includes('notifications') && (
          <div style={{ padding: '0 24px', marginBottom: '24px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0', right: '24px', fontSize: '12px', color: '#444', cursor: 'pointer', zIndex: 10 }} onClick={() => { const newHidden = [...hiddenWidgets, 'notifications']; setHiddenWidgets(newHidden); localStorage.setItem('hiddenWidgets', JSON.stringify(newHidden)); }}>✕</div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>For You</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {smartNotifications.map((notif: any) => (
                <div key={notif.id} style={{ position: 'relative' }}>
                  <div onClick={() => setActiveNav(notif.action)} style={{ background: 'linear-gradient(135deg, #13131f, #17172a)', border: `1px solid ${notif.color}25`, borderLeft: `4px solid ${notif.color}`, borderRadius: '14px', padding: '14px 16px', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${notif.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{notif.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '13px' }}>{notif.title}</div>
                      <div style={{ color: '#888', fontSize: '11px', marginTop: '2px', lineHeight: '1.4' }}>{notif.detail}</div>
                    </div>
                    <div style={{ color: notif.color, fontSize: '16px' }}>→</div>
                  </div>
                  <button onClick={() => { const newDismissed = [...dismissedNotifications, notif.id]; setDismissedNotifications(newDismissed); localStorage.setItem('dismissedNotifications', JSON.stringify(newDismissed)); }} style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#666', fontSize: '12px', cursor: 'pointer', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly/Yearly Recap */}
        {(() => {
          const now = new Date()
          const isEndOfMonth = now.getDate() >= 28
          const isEndOfYear = now.getMonth() === 11 && now.getDate() >= 28
          
          if (!isEndOfMonth && !isEndOfYear) return null
          
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
          const yearStart = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]
          
          const monthlySessions = [runningSessions, cyclingSessions, swimmingSessions, gymSessions, footballSessions, tennisSessions, basketballSessions, boxingSessions, golfSessions, rugbySessions, cricketSessions]
            .flat().filter((s: any) => (s.date || '') >= monthStart)
          
          const yearlySessions = [runningSessions, cyclingSessions, swimmingSessions, gymSessions, footballSessions, tennisSessions, basketballSessions, boxingSessions, golfSessions, rugbySessions, cricketSessions]
            .flat().filter((s: any) => (s.date || '') >= yearStart)
          
          const monthlyDistance = monthlySessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
          const yearlyDistance = yearlySessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
          const monthlySports = new Set(monthlySessions.map((s: any) => s.sport || s.sessionType || s.runType || s.rideType || s.swimType)).size
          
          const bestRun = runningSessions.filter((s: any) => (s.date || '') >= yearStart).reduce((best: any, s: any) => (s.distance || 0) > (best?.distance || 0) ? s : best, null)
          const bestGym = (() => {
            let best: any = null
            gymSessions.filter((s: any) => (s.date || '') >= yearStart).forEach((s: any) => {
              ;(s.exercises || []).forEach((ex: any) => {
                if (ex.weight && (!best || parseFloat(ex.weight) > parseFloat(best.weight))) best = ex
              })
            })
            return best
          })()
          
          return (
            <div style={{ padding: '0 24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>
                {isEndOfYear ? '🎉' : '📊'} {isEndOfYear ? 'Year in Review' : 'Monthly Recap'}
              </h2>
              <div onClick={() => { setRecapType(isEndOfYear ? 'yearly' : 'monthly'); setShowRecap(true) }} style={{ background: 'linear-gradient(135deg, #13131f, #17172a)', border: '1px solid #f59e0b25', borderLeft: '4px solid #f59e0b', borderRadius: '16px', padding: '18px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{isEndOfYear ? '🏆' : '📅'}</span>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '15px' }}>
                      {isEndOfYear ? `${now.getFullYear()} Highlights` : `${now.toLocaleString('default', { month: 'long' })} Recap`}
                    </div>
                    <div style={{ color: '#666', fontSize: '12px' }}>
                      {isEndOfYear ? yearlySessions.length : monthlySessions.length} sessions · {isEndOfYear ? yearlyDistance.toFixed(0) : monthlyDistance.toFixed(0)}km · {monthlySports} sports
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: '#f59e0b15', border: '1px solid #f59e0b30', borderRadius: '20px', color: '#f59e0b', padding: '5px 10px', fontSize: '11px', fontWeight: '700' }}>
                    {isEndOfYear ? 'View Full Review →' : 'See Details →'}
                  </span>
                </div>
              </div>
            </div>
          )
        })()}
 
 {/* AI Coach */}
 <div style={{ padding: '0 24px', marginBottom: '24px' }}>
          <div onClick={() => setShowAICoach(true)} style={{ background: 'linear-gradient(135deg, #a855f720, #06b6d420)', border: '1px solid #a855f730', borderRadius: '16px', padding: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '15px' }}>AI Coach</div>
              <div style={{ color: '#aaa', fontSize: '12px', marginTop: '2px' }}>Ask about your training, get personalised advice</div>
            </div>
            <div style={{ color: '#a855f7', fontSize: '20px' }}>→</div>
          </div>
        </div>
 
 {/* Quick Stats Row */}
 {!hiddenWidgets.includes('stats') && (
        <div style={{ padding: '0 24px', marginBottom: '24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '0', right: '24px', fontSize: '12px', color: '#444', cursor: 'pointer', zIndex: 10 }} onClick={() => { const newHidden = [...hiddenWidgets, 'stats']; setHiddenWidgets(newHidden); localStorage.setItem('hiddenWidgets', JSON.stringify(newHidden)); }}>✕</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
            {[
              { label: 'This Week', value: totalSessions, color: '#a855f7', emoji: '📅' },
              { label: 'Streak', value: `${currentStreak}d`, color: '#ef4444', emoji: '🔥' },
              { label: 'Sports', value: (() => {
                let count = 0
                if (footballSessions.length > 0) count++
                if (gymSessions.length > 0) count++
                if (tennisSessions.length > 0) count++
                if (runningSessions.length > 0) count++
                if (swimmingSessions.length > 0) count++
                if (basketballSessions.length > 0) count++
                if (boxingSessions.length > 0) count++
                if (cyclingSessions.length > 0) count++
                if (golfSessions.length > 0) count++
                if (rugbySessions.length > 0) count++
                if (cricketSessions.length > 0) count++
                return count
              })(), color: '#22c55e', emoji: '🏅' },
              { label: 'Total', value: (footballSessions.length + gymSessions.length + tennisSessions.length + runningSessions.length + swimmingSessions.length + basketballSessions.length + boxingSessions.length + cyclingSessions.length + golfSessions.length + rugbySessions.length + cricketSessions.length), color: '#06b6d4', emoji: '📊' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}20`, borderRadius: '14px', padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>{stat.emoji}</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '9px', color: '#555', marginTop: '2px', fontWeight: '600' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        )}
        
        {currentStreak >= 3 && (
        <div style={{ padding: '0 24px', marginBottom: '24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #ef444415, #f9731610)', border: '1px solid #ef444430', borderLeft: '4px solid #ef4444', borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ef444420', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '16px' }}>{currentStreak} Day Streak!</div>
              <div style={{ color: '#aaa', fontSize: '13px', marginTop: '2px' }}>
                {streakFreezes > 0 
                  ? `You have ${streakFreezes} streak freeze${streakFreezes > 1 ? 's' : ''} saved. ${freezeUsedThisWeek ? 'Used one this week.' : 'Protected if you miss a day!'}`
                  : 'Keep it going! Earn a freeze at 7 days.'}
              </div>
            </div>
            <div style={{ fontSize: '22px' }}>{streakFreezes > 0 ? '🧊' : '💪'}</div>
          </div>
        </div>
      )}
        
        

        
        
        {/* Weekly Challenges */}
        {(() => {
          const allSessions = [
            ...tennisSessions, ...runningSessions, ...swimmingSessions,
            ...basketballSessions, ...boxingSessions, ...cyclingSessions,
            ...golfSessions, ...rugbySessions, ...cricketSessions, ...footballSessions
          ]
          const thisWeekSessions = allSessions.filter((s: any) => {
            const dateStr = s.date || s.created_at?.split('T')[0]
            return dateStr && dateStr >= weekStart
          })
          const sportsLoggedThisWeek = new Set()
          if (tennisSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Tennis')
          if (runningSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Running')
          if (swimmingSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Swimming')
          if (basketballSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Basketball')
          if (boxingSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Boxing')
          if (cyclingSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Cycling')
          if (golfSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Golf')
          if (rugbySessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Rugby')
          if (cricketSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Cricket')
          if (footballSessions.some((s: any) => (s.date || '') >= weekStart)) sportsLoggedThisWeek.add('Football')

          const longestRunThisWeek = runningSessions
            .filter((s: any) => (s.date || '') >= weekStart)
            .reduce((max: number, s: any) => Math.max(max, s.distance || 0), 0)

          const challenges = [
            {
              title: 'Log 3 Sessions',
              desc: 'Complete any 3 sessions this week',
              emoji: '🔥',
              color: '#ef4444',
              progress: Math.min(thisWeekSessions.length, 3),
              target: 3,
            },
            {
              title: 'Try a New Sport',
              desc: 'Log 2 different sports this week',
              emoji: '🎯',
              color: '#06b6d4',
              progress: Math.min(sportsLoggedThisWeek.size, 2),
              target: 2,
            },
            {
              title: 'Go for a Run',
              desc: 'Log at least one run this week',
              emoji: '🏃',
              color: '#a855f7',
              progress: longestRunThisWeek > 0 ? 1 : 0,
              target: 1,
            },
          ]

          return (
            <div style={{ padding: '0 24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Weekly Challenges</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {challenges.map((c) => {
                  const complete = c.progress >= c.target
                  return (
                    <div key={c.title} style={{ background: '#13131f', border: `1px solid ${complete ? c.color + '50' : '#1e1e30'}`, borderLeft: `4px solid ${complete ? c.color : '#333'}`, borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0, opacity: complete ? 1 : 0.6 }}>
                        {complete ? '✅' : c.emoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '800', fontSize: '14px' }}>{c.title}</div>
                        <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>{c.desc}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                          <div style={{ flex: 1, height: '5px', background: '#1e1e30', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${(c.progress / c.target) * 100}%`, height: '100%', background: c.color, borderRadius: '4px' }} />
                          </div>
                          <span style={{ fontSize: '10px', color: c.color, fontWeight: '700' }}>{c.progress}/{c.target}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* This Week Sports */}
        <div style={{ padding: '0 24px 24px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '14px',
            }}
          >
            This Week
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {sports
  .filter((s) => s.available)
  .map((sport) => {
    const isFavourite = onboardingSports.includes(sport.name)
    return (
    <div
      key={sport.name}
      onClick={() => setActiveNav(sport.name.toLowerCase() + '-hub')}
      onTouchStart={() => setActiveNav(sport.name.toLowerCase() + '-hub')}
      style={{
        minWidth: '80px',
        background: isFavourite ? `${sport.color}15` : '#13131f',
        border: `1.5px solid ${isFavourite ? sport.color : sport.color}40`,
        borderRadius: '16px',
        padding: '14px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        boxShadow: `0 0 12px ${sport.color}20`,
      }}
    >
      <span style={{ fontSize: '24px' }}>{sport.emoji}</span>
      <span
        style={{
          fontSize: '11px',
          color: '#aaa',
          fontWeight: '600',
        }}
      >
        {sport.name}
      </span>
    </div>
  )})}
          </div>
        </div>

        {/* Personal Records Snapshot */}
        {(() => {
          const bestRun = runningSessions.reduce((max: number, s: any) => Math.max(max, s.distance || 0), 0)
          const bestSwim = swimmingSessions.reduce((max: number, s: any) => Math.max(max, s.distance || 0), 0)
          const bestCycle = cyclingSessions.reduce((max: number, s: any) => Math.max(max, s.distance || 0), 0)
          const gymPRs = (() => {
            const prs: Record<string, number> = {}
            gymSessions.forEach((s: any) => {
              ;(s.exercises || []).forEach((ex: any) => {
                if (ex.name && ex.weight && (!prs[ex.name] || parseFloat(ex.weight) > prs[ex.name])) {
                  prs[ex.name] = parseFloat(ex.weight)
                }
              })
            })
            return Object.entries(prs).sort((a, b) => b[1] - a[1]).slice(0, 3)
          })()
          const totalGoals = footballSessions.reduce((sum: number, s: any) => sum + (s.goals || 0), 0)
          const totalBasketballPts = basketballSessions.reduce((sum: number, s: any) => sum + (s.points || 0), 0)
          
          if (bestRun === 0 && bestSwim === 0 && bestCycle === 0 && gymPRs.length === 0 && totalGoals === 0 && totalBasketballPts === 0) return null
          
          return (
            <div style={{ padding: '0 24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Personal Records</h2>
              <div style={{ background: 'linear-gradient(135deg, #13131f, #17172a)', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {bestRun > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🏃 Longest Run</span><span style={{ color: '#06b6d4', fontWeight: '800' }}>{bestRun}km</span></div>}
                  {bestCycle > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🚴 Longest Ride</span><span style={{ color: '#10b981', fontWeight: '800' }}>{bestCycle}km</span></div>}
                  {bestSwim > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🏊 Longest Swim</span><span style={{ color: '#3b82f6', fontWeight: '800' }}>{bestSwim}m</span></div>}
                  {totalGoals > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>⚽ Total Goals</span><span style={{ color: '#22c55e', fontWeight: '800' }}>{totalGoals}</span></div>}
                  {totalBasketballPts > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🏀 Total Points</span><span style={{ color: '#f97316', fontWeight: '800' }}>{totalBasketballPts}</span></div>}
                  {gymPRs.map(([name, weight]: any) => (
                    <div key={name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🏋️ {name} PR</span><span style={{ color: '#a855f7', fontWeight: '800' }}>{weight}kg</span></div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}
        
        {/* Sport Goals */}
        {Object.keys(sportGoals).length > 0 && (
          <div style={{ padding: '0 24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Your Goals</h2>
              <button onClick={() => setShowSportGoalSetter(true)} style={{ background: 'none', border: '1px solid #a855f740', borderRadius: '20px', color: '#a855f7', padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>+ Set Goal</button>
            </div>
            {Object.entries(sportGoals).map(([key, target]: any) => {
              const [sportName, metric] = key.split('_')
              const sportData = sports.find(s => s.name === sportName)
              const color = sportData?.color || '#a855f7'
              const emoji = sportData?.emoji || '🎯'
              let progress = 0
              if (sportName === 'Running') progress = runningSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
              else if (sportName === 'Cycling') progress = cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
              else if (sportName === 'Swimming') progress = swimmingSessions.reduce((sum: number, s: any) => sum + ((s.distance || 0) / 1000), 0)
              else if (sportName === 'Gym') progress = gymSessions.length
              else if (sportName === 'Football') progress = footballSessions.length
              else progress = tennisSessions.length + basketballSessions.length + boxingSessions.length + golfSessions.length + rugbySessions.length + cricketSessions.length
              const pct = Math.min(Math.round((progress / target) * 100), 100)
              return (
                <div key={key} style={{ background: '#13131f', border: `1px solid ${color}25`, borderLeft: `4px solid ${color}`, borderRadius: '14px', padding: '14px 16px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{emoji}</span>
                      <span style={{ fontWeight: '700', fontSize: '14px' }}>{sportName}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: color, fontWeight: '800' }}>{progress}/{target} {metric}</span>
                  </div>
                  <div style={{ height: '6px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: pct >= 100 ? '#22c55e' : color, borderRadius: '999px' }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {Object.keys(sportGoals).length === 0 && (
          <div style={{ padding: '0 24px', marginBottom: '24px' }}>
            <div onClick={() => setShowSportGoalSetter(true)} style={{ background: '#13131f', border: '1px dashed #2a2a40', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#a855f7' }}>Set a Goal</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>e.g. Run 50km, 10 gym sessions</div>
            </div>
          </div>
        )}
        
        {/* Personal Records Snapshot */}
        {(() => {
          const bestRun = runningSessions.reduce((max: number, s: any) => Math.max(max, s.distance || 0), 0)
          const bestSwim = swimmingSessions.reduce((max: number, s: any) => Math.max(max, s.distance || 0), 0)
          const bestCycle = cyclingSessions.reduce((max: number, s: any) => Math.max(max, s.distance || 0), 0)
          const gymPRs: [string, number][] = (() => {
            const prs: Record<string, number> = {}
            gymSessions.forEach((s: any) => {
              ;(s.exercises || []).forEach((ex: any) => {
                if (ex.name && ex.weight && (!prs[ex.name] || parseFloat(ex.weight) > prs[ex.name])) {
                  prs[ex.name] = parseFloat(ex.weight)
                }
              })
            })
            return Object.entries(prs).sort((a, b) => b[1] - a[1]).slice(0, 3)
          })()
          const totalGoals = footballSessions.reduce((sum: number, s: any) => sum + (s.goals || 0), 0)
          const totalBasketballPts = basketballSessions.reduce((sum: number, s: any) => sum + (s.points || 0), 0)
          
          if (bestRun === 0 && bestSwim === 0 && bestCycle === 0 && gymPRs.length === 0 && totalGoals === 0 && totalBasketballPts === 0) return null
          
          return (
            <div style={{ padding: '0 24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Personal Records</h2>
              <div style={{ background: 'linear-gradient(135deg, #13131f, #17172a)', border: '1px solid #eab30825', borderLeft: '4px solid #eab308', borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {bestRun > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🏃 Longest Run</span><span style={{ color: '#06b6d4', fontWeight: '800' }}>{bestRun}km</span></div>}
                  {bestCycle > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🚴 Longest Ride</span><span style={{ color: '#10b981', fontWeight: '800' }}>{bestCycle}km</span></div>}
                  {bestSwim > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🏊 Longest Swim</span><span style={{ color: '#3b82f6', fontWeight: '800' }}>{bestSwim}m</span></div>}
                  {totalGoals > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>⚽ Total Goals</span><span style={{ color: '#22c55e', fontWeight: '800' }}>{totalGoals}</span></div>}
                  {totalBasketballPts > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🏀 Total Points</span><span style={{ color: '#f97316', fontWeight: '800' }}>{totalBasketballPts}</span></div>}
                  {gymPRs.map(([name, weight]: any) => (
                    <div key={name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#aaa' }}>🏋️ {name} PR</span><span style={{ color: '#a855f7', fontWeight: '800' }}>{weight}kg</span></div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}
        
        {/* Weekly Summary */}
        {(() => {
          if (totalSessions === 0) return null
          const sportsThisWeek = new Set<string>()
          if (tennisSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Tennis')
          if (runningSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Running')
          if (swimmingSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Swimming')
          if (basketballSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Basketball')
          if (boxingSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Boxing')
          if (cyclingSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Cycling')
          if (footballSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Football')
          if (golfSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Golf')
          if (rugbySessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Rugby')
          if (cricketSessions.some((s: any) => (s.date || '') >= weekStart)) sportsThisWeek.add('Cricket')
          
          const weekDistance = runningSessions.filter((s: any) => (s.date || '') >= weekStart).reduce((sum: number, s: any) => sum + (s.distance || 0), 0) +
            cyclingSessions.filter((s: any) => (s.date || '') >= weekStart).reduce((sum: number, s: any) => sum + (s.distance || 0), 0) +
            swimmingSessions.filter((s: any) => (s.date || '') >= weekStart).reduce((sum: number, s: any) => sum + ((s.distance || 0) / 1000), 0)

          return (
            <div style={{ padding: '0 24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Weekly Summary</h2>
              <div style={{ background: 'linear-gradient(135deg, #13131f, #17172a)', border: '1px solid #22c55e25', borderLeft: '4px solid #22c55e', borderRadius: '16px', padding: '18px' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', marginBottom: '12px' }}>This week you've done:</div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#a855f715', border: '1px solid #a855f730', borderRadius: '20px', color: '#a855f7', padding: '6px 12px', fontSize: '12px', fontWeight: '700' }}>📅 {totalSessions} sessions</span>
                  <span style={{ background: '#22c55e15', border: '1px solid #22c55e30', borderRadius: '20px', color: '#22c55e', padding: '6px 12px', fontSize: '12px', fontWeight: '700' }}>🏅 {sportsThisWeek.size} sports</span>
                  {weekDistance > 0 && <span style={{ background: '#06b6d415', border: '1px solid #06b6d430', borderRadius: '20px', color: '#06b6d4', padding: '6px 12px', fontSize: '12px', fontWeight: '700' }}>📍 {weekDistance.toFixed(1)}km</span>}
                </div>
              </div>
            </div>
          )
        })()}
        
        {/* Sport Goals */}
        {Object.keys(sportGoals).length > 0 && (
          <div style={{ padding: '0 24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Your Goals</h2>
              <button onClick={() => setShowSportGoalSetter(true)} style={{ background: 'none', border: '1px solid #a855f740', borderRadius: '20px', color: '#a855f7', padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>+ Set Goal</button>
            </div>
            {Object.entries(sportGoals).map(([key, target]: any) => {
              const [sport, metric] = key.split('_')
              const sportData = sports.find(s => s.name === sport)
              const color = sportData?.color || '#a855f7'
              const emoji = sportData?.emoji || '🎯'
              
              let progress = 0
              if (sport === 'Running') progress = runningSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
              else if (sport === 'Cycling') progress = cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
              else if (sport === 'Swimming') progress = swimmingSessions.reduce((sum: number, s: any) => sum + ((s.distance || 0) / 1000), 0)
              else if (sport === 'Gym') progress = gymSessions.length
              else if (sport === 'Football') progress = footballSessions.length
              else progress = (tennisSessions.length + basketballSessions.length + boxingSessions.length + golfSessions.length + rugbySessions.length + cricketSessions.length)
              
              const pct = Math.min(Math.round((progress / target) * 100), 100)
              
              return (
                <div key={key} style={{ background: '#13131f', border: `1px solid ${color}25`, borderLeft: `4px solid ${color}`, borderRadius: '14px', padding: '14px 16px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{emoji}</span>
                      <span style={{ fontWeight: '700', fontSize: '14px' }}>{sport}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: color, fontWeight: '800' }}>{progress}/{target} {metric}</span>
                  </div>
                  <div style={{ height: '6px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: pct >= 100 ? '#22c55e' : color, borderRadius: '999px', transition: 'width 0.5s' }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {Object.keys(sportGoals).length === 0 && (
          <div style={{ padding: '0 24px', marginBottom: '24px' }}>
            <div onClick={() => setShowSportGoalSetter(true)} style={{ background: '#13131f', border: '1px dashed #2a2a40', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#a855f7' }}>Set a Goal</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>e.g. Run 50km, 10 gym sessions</div>
            </div>
          </div>
        )}
        
        {/* Social Challenges */}
        <div style={{ padding: '0 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Challenges</h2>
            <button onClick={() => setShowCreateChallenge(true)} style={{ background: 'none', border: '1px solid #f59e0b40', borderRadius: '20px', color: '#f59e0b', padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>+ Create</button>
          </div>
          
          {challenges.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {challenges.map((challenge: any) => {
                const progress = userChallengeProgress[challenge.id] || 0
                const pct = Math.min(Math.round((progress / challenge.target) * 100), 100)
                const leaderboard = challengeLeaderboard[challenge.id] || []
                const showLB = expandedChallenge === challenge.id
                return (
                  <div key={challenge.id}>
                    <div onClick={() => setExpandedChallenge(expandedChallenge === challenge.id ? null : challenge.id)} style={{ background: 'linear-gradient(135deg, #13131f, #17172a)', border: `1px solid ${challenge.color}30`, borderLeft: `4px solid ${challenge.color}`, borderRadius: '14px', padding: '14px', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '22px' }}>{challenge.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '13px' }}>{challenge.title}</div>
                          <div style={{ color: '#666', fontSize: '11px' }}>{challenge.sport} · {leaderboard.length} participants · {progress}/{challenge.target} {challenge.metric}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px', fontWeight: '800', color: challenge.color }}>{pct}%</span>
                          <span style={{ color: '#444', fontSize: '14px' }}>{showLB ? '▲' : '▼'}</span>
                        </div>
                      </div>
                      <div style={{ height: '4px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: pct >= 100 ? '#22c55e' : challenge.color, borderRadius: '999px' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                        <button onClick={(e) => { e.stopPropagation(); joinChallenge(challenge.id) }} style={{ background: `${challenge.color}15`, border: `1px solid ${challenge.color}40`, borderRadius: '6px', color: challenge.color, padding: '4px 8px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>Join</button>
                        <button onClick={(e) => { e.stopPropagation(); leaveChallenge(challenge.id) }} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '6px', color: '#ef4444', padding: '4px 8px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>Leave</button>
                      </div>
                    </div>
                    
                    {showLB && (
                      <div style={{ background: '#0a0a0f', border: `1px solid ${challenge.color}20`, borderRadius: '12px', padding: '12px', marginTop: '6px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: challenge.color, marginBottom: '8px' }}>🏆 LEADERBOARD</div>
                        {leaderboard.length === 0 ? (
                          <div style={{ color: '#666', fontSize: '11px', textAlign: 'center', padding: '8px' }}>No participants yet. Be the first!</div>
                        ) : (
                          leaderboard.slice(0, 10).map((p: any, i: number) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: i < leaderboard.length - 1 ? '1px solid #1e1e3020' : 'none' }}>
                              <span style={{ width: '20px', fontWeight: '800', fontSize: '12px', color: i === 0 ? '#f59e0b' : i === 1 ? '#aaa' : i === 2 ? '#cd7f32' : '#666' }}>#{i + 1}</span>
                              <span style={{ flex: 1, fontSize: '12px', color: '#ccc' }}>{p.username}</span>
                              <span style={{ fontSize: '12px', fontWeight: '700', color: challenge.color }}>{p.progress} {challenge.metric}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div onClick={() => setShowCreateChallenge(true)} style={{ background: '#13131f', border: '1px dashed #2a2a40', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏆</div>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#f59e0b' }}>Join a Challenge</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>Most km, 30-day streak, 1000 reps and more</div>
            </div>
          )}
        </div>
        
        
        {/* Training Programs */}
        <div style={{ padding: '0 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Training Programs</h2>
          </div>
          
          {activePrograms.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activePrograms.map((program: any) => {
                const progProgress = programProgress[program.id] || {}
                const completed = Object.keys(progProgress).filter(k => progProgress[program.id]?.[k]).length
                const pct = Math.round((completed / Math.max(program.sessions.length, 1)) * 100)
                return (
                  <div key={program.id} onClick={() => { setSelectedProgramDetail(program); setShowProgramDetail(true) }} style={{ background: 'linear-gradient(135deg, #13131f, #17172a)', border: `1px solid ${program.color}30`, borderLeft: `4px solid ${program.color}`, borderRadius: '14px', padding: '14px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '22px' }}>{program.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '13px' }}>{program.title}</div>
                        <div style={{ color: '#666', fontSize: '11px' }}>{completed}/{program.sessions.length} done · {pct}%</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); const newPrograms = activePrograms.filter((p: any) => p.id !== program.id); setActivePrograms(newPrograms); const newProgress = { ...programProgress }; delete newProgress[program.id]; setProgramProgress(newProgress); localStorage.setItem('activePrograms', JSON.stringify(newPrograms)); localStorage.setItem('programProgress', JSON.stringify(newProgress)); }} style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: '6px', color: '#ef4444', padding: '4px 8px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>✕</button>
                    </div>
                    <div style={{ height: '4px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: program.color, borderRadius: '999px' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div onClick={() => setShowProgramModal(true)} style={{ background: '#13131f', border: '1px dashed #2a2a40', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#a855f7' }}>Start a Training Program</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>Couch to 5K, Strength Foundation, Swim Fit</div>
            </div>
          )}
        </div>
        
        {/* Suggested Workouts */}
        <div style={{ padding: '0 24px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '14px',
            }}
          >
            Suggested Workouts
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {suggestedWorkouts.map((workout) => (
              <div
                key={workout.title}
                onClick={() => setActiveNav(workout.nav)}
                onTouchStart={() => setActiveNav(workout.nav)}
                style={{
                  background: '#13131f',
                  border: '1px solid #1e1e30',
                  borderLeft: '3px solid #a855f7',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: '#1a1a2e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0,
                  }}
                >
                  {workout.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>
                    {workout.title}
                  </div>
                  <div
                    style={{
                      color: '#666',
                      fontSize: '13px',
                      marginTop: '2px',
                    }}
                  >
                    {workout.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            
            {onboardingStep === 0 && (
              <div>
                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 24px', boxShadow: '0 0 40px #a855f750' }}>🏅</div>
                <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 8px', color: 'white' }}>Welcome to SportSync</h1>
                <p style={{ color: '#aaa', fontSize: '15px', margin: '0 0 32px', lineHeight: '1.6' }}>Track every sport. Own every session. Your all-in-one training home.</p>
                <button onClick={() => setOnboardingStep(1)} style={{ width: '100%', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 20px #a855f740' }}>Get Started</button>
              </div>
            )}

            {onboardingStep === 1 && (
              <div>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏅</div>
                <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px', color: 'white' }}>What sports do you play?</h2>
                <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 24px' }}>Select all that apply. You can add more later.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
                  {sports.filter(s => s.available).map((sport) => {
                    const selected = onboardingSports.includes(sport.name)
                    return (
                      <button key={sport.name} onClick={() => {
                        if (selected) setOnboardingSports(onboardingSports.filter(s => s !== sport.name))
                        else setOnboardingSports([...onboardingSports, sport.name])
                      }} style={{
                        background: selected ? `${sport.color}20` : '#13131f',
                        border: `2px solid ${selected ? sport.color : '#1e1e30'}`,
                        borderRadius: '14px',
                        padding: '14px 10px',
                        color: selected ? sport.color : '#666',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: selected ? `0 0 16px ${sport.color}30` : 'none',
                      }}>
                        <span style={{ fontSize: '24px' }}>{sport.emoji}</span>
                        <span style={{ fontSize: '11px', fontWeight: '700' }}>{sport.name}</span>
                      </button>
                    )
                  })}
                </div>
                <button onClick={() => setOnboardingStep(2)} disabled={onboardingSports.length === 0} style={{ width: '100%', background: onboardingSports.length === 0 ? '#1e1e30' : 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: onboardingSports.length === 0 ? 'default' : 'pointer' }}>Continue →</button>
                <button onClick={() => setOnboardingStep(2)} style={{ background: 'none', border: 'none', color: '#555', padding: '12px', fontSize: '13px', cursor: 'pointer', marginTop: '8px' }}>Skip for now</button>
              </div>
            )}

            {onboardingStep === 2 && (
              <div>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎯</div>
                <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px', color: 'white' }}>Set your weekly target</h2>
                <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 24px' }}>How many sessions per week do you want to complete?</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
                  {[3, 4, 5, 6, 7].map((n) => (
                    <button key={n} onClick={() => setOnboardingGoal(n.toString())} style={{
                      width: '52px', height: '52px', borderRadius: '14px',
                      background: onboardingGoal === n.toString() ? '#a855f720' : '#13131f',
                      border: `2px solid ${onboardingGoal === n.toString() ? '#a855f7' : '#1e1e30'}`,
                      color: onboardingGoal === n.toString() ? '#a855f7' : '#666',
                      fontSize: '20px', fontWeight: '800', cursor: 'pointer',
                    }}>{n}</button>
                  ))}
                </div>
                <button onClick={() => {
                  setWeeklyGoalTarget(parseInt(onboardingGoal))
                  localStorage.setItem('onboardingSports', JSON.stringify(onboardingSports))
                  setOnboardingStep(3)
                }} style={{ width: '100%', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>Set Goal →</button>
              </div>
            )}

            {onboardingStep === 3 && (
              <div>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
                <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px', color: 'white' }}>You are all set!</h2>
                <p style={{ color: '#aaa', fontSize: '14px', margin: '0 0 8px', lineHeight: '1.6' }}>
                  {onboardingSports.length > 0 ? `Tracking ${onboardingSports.slice(0, 3).join(', ')}${onboardingSports.length > 3 ? ` and ${onboardingSports.length - 3} more` : ''}` : 'Ready to explore all sports'}
                </p>
                <p style={{ color: '#666', fontSize: '13px', margin: '0 0 24px' }}>Weekly goal: {onboardingGoal} sessions</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                  {onboardingSports.slice(0, 5).map(s => {
                    const sportData = sports.find(sp => sp.name === s)
                    return <span key={s} style={{ fontSize: '28px' }}>{sportData?.emoji}</span>
                  })}
                </div>
                <button onClick={() => {
                  localStorage.setItem('onboardingComplete', 'true')
                  setShowOnboarding(false)
                  if (onboardingSports.length > 0) {
                    const firstSport = onboardingSports[0].toLowerCase()
                    const hubMap: Record<string, string> = { football: 'football-hub', gym: 'gym-hub', tennis: 'tennis-hub', running: 'running-hub', swimming: 'swimming-hub', basketball: 'basketball-hub', boxing: 'boxing-hub', cycling: 'cycling-hub', golf: 'golf-hub', rugby: 'rugby-hub', cricket: 'cricket-hub' }
                    setActiveNav(hubMap[firstSport] || 'track')
                  }
                }} style={{ width: '100%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 20px #22c55e40' }}>Start Training →</button>
              </div>
            )}

            {/* Step indicators */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '32px' }}>
              {[0, 1, 2, 3].map((step) => (
                <div key={step} style={{
                  width: onboardingStep === step ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: onboardingStep === step ? '#a855f7' : onboardingStep > step ? '#a855f750' : '#1e1e30',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {showConfetti && (
        <>
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999, overflow: 'hidden' }}>
            {[...Array(40)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: '-20px',
                left: `${Math.random() * 100}%`,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: confettiColors[i % confettiColors.length],
                animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.8}s`,
              }} />
            ))}
          </div>
          {prToast && (
            <div style={{
              position: 'fixed',
              top: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: '#13131f',
              border: `1.5px solid ${prToast.color}50`,
              borderLeft: `4px solid ${prToast.color}`,
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: `0 8px 32px ${prToast.color}30`,
              animation: 'toastIn 0.3s ease-out',
              maxWidth: '380px',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${prToast.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                {prToast.emoji}
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: 'white' }}>{prToast.title}</div>
                <div style={{ color: '#aaa', fontSize: '13px', marginTop: '2px' }}>{prToast.detail}</div>
              </div>
            </div>
          )}
        </>
      )}

{showComparison && sessionComparison && (
            <div style={{
              position: 'fixed',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: '#13131f',
              border: `1.5px solid ${sessionComparison.color}50`,
              borderLeft: `4px solid ${sessionComparison.color}`,
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: `0 8px 32px ${sessionComparison.color}30`,
              animation: 'toastIn 0.3s ease-out',
              maxWidth: '380px',
              width: '90%',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${sessionComparison.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                {sessionComparison.emoji}
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '14px', color: 'white' }}>{sessionComparison.title}</div>
                <div style={{ color: '#aaa', fontSize: '12px', marginTop: '2px' }}>{sessionComparison.detail}</div>
              </div>
              <button onClick={() => setShowComparison(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }}>×</button>
            </div>
          )}
      
      {/* Quick-Log FAB */}
      {!showQuickLog && (
        <button
          onClick={() => { playHaptic(); playSound('click'); setShowQuickLog(true) }}
          style={{
            position: 'fixed',
            bottom: '90px',
            right: 'calc(50% - 195px)',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
            border: 'none',
            color: 'white',
            fontSize: '26px',
            fontWeight: '300',
            cursor: 'pointer',
            zIndex: 150,
            boxShadow: '0 4px 20px rgba(168,85,247,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +
        </button>
      )}

{!showTimer && (
        <button
          onClick={() => setShowTimer(true)}
          style={{
            position: 'fixed',
            bottom: '210px',
            right: 'calc(50% - 195px)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: timerRunning ? '#22c55e' : '#13131f',
            border: '1.5px solid #f59e0b40',
            color: timerRunning ? 'white' : '#f59e0b',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 150,
            boxShadow: timerRunning ? '0 4px 16px rgba(34,197,94,0.4)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: timerRunning ? 'pulse 2s infinite' : 'none',
          }}
        >
          {timerRunning ? formatTime(timerSeconds) : '⏱️'}
        </button>
      )}

<button
          onClick={startVoiceRecognition}
          disabled={isListening}
          style={{
            position: 'fixed',
            bottom: '150px',
            right: 'calc(50% - 195px)',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: isListening ? '#ef4444' : 'linear-gradient(135deg, #22c55e, #16a34a)',
            border: 'none',
            color: 'white',
            fontSize: '22px',
            fontWeight: '300',
            cursor: isListening ? 'default' : 'pointer',
            zIndex: 150,
            boxShadow: isListening ? '0 4px 20px rgba(239,68,68,0.4)' : '0 4px 20px rgba(34,197,94,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isListening ? 'pulse 1s infinite' : 'none',
          }}
        >
          {isListening ? '🎙️' : '🎤'}
        </button>

      {/* Quick-Log Modal */}
      {showQuickLog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '430px', margin: '0 auto', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Quick Log</h2>
              <button onClick={() => { setShowQuickLog(false); setQuickLogSport('') }} style={{ background: 'none', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>

            {!quickLogSport ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { sport: 'Running', emoji: '🏃', color: '#06b6d4' },
                  { sport: 'Gym', emoji: '🏋️', color: '#a855f7' },
                  { sport: 'Football', emoji: '⚽', color: '#22c55e' },
                  { sport: 'Tennis', emoji: '🎾', color: '#eab308' },
                  { sport: 'Swimming', emoji: '🏊', color: '#3b82f6' },
                  { sport: 'Basketball', emoji: '🏀', color: '#f97316' },
                  { sport: 'Boxing', emoji: '🥊', color: '#ef4444' },
                  { sport: 'Cycling', emoji: '🚴', color: '#10b981' },
                  { sport: 'Golf', emoji: '⛳', color: '#84cc16' },
                  { sport: 'Rugby', emoji: '🏉', color: '#f59e0b' },
                  { sport: 'Cricket', emoji: '🏏', color: '#06b6d4' },
                ].map((s) => (
                  <button
                    key={s.sport}
                    onClick={() => setQuickLogSport(s.sport)}
                    style={{
                      background: '#0a0a0f',
                      border: `1.5px solid ${s.color}30`,
                      borderRadius: '14px',
                      padding: '16px 12px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>{s.emoji}</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: s.color }}>{s.sport}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setQuickLogSport('')} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: '0 0 12px' }}>← Back</button>
                
                {quickLogSport === 'Running' && (
                  <QuickRunForm onSave={() => { setShowQuickLog(false); setQuickLogSport('') }} setRunningSessions={setRunningSessions} runningSessions={runningSessions} addSocialPost={addSocialPost} triggerPRToast={triggerPRToast} setRunningPRs={setRunningPRs} runningPRs={runningPRs} />
                )}
                {quickLogSport === 'Gym' && (
                  <QuickGymForm onSave={() => { setShowQuickLog(false); setQuickLogSport('') }} setGymSessions={setGymSessions} gymSessions={gymSessions} addSocialPost={addSocialPost} triggerPRToast={triggerPRToast} />
                )}
                {quickLogSport === 'Swimming' && (
                  <QuickSwimForm onSave={() => { setShowQuickLog(false); setQuickLogSport('') }} setSwimmingSessions={setSwimmingSessions} swimmingSessions={swimmingSessions} addSocialPost={addSocialPost} triggerPRToast={triggerPRToast} setSwimmingPRs={setSwimmingPRs} swimmingPRs={swimmingPRs} />
                )}
                {['Football', 'Tennis', 'Basketball', 'Boxing', 'Cycling', 'Golf', 'Rugby', 'Cricket'].includes(quickLogSport) && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>
                      {quickLogSport === 'Football' ? '⚽' : quickLogSport === 'Tennis' ? '🎾' : quickLogSport === 'Basketball' ? '🏀' : quickLogSport === 'Boxing' ? '🥊' : quickLogSport === 'Cycling' ? '🚴' : quickLogSport === 'Golf' ? '⛳' : quickLogSport === 'Rugby' ? '🏉' : '🏏'}
                    </div>
                    <div style={{ color: '#aaa', fontSize: '14px', marginBottom: '16px' }}>Full {quickLogSport} logging requires more detail.</div>
                    <button
                      onClick={() => {
                        setShowQuickLog(false)
                        setQuickLogSport('')
                        const hubMap: Record<string, string> = {
                          Football: 'log-session', Tennis: 'log-tennis-session', Basketball: 'log-basketball',
                          Boxing: 'log-boxing', Cycling: 'log-cycling', Golf: 'log-golf', Rugby: 'log-rugby', Cricket: 'log-cricket'
                        }
                        setActiveNav(hubMap[quickLogSport] || 'track')
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '800',
                        cursor: 'pointer',
                      }}
                    >
                      Go to Full Form →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Sport Goal Setter Modal */}
      {showSportGoalSetter && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '24px' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px', padding: '28px 24px', width: '100%', maxWidth: '340px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px', color: 'white' }}>Set a Goal</h2>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 20px' }}>Choose a sport and target to work toward</p>

            <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>SPORT</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {['Running', 'Cycling', 'Swimming', 'Gym', 'Football'].map((s) => {
                const sportData = sports.find(sp => sp.name === s)
                const color = sportData?.color || '#a855f7'
                return (
                  <button key={s} onClick={() => { setGoalSport(s); setGoalMetric(s === 'Gym' || s === 'Football' ? 'sessions' : 'km') }} style={{ background: goalSport === s ? `${color}20` : '#0a0a0f', border: `1.5px solid ${goalSport === s ? color : '#1e1e30'}`, borderRadius: '20px', color: goalSport === s ? color : '#666', padding: '7px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>{s}</button>
                )
              })}
            </div>

            <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>METRIC</label>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
              {['km', 'sessions'].map((m) => (
                <button key={m} onClick={() => setGoalMetric(m)} style={{ background: goalMetric === m ? '#a855f720' : '#0a0a0f', border: `1.5px solid ${goalMetric === m ? '#a855f7' : '#1e1e30'}`, borderRadius: '20px', color: goalMetric === m ? '#a855f7' : '#666', padding: '7px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>{m}</button>
              ))}
            </div>

            <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>TARGET</label>
            <input value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} placeholder="50" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', marginBottom: '20px', boxSizing: 'border-box' }} />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowSportGoalSetter(false)} style={{ flex: 1, background: '#1e1e30', border: 'none', borderRadius: '12px', color: '#aaa', padding: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => {
                const key = `${goalSport}_${goalMetric}`
                const newGoals = { ...sportGoals, [key]: parseInt(goalTarget) || 0 }
                setSportGoals(newGoals)
                localStorage.setItem('sportGoals', JSON.stringify(newGoals))
                
                setShowSportGoalSetter(false)
              }} style={{ flex: 2, background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>Set Goal</button>
            </div>
          </div>
        </div>
      )}


      {/* Achievement Share Modal */}
      {showAchievement && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px', padding: '32px 24px', width: '100%', maxWidth: '360px', textAlign: 'center' }}>
            <button onClick={() => setShowAchievement(null)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }}>×</button>
            
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: `${showAchievement.color}20`, border: `3px solid ${showAchievement.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 16px', boxShadow: `0 0 30px ${showAchievement.color}40` }}>
              {showAchievement.emoji}
            </div>
            
            <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 4px' }}>{showAchievement.title}</h2>
            <p style={{ color: '#aaa', fontSize: '14px', margin: '0 0 16px' }}>{showAchievement.detail}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              <div style={{ background: '#0a0a0f', borderRadius: '12px', padding: '12px 8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: showAchievement.color }}>{showAchievement.value}</div>
                <div style={{ fontSize: '10px', color: '#555' }}>{showAchievement.metric}</div>
              </div>
              <div style={{ background: '#0a0a0f', borderRadius: '12px', padding: '12px 8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#22c55e' }}>🏅</div>
                <div style={{ fontSize: '10px', color: '#555' }}>Achievement</div>
              </div>
              <div style={{ background: '#0a0a0f', borderRadius: '12px', padding: '12px 8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#a855f7' }}>{new Date().toLocaleString('default', { month: 'short', day: 'numeric' })}</div>
                <div style={{ fontSize: '10px', color: '#555' }}>Date Earned</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => {
                const text = `🏆 I just earned "${showAchievement.title}" on SportSync! ${showAchievement.detail} ${showAchievement.metric}: ${showAchievement.value} #SportSync`
                if (navigator.share) {
                  navigator.share({ title: showAchievement.title, text })
                } else {
                  navigator.clipboard.writeText(text)
                  alert('Copied to clipboard! Share it anywhere.')
                }
              }} style={{ flex: 1, background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                📤 Share
              </button>
              <button onClick={() => {
                const text = `🏆 Just earned "${showAchievement.title}" on SportSync! ${showAchievement.detail}`
                setActiveNav('social')
                setShowAchievement(null)
              }} style={{ flex: 1, background: '#a855f715', border: '1px solid #a855f740', borderRadius: '12px', color: '#a855f7', padding: '14px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                👥 Post to Feed
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Program Selection Modal */}
      
      {/* Program Detail Modal */}
      {showProgramDetail && selectedProgramDetail && (() => { const activeProgram = selectedProgramDetail; const progProgress = programProgress[activeProgram.id] || {}; return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '430px', width: '100%', margin: '0 auto' }}>
            <button onClick={() => setShowProgramDetail(false)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>← Close</button>
            <div style={{ fontWeight: '800', fontSize: '16px' }}>{activeProgram.title}</div>
            <div style={{ width: '50px' }} />
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 40px', maxWidth: '430px', width: '100%', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '36px' }}>{activeProgram.emoji}</span>
              <div>
                <div style={{ fontWeight: '800', fontSize: '18px' }}>{activeProgram.title}</div>
                <div style={{ color: '#666', fontSize: '13px' }}>{activeProgram.duration} · {activeProgram.level} · {activeProgram.sport}</div>
              </div>
            </div>
            
            <div style={{ height: '8px', background: '#0a0a0f', borderRadius: '999px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ width: `${Math.round((Object.keys(programProgress).filter(k => programProgress[k]).length / Math.max(activeProgram.sessions.length, 1)) * 100)}%`, height: '100%', background: activeProgram.color, borderRadius: '999px' }} />
            </div>
            
            {(() => {
              const weeks: Record<number, any[]> = {}
              activeProgram.sessions.forEach((s: any) => {
                if (!weeks[s.week]) weeks[s.week] = []
                weeks[s.week].push(s)
              })
              
              return Object.entries(weeks).map(([week, sessions]: any) => (
                <div key={week} style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: activeProgram.color, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Week {week}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sessions.map((session: any, i: number) => {
                      const sessionKey = `w${week}d${session.day}`
                      const prog = programProgress[selectedProgramDetail.id] || {}
const completed = prog[sessionKey]
                      return (
                        <div key={i} onClick={() => {
                          const newProg = { ...programProgress }
if (!newProg[selectedProgramDetail.id]) newProg[selectedProgramDetail.id] = {}
newProg[selectedProgramDetail.id][sessionKey] = !completed
setProgramProgress(newProg)
localStorage.setItem('programProgress', JSON.stringify(newProg))
                        }} style={{
                          background: completed ? `${activeProgram.color}15` : '#13131f',
                          border: `1px solid ${completed ? activeProgram.color + '50' : '#1e1e30'}`,
                          borderLeft: `4px solid ${completed ? activeProgram.color : '#333'}`,
                          borderRadius: '12px',
                          padding: '14px 16px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}>
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            border: `2px solid ${completed ? activeProgram.color : '#444'}`,
                            background: completed ? activeProgram.color : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', color: 'white', flexShrink: 0,
                          }}>
                            {completed ? '✓' : ''}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '700', fontSize: '13px', color: completed ? '#aaa' : 'white' }}>
                              Day {session.day}: {session.title}
                            </div>
                            <div style={{ color: '#666', fontSize: '11px', marginTop: '2px' }}>
                              {session.detail}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            })()}
          </div>
        </div>
      )})()}
      
      {/* Create Challenge Modal */}
      {showCreateChallenge && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '430px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Create Challenge</h2>
              <button onClick={() => setShowCreateChallenge(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>

            <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>CHALLENGE NAME</label>
            <input value={newChallenge.title} onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })} placeholder="e.g. Run 50km This Month" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', marginBottom: '14px', boxSizing: 'border-box' }} />

            <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>SPORT</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {[
                { sport: 'Running', emoji: '🏃', color: '#06b6d4' },
                { sport: 'Cycling', emoji: '🚴', color: '#10b981' },
                { sport: 'Swimming', emoji: '🏊', color: '#3b82f6' },
                { sport: 'Gym', emoji: '🏋️', color: '#a855f7' },
                { sport: 'Football', emoji: '⚽', color: '#22c55e' },
                { sport: 'All Sports', emoji: '🏅', color: '#f59e0b' },
              ].map((s) => (
                <button key={s.sport} onClick={() => setNewChallenge({ ...newChallenge, sport: s.sport, emoji: s.emoji, color: s.color, metric: s.sport === 'Gym' || s.sport === 'Football' || s.sport === 'All Sports' ? 'sessions' : 'km' })} style={{ background: newChallenge.sport === s.sport ? `${s.color}20` : '#0a0a0f', border: `1.5px solid ${newChallenge.sport === s.sport ? s.color : '#1e1e30'}`, borderRadius: '20px', color: newChallenge.sport === s.sport ? s.color : '#666', padding: '7px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>{s.emoji} {s.sport}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>METRIC</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['km', 'sessions'].map((m) => (
                    <button key={m} onClick={() => setNewChallenge({ ...newChallenge, metric: m })} style={{ flex: 1, background: newChallenge.metric === m ? '#a855f720' : '#0a0a0f', border: `1.5px solid ${newChallenge.metric === m ? '#a855f7' : '#1e1e30'}`, borderRadius: '8px', color: newChallenge.metric === m ? '#a855f7' : '#666', padding: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>{m}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>TARGET</label>
                <input value={newChallenge.target} onChange={(e) => setNewChallenge({ ...newChallenge, target: e.target.value })} placeholder="50" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
              </div>
            </div>

            <button onClick={async () => {
              if (!newChallenge.title.trim() || !newChallenge.target) return
              const { data: { session } } = await supabase.auth.getSession()
              if (!session) return
              
              const { data: newCh } = await supabase.from('challenges').insert({
                title: newChallenge.title,
                sport: newChallenge.sport,
                metric: newChallenge.metric,
                target: parseInt(newChallenge.target) || 0,
                emoji: newChallenge.emoji,
                color: newChallenge.color,
                created_by: session.user.id
              }).select().single()
              
              if (newCh) {
                setChallenges([newCh, ...challenges])
                await joinChallenge(newCh.id)
              }
              setShowCreateChallenge(false)
              setNewChallenge({ title: '', sport: 'Running', metric: 'km', target: '', emoji: '🏃', color: '#06b6d4' })
            }} style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
              Create Challenge
            </button>
          </div>
        </div>
      )}
      
      {/* Recap Modal */}
      {showRecap && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '430px', width: '100%', margin: '0 auto' }}>
            <button onClick={() => setShowRecap(false)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>← Close</button>
            <div style={{ fontWeight: '800', fontSize: '16px' }}>{recapType === 'yearly' ? 'Year in Review' : 'Monthly Recap'}</div>
            <div style={{ width: '50px' }} />
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 40px', maxWidth: '430px', width: '100%', margin: '0 auto' }}>
            {(() => {
              const now = new Date()
              const startDate = recapType === 'yearly' ? new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0] : new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
              
              const allData = [runningSessions, cyclingSessions, swimmingSessions, gymSessions, footballSessions, tennisSessions, basketballSessions, boxingSessions, golfSessions, rugbySessions, cricketSessions].flat()
              const periodSessions = allData.filter((s: any) => (s.date || '') >= startDate)
              const totalSessions = periodSessions.length
              const totalDistance = periodSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
              const sportCount = new Set(periodSessions.map((s: any) => s.sport || s.sessionType || s.runType || s.rideType || s.swimType || 'Other')).size
              const totalGoals = periodSessions.reduce((sum: number, s: any) => sum + (s.goals || 0), 0)
              const totalGymWorkouts = periodSessions.filter((s: any) => s.exercises || s.title).length
              const bestRun = runningSessions.filter((s: any) => (s.date || '') >= startDate).reduce((best: any, s: any) => (s.distance || 0) > (best?.distance || 0) ? s : best, null)
              
              const sportBreakdown: Record<string, number> = {}
              periodSessions.forEach((s: any) => {
                const sport = s.sport || s.sessionType || s.runType || s.rideType || s.swimType || 'Other'
                sportBreakdown[sport] = (sportBreakdown[sport] || 0) + 1
              })
              const topSport = Object.entries(sportBreakdown).sort((a, b) => b[1] - a[1])[0]
              
              return (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ fontSize: '60px', marginBottom: '8px' }}>{recapType === 'yearly' ? '🏆' : '📊'}</div>
                    <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 4px' }}>
                      {recapType === 'yearly' ? now.getFullYear() : now.toLocaleString('default', { month: 'long' })}
                    </h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Your training journey</p>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                    {[
                      { label: 'Total Sessions', value: totalSessions, emoji: '📅', color: '#a855f7' },
                      { label: 'Sports Played', value: sportCount, emoji: '🏅', color: '#22c55e' },
                      { label: 'Distance', value: `${totalDistance.toFixed(0)}km`, emoji: '📍', color: '#06b6d4' },
                      { label: 'Goals Scored', value: totalGoals, emoji: '⚽', color: '#eab308' },
                      { label: 'Gym Sessions', value: totalGymWorkouts, emoji: '🏋️', color: '#a855f7' },
                      { label: 'Top Sport', value: topSport?.[0] || 'N/A', emoji: '⭐', color: '#f59e0b' },
                    ].map((stat) => (
                      <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}20`, borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.emoji}</div>
                        <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                        <div style={{ fontSize: '10px', color: '#555', marginTop: '3px', fontWeight: '600' }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {bestRun && (
                    <div style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                      <div style={{ fontWeight: '800', fontSize: '13px', color: '#06b6d4', marginBottom: '6px' }}>🏃 BEST RUN</div>
                      <div style={{ fontSize: '18px', fontWeight: '800' }}>{bestRun.distance}km</div>
                      <div style={{ color: '#666', fontSize: '12px' }}>{bestRun.pace} · {bestRun.date}</div>
                    </div>
                  )}
                  
                  {sportBreakdown && Object.keys(sportBreakdown).length > 0 && (
                    <div style={{ background: '#13131f', border: '1px solid #a855f725', borderLeft: '4px solid #a855f7', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                      <div style={{ fontWeight: '800', fontSize: '13px', color: '#a855f7', marginBottom: '10px' }}>🏅 SPORT BREAKDOWN</div>
                      {Object.entries(sportBreakdown).sort((a, b) => b[1] - a[1]).map(([sport, count]) => (
                        <div key={sport} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '13px' }}>
                          <span style={{ color: '#aaa' }}>{sport}</span>
                          <span style={{ fontWeight: '700', color: 'white' }}>{count} sessions</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div style={{ background: 'linear-gradient(135deg, #f59e0b10, #f9731610)', border: '1px solid #f59e0b30', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{recapType === 'yearly' ? '🎉' : '💪'}</div>
                    <div style={{ fontWeight: '800', fontSize: '15px', marginBottom: '4px' }}>
                      {recapType === 'yearly' ? 'What a year!' : 'Great month!'}
                    </div>
                    <div style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.5' }}>
                      {totalSessions === 0 
                        ? 'Start logging sessions to see your recap.' 
                        : recapType === 'yearly'
                          ? `You completed ${totalSessions} sessions across ${sportCount} sports. Here's to an even bigger ${now.getFullYear() + 1}!`
                          : `${totalSessions} sessions this month. Keep the momentum going!`
                      }
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
      
      {showProgramModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '430px', margin: '0 auto', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Choose a Program</h2>
              <button onClick={() => setShowProgramModal(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {trainingPrograms.map((program) => (
                <div key={program.id} onClick={() => {
                  const alreadyActive = activePrograms.find((p: any) => p.id === program.id)
                  if (!alreadyActive) {
                    const newPrograms = [...activePrograms, program]
                    setActivePrograms(newPrograms)
                    localStorage.setItem('activePrograms', JSON.stringify(newPrograms))
                  }
                  setShowProgramModal(false)
                }} style={{ background: '#0a0a0f', border: `1px solid ${program.color}25`, borderLeft: `4px solid ${program.color}`, borderRadius: '16px', padding: '18px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${program.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{program.emoji}</div>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '15px' }}>{program.title}</div>
                      <div style={{ color: '#666', fontSize: '12px' }}>{program.duration} · {program.level} · {program.sessions.length} sessions</div>
                    </div>
                  </div>
                  <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.5', margin: 0 }}>{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      
      
      
      {/* Search Modal */}
      {showSearch && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', maxWidth: '430px', width: '100%', margin: '0 auto 16px' }}>
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search sessions, sports, notes..."
              style={{ flex: 1, background: '#13131f', border: '1.5px solid #a855f740', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }}
            />
            <button onClick={() => { setShowSearch(false); setSearchQuery(''); setSearchResults([]) }} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
          </div>
          <div style={{ maxWidth: '430px', width: '100%', margin: '0 auto', overflowY: 'auto', flex: 1 }}>
            {searchQuery && searchResults.length === 0 && (
              <div style={{ textAlign: 'center', color: '#666', marginTop: '40px', fontSize: '14px' }}>No results found</div>
            )}
            {!searchQuery && (
              <div style={{ textAlign: 'center', color: '#555', marginTop: '40px', fontSize: '14px' }}>Search across all your sessions</div>
            )}
            {searchResults.map((result: any, i: number) => (
              <div key={i} onClick={() => { setShowSearch(false); setSearchQuery(''); setSearchResults([]); setActiveNav(result.type === 'football' ? 'football-hub' : result.type === 'gym' ? 'gym-hub' : result.type === 'running' ? 'running-hub' : result.type === 'tennis' ? 'tennis-hub' : 'swimming-hub') }} style={{ background: '#13131f', border: `1px solid ${result.color}25`, borderLeft: `4px solid ${result.color}`, borderRadius: '14px', padding: '14px 16px', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{result.emoji}</span>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>{result.sport} · {result.label}</div>
                  <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>{result.detail}</div>
                  {result.date && <div style={{ color: '#444', fontSize: '11px', marginTop: '2px' }}>{result.date}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      
      {/* Timer Modal */}
      {showTimer && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px', padding: '32px 24px', width: '100%', maxWidth: '340px', textAlign: 'center' }}>
            <button onClick={() => setShowTimer(false)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }}>×</button>
            
            <div style={{ fontSize: '48px', fontWeight: '900', color: timerRunning ? '#22c55e' : 'white', marginBottom: '8px', fontVariantNumeric: 'tabular-nums', letterSpacing: '2px' }}>
              {formatTime(timerSeconds)}
            </div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>
              {timerRunning ? 'Timer running...' : timerSeconds > 0 ? `${getTimerMinutes()} min elapsed` : 'Ready to start'}
            </div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
              {!timerRunning ? (
                <button onClick={startTimer} style={{ flex: 1, background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
                  {timerSeconds > 0 ? '▶ Resume' : '▶ Start'}
                </button>
              ) : (
                <button onClick={pauseTimer} style={{ flex: 1, background: '#f59e0b', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
                  ⏸ Pause
                </button>
              )}
              <button onClick={resetTimer} disabled={timerSeconds === 0} style={{ flex: 1, background: timerSeconds === 0 ? '#1e1e30' : '#ef444415', border: `1px solid ${timerSeconds === 0 ? '#1e1e30' : '#ef444440'}`, borderRadius: '12px', color: timerSeconds === 0 ? '#444' : '#ef4444', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: timerSeconds === 0 ? 'default' : 'pointer' }}>
                ↺ Reset
              </button>
            </div>

            {timerSeconds >= 60 && !timerRunning && (
              <div>
                <div style={{ color: '#aaa', fontSize: '12px', marginBottom: '12px' }}>Log this session:</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[
                    { label: 'Gym', emoji: '🏋️', color: '#a855f7' },
                    { label: 'Run', emoji: '🏃', color: '#06b6d4' },
                    { label: 'Swim', emoji: '🏊', color: '#3b82f6' },
                    { label: 'Other', emoji: '📝', color: '#f59e0b' },
                  ].map((opt) => (
                    <button key={opt.label} onClick={() => {
                      const mins = getTimerMinutes()
                      if (opt.label === 'Run') {
                        setActiveNav('log-run')
                      } else if (opt.label === 'Gym') {
                        setActiveNav('log-workout')
                      } else if (opt.label === 'Swim') {
                        setActiveNav('log-swim')
                      } else {
                        setActiveNav('track')
                      }
                      setShowTimer(false)
                      resetTimer()
                    }} style={{ background: `${opt.color}15`, border: `1px solid ${opt.color}40`, borderRadius: '20px', color: opt.color, padding: '8px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                      {opt.emoji} {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Customize Dashboard Modal */}
      {showCustomize && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '430px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Customize Dashboard</h2>
              <button onClick={() => setShowCustomize(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>Drag to reorder (coming soon) or tap to hide widgets.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'notifications', label: 'Smart Notifications', emoji: '🔔' },
                { id: 'stats', label: 'Quick Stats Row', emoji: '📊' },
                { id: 'streak', label: 'Streak Card', emoji: '🔥' },
                { id: 'challenges', label: 'Challenges', emoji: '🏆' },
                { id: 'goals', label: 'Sport Goals', emoji: '🎯' },
                { id: 'programs', label: 'Training Programs', emoji: '📋' },
                { id: 'recap', label: 'Monthly/Yearly Recap', emoji: '📅' },
                { id: 'weekly', label: 'Weekly Summary', emoji: '📈' },
                { id: 'workouts', label: 'Suggested Workouts', emoji: '💡' },
              ].map((widget) => {
                const isHidden = hiddenWidgets.includes(widget.id)
                return (
                  <div key={widget.id} onClick={() => {
                    if (isHidden) {
                      const newHidden = hiddenWidgets.filter(w => w !== widget.id)
                      setHiddenWidgets(newHidden)
                      localStorage.setItem('hiddenWidgets', JSON.stringify(newHidden))
                    } else {
                      const newHidden = [...hiddenWidgets, widget.id]
                      setHiddenWidgets(newHidden)
                      localStorage.setItem('hiddenWidgets', JSON.stringify(newHidden))
                    }
                  }} style={{ background: isHidden ? '#0a0a0f' : '#13131f', border: `1px solid ${isHidden ? '#1e1e30' : '#a855f730'}`, borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', opacity: isHidden ? 0.5 : 1 }}>
                    <span style={{ fontSize: '20px' }}>{widget.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '14px' }}>{widget.label}</div>
                      <div style={{ color: '#555', fontSize: '11px' }}>{isHidden ? 'Hidden' : 'Visible'}</div>
                    </div>
                    <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: isHidden ? '#333' : '#a855f7', position: 'relative' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: isHidden ? '2px' : 'auto', right: isHidden ? 'auto' : '2px' }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <button onClick={() => { setHiddenWidgets([]); localStorage.setItem('hiddenWidgets', '[]'); setShowCustomize(false); }} style={{ width: '100%', marginTop: '16px', background: '#a855f715', border: '1px solid #a855f740', borderRadius: '12px', color: '#a855f7', padding: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Reset to Default
            </button>
          </div>
        </div>
      )}
      
      {/* AI Coach Modal */}
      {showAICoach && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '430px', width: '100%', margin: '0 auto', borderBottom: '1px solid #1e1e30' }}>
            <button onClick={() => setShowAICoach(false)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>← Close</button>
            <div style={{ fontWeight: '800', fontSize: '16px' }}>🤖 AI Coach</div>
            <button onClick={() => { setCoachMessages([{ role: 'assistant', content: 'Hey! I\'m your AI coach. Ask me anything about your training.' }]); localStorage.setItem('coachMessages', JSON.stringify([{ role: 'assistant', content: 'Hey! I\'m your AI coach. Ask me anything about your training.' }])); }} style={{ background: 'none', border: 'none', color: '#666', fontSize: '12px', cursor: 'pointer' }}>Clear</button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', maxWidth: '430px', width: '100%', margin: '0 auto' }}>
            {coachMessages.map((msg: any, i: number) => (
              <div key={i} style={{ marginBottom: '14px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '85%', background: msg.role === 'user' ? '#a855f7' : '#13131f', border: msg.role === 'user' ? 'none' : '1px solid #1e1e30', borderRadius: '14px', padding: '12px 16px', color: msg.role === 'user' ? 'white' : '#ddd', fontSize: '13px', lineHeight: '1.6' }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {coachLoading && (
              <div style={{ textAlign: 'center', color: '#666', fontSize: '13px', padding: '8px' }}>🤔 Thinking...</div>
            )}
          </div>
          
          <div style={{ padding: '12px 20px 20px', maxWidth: '430px', width: '100%', margin: '0 auto', display: 'flex', gap: '8px' }}>
            <input
              value={coachInput}
              onChange={(e) => setCoachInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && coachInput.trim() && handleCoachMessage()}
              placeholder="Ask your coach anything..."
              style={{ flex: 1, background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '12px 14px', fontSize: '14px', boxSizing: 'border-box' }}
            />
            <button
              onClick={handleCoachMessage}
              disabled={!coachInput.trim() || coachLoading}
              style={{ background: coachInput.trim() ? 'linear-gradient(135deg, #a855f7, #06b6d4)' : '#1e1e30', border: 'none', borderRadius: '12px', color: 'white', padding: '12px 18px', fontSize: '14px', fontWeight: '800', cursor: coachInput.trim() ? 'pointer' : 'default' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      
      {showGoalSetter && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '24px' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a40', borderRadius: '20px', padding: '28px 24px', width: '100%', maxWidth: '340px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px', color: 'white' }}>Weekly Session Goal</h2>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 24px' }}>How many sessions do you want to complete this week?</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', justifyContent: 'center' }}>
              {[3, 4, 5, 6, 7].map((n) => (
                <button key={n} onClick={() => setWeeklyGoalTarget(n)} style={{ width: '48px', height: '48px', borderRadius: '12px', background: weeklyGoalTarget === n ? '#a855f720' : '#0a0a0f', border: `2px solid ${weeklyGoalTarget === n ? '#a855f7' : '#1e1e30'}`, color: weeklyGoalTarget === n ? '#a855f7' : '#666', fontSize: '18px', fontWeight: '800', cursor: 'pointer' }}>{n}</button>
              ))}
            </div>
            <button onClick={() => setShowGoalSetter(false)} style={{ width: '100%', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>Save Goal</button>
          </div>
        </div>
      )}
      {/* Bottom Nav */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          background: '#0d0d1a',
          borderTop: '1px solid #1e1e30',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '12px 0 20px',
          zIndex: 100,
        }}
      >
        {[
          { id: 'home', label: 'Home', emoji: '🏠' },
          { id: 'sports', label: 'Sports', emoji: '🏅' },
          { id: 'track', label: 'Track', emoji: '📈' },
          { id: 'social', label: 'Social', emoji: '👥' },
          { id: 'profile', label: 'Profile', emoji: '👤' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={async () => {
              setActiveNav(item.id)
              playHaptic()
              playSound('click')
              if (item.id === 'social' && unreadLikes > 0) {
                const { data: { session } } = await supabase.auth.getSession()
                if (session) {
                  const { data: myPosts } = await supabase.from('posts').select('likes').eq('user_id', session.user.id)
                  const totalLikes = (myPosts || []).reduce((sum: number, p: any) => sum + (p.likes || 0), 0)
                  localStorage.setItem('lastSeenLikes', totalLikes.toString())
                  setUnreadLikes(0)
                }
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '4px 12px',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: '20px', position: 'relative' }}>
              {item.emoji}
              {item.id === 'social' && unreadLikes > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-8px', background: '#ef4444', color: 'white', fontSize: '9px', fontWeight: '800', borderRadius: '999px', minWidth: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px', boxShadow: '0 0 6px #ef444480' }}>
                  {unreadLikes > 9 ? '9+' : unreadLikes}
                </span>
              )}
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: '600',
                color: activeNav === item.id ? '#a855f7' : '#555',
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

