'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

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

const suggestedWorkouts = [
  { title: 'HIIT Cardio', duration: '20min', emoji: '🔥' },
  { title: 'Upper Body Strength', duration: '45min', emoji: '💪' },
  { title: 'Passing Drills', duration: '30min', emoji: '⚽' },
  { title: 'Agility Ladder', duration: '20min', emoji: '⚡' },
];

function LogSession({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const userPosition: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward' = 'Forward'
  const [sessionType, setSessionType] = useState('')
  const [matchType, setMatchType] = useState('')
  const [trainingContext, setTrainingContext] = useState('')
  const [duration, setDuration] = useState('')
  const [goals, setGoals] = useState('')
  const [assists, setAssists] = useState('')
  const [saves, setSaves] = useState('')
  const [blocks, setBlocks] = useState('')
  const [tackles, setTackles] = useState('')
  const [yellowCards, setYellowCards] = useState('0')
  const [redCards, setRedCards] = useState('0')
  const [notes, setNotes] = useState('')
  const [drillInput, setDrillInput] = useState('')
  const [drillCount, setDrillCount] = useState('')
  const [drills, setDrills] = useState<{name: string, count: string}[]>([])
  const [saved, setSaved] = useState(false)

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
        match_type: matchType,
        training_context: trainingContext,
        duration: parseInt(duration) || 0,
        goals: parseInt(goals) || 0,
        assists: parseInt(assists) || 0,
        saves: parseInt(saves) || 0,
        blocks: parseInt(blocks) || 0,
        tackles: parseInt(tackles) || 0,
        yellow_cards: parseInt(yellowCards) || 0,
        red_cards: parseInt(redCards) || 0,
        notes
      })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('football-hub')} style={{ background: 'none', border: 'none', color: '#22c55e', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log a Session</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 28px' }}>Record your football session</p>

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

        {/* Duration — always shown once type selected */}
        {sessionType !== '' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>DURATION (minutes)</label>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="60" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
          </div>
        )}

        {/* Match Stats */}
        {sessionType === 'Match' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '12px' }}>MATCH STATS — {userPosition.toUpperCase()}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              {userPosition === 'Goalkeeper' && (
                <div>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>SAVES</label>
                  <input value={saves} onChange={(e) => setSaves(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                </div>
              )}
              {userPosition === 'Defender' && (<>
                <div>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>BLOCKS</label>
                  <input value={blocks} onChange={(e) => setBlocks(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>TACKLES</label>
                  <input value={tackles} onChange={(e) => setTackles(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                </div>
              </>)}
              {(userPosition === 'Forward' || userPosition === 'Midfielder') && (<>
                <div>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>GOALS</label>
                  <input value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>ASSISTS</label>
                  <input value={assists} onChange={(e) => setAssists(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
                </div>
              </>)}
            </div>
            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#eab308', display: 'block', marginBottom: '6px' }}>🟨 YELLOW CARDS</label>
                <input value={yellowCards} onChange={(e) => setYellowCards(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #eab30840', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#ef4444', display: 'block', marginBottom: '6px' }}>🟥 RED CARDS</label>
                <input value={redCards} onChange={(e) => setRedCards(e.target.value)} placeholder="0" style={{ width: '100%', background: '#13131f', border: '1.5px solid #ef444440', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '16px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
              </div>
            </div>
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

        {/* Notes */}
        {sessionType !== '' && (
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>NOTES</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the session go?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' }} />
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
function BasketballStats({ setActiveNav, basketballSessions }: any) {
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('basketball-hub')} style={{ background: 'none', border: 'none', color: '#f97316', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 6px' }}>Basketball Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your performance across games and training</p>

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
            <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px', color: '#666' }}>
              No basketball sessions logged yet.
            </div>
          )}

          {basketballSessions.slice(0, 6).map((session: any) => (
            <div key={session.id} style={{ background: '#13131f', border: '1px solid #f9731625', borderLeft: '4px solid #f97316', borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{session.sessionType || 'Basketball Session'} · {session.focus || 'General'}</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                {session.sessionType === 'Game'
                  ? `${session.points || 0} pts · ${session.assists || 0} ast · ${session.rebounds || 0} reb`
                  : `${session.duration || 0} mins · ${session.notes || 'No notes'}`}
              </div>
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
                  <input value={yourScore} onChange={(e) => setYourScore(e.target.value)} placeholder="Your score" style={{ background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', boxSizing: 'border-box' }} />
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
function FixturesPage({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [tab, setTab] = useState<'upcoming' | 'results'>('upcoming')
  const [showAddFixture, setShowAddFixture] = useState(false)
  const [showLogResult, setShowLogResult] = useState<number | null>(null)

  const [fixtures, setFixtures] = useState([
    { id: 1, opponent: 'FC Rovers', type: '5-a-side', date: 'Thu 12 Jun', time: '7pm', color: '#22c55e', result: null as any },
    { id: 2, opponent: 'Sunday FC', type: 'Sunday League', date: 'Sun 15 Jun', time: '11am', color: '#06b6d4', result: null as any },
  ])

  const [results, setResults] = useState([
    { opponent: 'City Boys', type: '5-a-side', date: 'Wed 4 Jun', outcome: 'win', scoreFor: 4, scoreAgainst: 2, goals: 2, assists: 1, yellowCards: 0, redCards: 0, color: '#22c55e' },
    { opponent: 'Rovers B', type: 'Sunday League', date: 'Sun 1 Jun', outcome: 'loss', scoreFor: 1, scoreAgainst: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 0, color: '#ef4444' },
  ])

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

  const handleLogResult = (fixture: any) => {
    const sf = parseInt(scoreFor.trim()) || 0
const sa = parseInt(scoreAgainst.trim()) || 0
    const outcome = sf > sa ? 'win' : sf < sa ? 'loss' : 'draw'
    setResults([{
      opponent: fixture.opponent, type: fixture.type, date: fixture.date,
      outcome, scoreFor: sf, scoreAgainst: sa,
      goals: parseInt(rGoals) || 0, assists: parseInt(rAssists) || 0,
      yellowCards: parseInt(rYellow) || 0, redCards: parseInt(rRed) || 0,
      color: outcome === 'win' ? '#22c55e' : outcome === 'loss' ? '#ef4444' : '#f59e0b'
    }, ...results])
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
function LogSwim({ setActiveNav, swimmingSessions, setSwimmingSessions, swimmingPRs, setSwimmingPRs, addSocialPost }: any) {
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

    setSwimmingPRs(newPRs)

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

function SwimmingStats({ setActiveNav, swimmingSessions, swimmingPRs }: any) {
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

        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>
          Recent Swims
        </h2>

        {swimmingSessions.length === 0 ? (
          <div
            style={{
              background: '#13131f',
              border: '1px solid #1e1e30',
              borderRadius: '16px',
              padding: '18px',
              color: '#666'
            }}
          >
            No swims logged yet.
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
                marginBottom: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>{swim.swimType}</strong>
                <span style={{ color: '#3b82f6', fontWeight: '800' }}>
                  {swim.distance}m
                </span>
              </div>

              <div style={{ color: '#666', fontSize: '12px' }}>
                {swim.stroke} · {swim.time} min · {swim.pace}
              </div>
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
function LogRun({ setActiveNav, runningSessions, setRunningSessions, runningPRs, setRunningPRs, addSocialPost }: any) {
  const [runType, setRunType] = useState('')
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [effort, setEffort] = useState('')
  const [surface, setSurface] = useState('')
  const [notes, setNotes] = useState('')
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

    setRunningPRs(newPRs)

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

function RunningStats({ setActiveNav, runningSessions, runningPRs }: any) {
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

        <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>Run Breakdown</h2>

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

        <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '24px 0 12px' }}>Recent Runs</h2>

        {runningSessions.length === 0 ? (
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '18px', color: '#666', fontSize: '13px' }}>
            No runs logged yet.
          </div>
        ) : (
          runningSessions.slice(0, 5).map((run: any) => (
            <div key={run.id} style={{ background: '#13131f', border: '1px solid #1e1e30', borderLeft: '4px solid #06b6d4', borderRadius: '14px', padding: '14px 18px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>{run.runType}</strong>
                <span style={{ color: '#06b6d4', fontWeight: '800' }}>{run.distance} km</span>
              </div>
              <div style={{ color: '#666', fontSize: '12px' }}>{run.time} min · {run.pace} · {run.surface || 'No surface'}</div>
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
function TennisStats({ setActiveNav, tennisSessions, tennisResults }: { setActiveNav: (nav: string) => void, tennisSessions: any[], tennisResults: any[] }) {
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('tennis-hub')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px' }}>← Back</button>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Tennis Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Your tennis progress from logged sessions</p>

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

function ProfilePage({ setActiveNav, tennisSessions, runningSessions, swimmingSessions, basketballSessions, boxingSessions, cyclingSessions, golfSessions, rugbySessions, cricketSessions }: any) {const [activeNav, setActiveNavLocal] = useState('profile')
  const [position, setPosition] = useState('Forward')
  const [bio, setBio] = useState(
    localStorage.getItem('userBio') || 'Multi-sport athlete 🎾🏃🏊'
  )
  const [editingBio, setEditingBio] = useState(false)
  const [editingPosition, setEditingPosition] = useState(false)
  const [profile, setProfile] = useState<any>(null)

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
    ...tennisSessions.slice(0, 3).map((s: any) => ({
      sport: 'Tennis',
      title: `${s.sessionType || 'Tennis Session'}${s.focus ? ` · ${s.focus}` : ''}`,
      detail: `${s.duration || 0} mins · ${s.serves || 0} serves · ${s.forehands || 0} forehands`,
      date: s.date || 'Today',
      color: '#eab308',
      emoji: '🎾'
    })),
  
    ...runningSessions.slice(0, 3).map((r: any) => ({
      sport: 'Running',
      title: `${r.distance || 0}km ${r.runType || 'Run'}`,
      detail: `${r.time || 0} mins · ${r.pace || '0:00/km'} · ${r.surface || 'No surface'}`,
      date: r.date || 'Today',
      color: '#06b6d4',
      emoji: '🏃'
    })),
  
    ...swimmingSessions.slice(0, 3).map((s: any) => ({
      sport: 'Swimming',
      title: `${s.distance || 0}m ${s.stroke || 'Swim'}`,
      detail: `${s.time || 0} mins · ${s.lengths || 0} lengths · ${s.pace || '0:00/100m'}`,
      date: s.date || 'Today',
      color: '#3b82f6',
      emoji: '🏊'
    })),
  
    { sport: 'Football', title: '5-a-side vs FC Rovers', detail: 'Won 4-2 · 2 goals · 1 assist', date: 'Wed 4 Jun', color: '#22c55e', emoji: '⚽' },
    { sport: 'Gym', title: 'Push Day', detail: '52 min · 14 sets · 3,100kg volume', date: 'Mon 2 Jun', color: '#a855f7', emoji: '🏋️' },
  ].slice(0, 8)

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

const sportsUsed =
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
  ,
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

const [activeTab, setActiveTab] = useState<'activity' | 'achievements' | 'settings'>('activity')
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>

        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a1a2e, #0a0a0f)', border: '3px solid transparent', backgroundClip: 'padding-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', boxShadow: '0 0 0 3px #a855f7, 0 0 20px #a855f740' }}>👤</div>
          </div>
          <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 4px' }}>{profile?.username || 'Athlete'}</h1>
<p style={{ color: '#666', fontSize: '14px', margin: 0 }}>@{profile?.username || 'athlete'}</p>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '6px' }}>
  {bio}
</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
  {editingBio ? (
    <div style={{ display: 'flex', gap: '10px' }}>
      <input
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={{
          flex: 1,
          background: '#13131f',
          border: '1px solid #2a2a40',
          borderRadius: '10px',
          color: 'white',
          padding: '10px'
        }}
      />
      <button
        onClick={() => setEditingBio(false)}
        style={{
          background: '#22c55e',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
          padding: '10px 14px',
          fontWeight: '700',
          cursor: 'pointer'
        }}
      >
        Save
      </button>
    </div>
  ) : (
    <button
      onClick={() => setEditingBio(true)}
      style={{
        background: '#13131f',
        border: '1px solid #a855f740',
        borderRadius: '10px',
        color: '#a855f7',
        padding: '10px 14px',
        fontWeight: '700',
        cursor: 'pointer'
      }}
    >
      ✏️ Edit Bio
    </button>
  )}
</div>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
  {
    label: 'Sessions',
    value: (tennisSessions.length + runningSessions.length + swimmingSessions.length).toString(),
    color: '#a855f7'
  },
  {
    label: 'Sports',
    value: (
      (tennisSessions.length > 0 ? 1 : 0) +
      (runningSessions.length > 0 ? 1 : 0) +
      (swimmingSessions.length > 0 ? 1 : 0)
    ).toString(),
    color: '#06b6d4'
  },
  {
    label: 'Distance',
    value: `${(
      runningSessions.reduce((sum: number, r: any) => sum + (r.distance || 0), 0) +
      swimmingSessions.reduce((sum: number, s: any) => sum + ((s.distance || 0) / 1000), 0)
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
          {(['activity', 'achievements', 'settings'] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, background: activeTab === t ? '#1e1e35' : 'none', border: activeTab === t ? '1px solid #2a2a40' : '1px solid transparent', borderRadius: '10px', color: activeTab === t ? 'white' : '#555', padding: '10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>

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
            <h3 style={{ fontSize: '13px', color: '#aaa', fontWeight: '700', margin: '0 0 4px' }}>FOOTBALL SETTINGS</h3>
            <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>Playing Position</div>
                  <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>Used for match stat tracking</div>
                </div>
                {editingPosition ? (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {['Goalkeeper', 'Defender', 'Midfielder', 'Forward'].map((pos) => (
                      <button key={pos} onClick={() => { setPosition(pos); setEditingPosition(false) }} style={{ background: position === pos ? '#22c55e20' : '#0a0a0f', border: `1px solid ${position === pos ? '#22c55e' : '#1e1e30'}`, borderRadius: '8px', color: position === pos ? '#22c55e' : '#aaa', padding: '6px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>{pos}</button>
                    ))}
                  </div>
                ) : (
                  <button onClick={() => setEditingPosition(true)} style={{ background: '#22c55e20', border: '1px solid #22c55e40', borderRadius: '8px', color: '#22c55e', padding: '6px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>{position}</button>
                )}
              </div>
            </div>

            <h3 style={{ fontSize: '13px', color: '#aaa', fontWeight: '700', margin: '8px 0 4px' }}>ACCOUNT</h3>
            {[
              { label: 'Edit Profile', desc: 'Update name, bio and avatar', emoji: '✏️' },
              { label: 'Notifications', desc: 'Manage your alerts', emoji: '🔔' },
              { label: 'Privacy', desc: 'Control who sees your data', emoji: '🔒' },
              { label: 'Connected Apps', desc: 'Manage integrations', emoji: '🔗' },
{ label: 'Sign Out', desc: 'Log out of your account', emoji: '🚪' },
            ].map((item) => (
              <div key={item.label} onClick={async () => { if (item.label === 'Sign Out') { await supabase.auth.signOut() } }} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.label}</div>
                  <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>{item.desc}</div>
                </div>
                <span style={{ color: '#444', fontSize: '18px' }}>›</span>
              </div>
            ))}
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

function SocialPage({ setActiveNav, socialPosts }: any) {
  const [activeNav, setActiveNavLocal] = useState('social')
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const defaultPosts = [
    { id: 1, user: 'Toby Furlong', handle: '@tobyfurlong', sport: 'Football', sportColor: '#22c55e', emoji: '⚽', time: 'Just now', caption: 'Banged in 2 goals tonight! We won 4-2 in 5-a-side. Buzzing.', likes: 24, comments: 8, hasMedia: true, mediaBg: 'linear-gradient(135deg, #1a3a1a, #0a1a0a)' },
    { id: 2, user: 'Marcus R.', handle: '@marcusr', sport: 'Gym', sportColor: '#a855f7', emoji: '🏋️', time: '5 hours ago', caption: 'New PB on deadlift today - 140kg! Feeling strong.', likes: 42, comments: 12, hasMedia: true, mediaBg: 'linear-gradient(135deg, #1a0a2e, #0a0a1a)' },
    { id: 3, user: 'Sarah K.', handle: '@sarahk', sport: 'Running', sportColor: '#06b6d4', emoji: '🏃', time: 'Yesterday', caption: 'Sub-25 min 5K! Training is paying off. Who wants to race next week?', likes: 31, comments: 6, hasMedia: true, mediaBg: 'linear-gradient(135deg, #0a1a2e, #0a0a1a)' },
    { id: 4, user: 'Jake M.', handle: '@jakем', sport: 'Football', sportColor: '#22c55e', emoji: '⚽', time: '2 days ago', caption: `Sunday league season starts next week. Cannot wait. The lads are looking sharp in training.`, likes: 18, comments: 4, hasMedia: false, mediaBg: '' },
  ]
  const posts = [...socialPosts, ...defaultPosts]

  const toggleLike = (id: number) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px' }}>Social</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Share clips and celebrate wins</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map((post) => (
            <div key={post.id} style={{ background: '#13131f', border: `1px solid ${post.sportColor}25`, borderRadius: '20px', overflow: 'hidden' }}>
              {/* Post Header */}
              <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `${post.sportColor}20`, border: `2px solid ${post.sportColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{post.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>{post.user}</div>
                  <div style={{ color: '#555', fontSize: '12px' }}>{post.time}</div>
                </div>
                <span style={{ background: `${post.sportColor}20`, border: `1px solid ${post.sportColor}40`, borderRadius: '20px', color: post.sportColor, fontSize: '11px', fontWeight: '700', padding: '4px 10px' }}>{post.sport}</span>
              </div>

              {/* Caption */}
              <div style={{ padding: '0 16px 12px' }}>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#ddd' }}>{post.caption}</p>
              </div>

              {/* Media */}
              {post.hasMedia && (
                <div style={{ margin: '0 16px 12px', height: '180px', borderRadius: '14px', background: post.mediaBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1e1e30' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: `2px solid ${post.sportColor}80`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: `18px solid ${post.sportColor}`, marginLeft: '3px' }} />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ padding: '12px 16px 16px', display: 'flex', gap: '20px', alignItems: 'center', borderTop: '1px solid #1e1e3030' }}>
                <button onClick={() => toggleLike(post.id)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: likedPosts.includes(post.id) ? '#ef4444' : '#555', fontSize: '13px', fontWeight: '600', padding: 0 }}>
                  <span style={{ fontSize: '18px' }}>{likedPosts.includes(post.id) ? '❤️' : '🤍'}</span>
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </button>
                <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#555', fontSize: '13px', fontWeight: '600', padding: 0 }}>
                  <span style={{ fontSize: '18px' }}>💬</span>
                  {post.comments}
                </button>
                <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#555', fontSize: '13px', fontWeight: '600', padding: 0, marginLeft: 'auto' }}>
                  <span style={{ fontSize: '18px' }}>↗️</span>
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Button */}
      <div style={{ position: 'fixed', bottom: '90px', right: '24px', zIndex: 200 }}>
        <button style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', border: 'none', borderRadius: '28px', color: 'white', padding: '14px 22px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 24px #a855f760', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ✚ Create Post
        </button>
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
function GymStats({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [tab, setTab] = useState<'overall' | 'strength' | 'cardio'>('overall')

  const overallStats = {
    totalWorkouts: 47, totalHours: 62, totalVolume: '184,200kg',
    currentStreak: 5, longestStreak: 14, caloriesBurned: 18400,
  }

  const strengthStats = {
    totalSets: 842, totalReps: 9240, avgSessionVolume: '3,920kg',
    lifts: [
      { name: 'Bench Press', pr: '100kg', recent: '95kg', sessions: 18, color: '#a855f7' },
      { name: 'Squat', pr: '140kg', recent: '132.5kg', sessions: 22, color: '#06b6d4' },
      { name: 'Deadlift', pr: '180kg', recent: '170kg', sessions: 16, color: '#22c55e' },
      { name: 'Overhead Press', pr: '70kg', recent: '65kg', sessions: 14, color: '#f59e0b' },
      { name: 'Barbell Row', pr: '90kg', recent: '85kg', sessions: 12, color: '#ef4444' },
      { name: 'Pull Ups', pr: '15 reps', recent: '12 reps', sessions: 10, color: '#f97316' },
    ]
  }

  const cardioStats = {
    totalSessions: 12, totalKm: 48.5, avgPace: '5:12/km',
    totalCalories: 5840, longestRun: '10km', bestPace: '4:44/km',
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
            <div style={{ fontSize: '28px', fontWeight: '800' }}>{overallStats.currentStreak} days 🔥</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>Best streak</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#a855f7' }}>{overallStats.longestStreak} days</div>
          </div>
        </div>

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
              { label: 'Total Workouts', value: overallStats.totalWorkouts, color: '#a855f7', emoji: '🏋️' },
              { label: 'Total Hours', value: overallStats.totalHours + 'h', color: '#06b6d4', emoji: '⏱️' },
              { label: 'Total Volume', value: overallStats.totalVolume, color: '#22c55e', emoji: '⚖️' },
              { label: 'Calories Burned', value: overallStats.caloriesBurned.toLocaleString(), color: '#f59e0b', emoji: '🔥' },
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
function FootballStats({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [tab, setTab] = useState<'matches' | 'training' | 'overall'>('overall')

  const matchStats = {
    played: 24, wins: 14, losses: 6, draws: 4,
    goals: 18, assists: 9, yellowCards: 3, redCards: 0,
    cleanSheets: 0, tackles: 12, blocks: 5,
    form: ['win', 'win', 'loss', 'win', 'draw'],
  }

  const trainingStats = {
    totalSessions: 38, totalMinutes: 1840,
    drills: [
      { label: 'Finishing', emoji: '⚽', count: 240 },
      { label: 'Free Kicks', emoji: '🎯', count: 180 },
      { label: 'Corners', emoji: '📐', count: 95 },
      { label: 'Penalties', emoji: '🥅', count: 60 },
      { label: 'Dribbling', emoji: '🔄', count: 210 },
      { label: 'Passing', emoji: '👟', count: 320 },
      { label: 'Defending', emoji: '🛡️', count: 80 },
      { label: 'Agility', emoji: '⚡', count: 150 },
      { label: 'Fitness', emoji: '💪', count: 120 },
    ],
    withClub: 22, personal: 16,
  }

  const overallStats = {
    totalSessions: matchStats.played + trainingStats.totalSessions,
    totalHours: Math.round((matchStats.played * 60 + trainingStats.totalMinutes) / 60),
    goals: matchStats.goals, assists: matchStats.assists,
    cards: matchStats.yellowCards + matchStats.redCards,
  }

  const formColor: Record<string, string> = { win: '#22c55e', loss: '#ef4444', draw: '#f59e0b' }
  const formLabel: Record<string, string> = { win: 'W', loss: 'L', draw: 'D' }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>

        <button onClick={() => setActiveNav('football-hub')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>My Stats</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px' }}>Your football performance data</p>

        {/* Form Strip */}
        <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>FORM</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {matchStats.form.map((f, i) => (
              <div key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${formColor[f]}20`, border: `1.5px solid ${formColor[f]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: formColor[f] }}>{formLabel[f]}</div>
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
                { label: 'Total Sessions', value: overallStats.totalSessions, color: '#a855f7', emoji: '📅' },
                { label: 'Hours on Pitch', value: overallStats.totalHours + 'h', color: '#06b6d4', emoji: '⏱️' },
                { label: 'Goals Scored', value: overallStats.goals, color: '#22c55e', emoji: '⚽' },
                { label: 'Assists', value: overallStats.assists, color: '#f59e0b', emoji: '🅰️' },
                { label: 'Total Cards', value: overallStats.cards, color: '#ef4444', emoji: '🟨' },
                { label: 'Win Rate', value: Math.round((matchStats.wins / matchStats.played) * 100) + '%', color: '#22c55e', emoji: '🏆' },
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
                { label: 'Wins', value: matchStats.wins, color: '#22c55e' },
                { label: 'Draws', value: matchStats.draws, color: '#f59e0b' },
                { label: 'Losses', value: matchStats.losses, color: '#ef4444' },
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
                { label: 'Goals', value: matchStats.goals, color: '#22c55e', emoji: '⚽' },
                { label: 'Assists', value: matchStats.assists, color: '#06b6d4', emoji: '🅰️' },
                { label: 'Yellow Cards', value: matchStats.yellowCards, color: '#eab308', emoji: '🟨' },
                { label: 'Red Cards', value: matchStats.redCards, color: '#ef4444', emoji: '🟥' },
                { label: 'Tackles', value: matchStats.tackles, color: '#a855f7', emoji: '🛡️' },
                { label: 'Blocks', value: matchStats.blocks, color: '#f97316', emoji: '✋' },
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

        {/* Training Tab */}
        {tab === 'training' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '4px' }}>
              {[
                { label: 'Total Sessions', value: trainingStats.totalSessions, color: '#22c55e', emoji: '📅' },
                { label: 'Total Minutes', value: trainingStats.totalMinutes, color: '#06b6d4', emoji: '⏱️' },
                { label: 'With Club', value: trainingStats.withClub, color: '#a855f7', emoji: '👥' },
                { label: 'Personal', value: trainingStats.personal, color: '#f59e0b', emoji: '🧍' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#13131f', border: `1px solid ${stat.color}25`, borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{stat.emoji}</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', fontWeight: '600' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: '14px', color: '#aaa', fontWeight: '600', margin: '8px 0 4px' }}>DRILL BREAKDOWN</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {trainingStats.drills.map((drill) => (
                <div key={drill.label} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{drill.emoji}</span>
                  <span style={{ flex: 1, fontSize: '14px', fontWeight: '600' }}>{drill.label}</span>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#22c55e' }}>{drill.count}</span>
                  <span style={{ fontSize: '11px', color: '#555' }}>reps</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
function LogWorkout({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [workoutTab, setWorkoutTab] = useState<'log' | 'history'>('log')
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null)
  const [workoutTitle, setWorkoutTitle] = useState('')
const [workoutDate, setWorkoutDate] = useState('')
  const [duration, setDuration] = useState('')
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', weight: '' }])
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const pastWorkouts = [
    { title: 'Push Day', date: 'Mon 2 Jun', duration: 52, notes: 'Felt strong today', exercises: [{ name: 'Bench Press', sets: '4', reps: '8', weight: '90' }, { name: 'Incline DB Press', sets: '3', reps: '10', weight: '30' }, { name: 'Lateral Raises', sets: '4', reps: '12', weight: '12' }] },
    { title: 'Legs', date: 'Thu 5 Jun', duration: 48, notes: 'Quads on fire', exercises: [{ name: 'Squat', sets: '4', reps: '6', weight: '120' }, { name: 'Leg Press', sets: '3', reps: '12', weight: '180' }, { name: 'Romanian DL', sets: '3', reps: '10', weight: '80' }] },
    { title: 'Pull Day', date: 'Fri 6 Jun', duration: 55, notes: '', exercises: [{ name: 'Deadlift', sets: '4', reps: '5', weight: '160' }, { name: 'Barbell Row', sets: '4', reps: '8', weight: '80' }, { name: 'Lat Pulldown', sets: '3', reps: '12', weight: '65' }] },
  ]

  const addExercise = () => setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }])
  const updateExercise = (i: number, field: string, value: string) => {
    const updated = [...exercises]
    updated[i] = { ...updated[i], [field]: value }
    setExercises(updated)
  }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('gym-hub')} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>

        <div style={{ display: 'flex', background: '#13131f', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          {(['log', 'history'] as const).map((t) => (
            <button key={t} onClick={() => setWorkoutTab(t)} style={{ flex: 1, background: workoutTab === t ? '#1e1e35' : 'none', border: workoutTab === t ? '1px solid #2a2a40' : '1px solid transparent', borderRadius: '10px', color: workoutTab === t ? 'white' : '#555', padding: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>{t === 'log' ? '📝 Log Workout' : '📅 Past Workouts'}</button>
          ))}
        </div>

        {workoutTab === 'history' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Past Workouts</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px' }}>Your previous sessions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pastWorkouts.map((workout, i) => (
                <div key={i}>
                  <div onClick={() => setExpandedWorkout(expandedWorkout === i ? null : i)} style={{ background: '#13131f', border: '1px solid #1e1e30', borderLeft: '4px solid #a855f7', borderRadius: '14px', padding: '16px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '15px' }}>{workout.title}</div>
                      <div style={{ color: '#555', fontSize: '12px', marginTop: '3px' }}>{workout.date} · {workout.duration} min</div>
                    </div>
                    <div style={{ color: '#a855f7', fontSize: '20px' }}>{expandedWorkout === i ? '∧' : '›'}</div>
                  </div>
                  {expandedWorkout === i && (
                    <div style={{ background: '#0d0d1a', border: '1px solid #1e1e30', borderTop: 'none', borderRadius: '0 0 14px 14px', padding: '14px 18px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', marginBottom: '12px', fontSize: '11px', color: '#555', fontWeight: '700', textAlign: 'center' }}>
                        <span>EXERCISE</span><span>SETS</span><span>REPS</span><span>KG</span>
                      </div>
                      {workout.exercises.map((ex, j) => (
                        <div key={j} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', padding: '8px 0', borderTop: '1px solid #1e1e3020', fontSize: '13px', textAlign: 'center' }}>
                          <span style={{ fontWeight: '600', textAlign: 'left' }}>{ex.name}</span>
                          <span style={{ color: '#a855f7' }}>{ex.sets}</span>
                          <span style={{ color: '#a855f7' }}>{ex.reps}</span>
                          <span style={{ color: '#a855f7' }}>{ex.weight}</span>
                        </div>
                      ))}
                      {workout.notes && <div style={{ marginTop: '10px', color: '#555', fontSize: '12px', fontStyle: 'italic' }}>"{workout.notes}"</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {workoutTab === 'log' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px' }}>Log a Workout</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px' }}>Record your gym session</p>
            <div style={{ marginBottom: '16px' }}>
  <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>WORKOUT TITLE</label>
  <input value={workoutTitle} onChange={(e) => setWorkoutTitle(e.target.value)} placeholder="e.g. Push Day, Legs, Upper Body" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
</div>
<div style={{ marginBottom: '16px' }}>
  <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>DATE</label>
  <input value={workoutDate} onChange={(e) => setWorkoutDate(e.target.value)} placeholder="e.g. Mon 2 Jun" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
</div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>DURATION (minutes)</label>
              <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="45" style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>EXERCISES</label>
                <button onClick={addExercise} style={{ background: '#a855f720', border: '1px solid #a855f7', borderRadius: '8px', color: '#a855f7', padding: '6px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>+ Add</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exercises.map((ex, i) => (
                  <div key={i} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px' }}>
                    <input value={ex.name} onChange={(e) => updateExercise(i, 'name', e.target.value)} placeholder="Exercise name (e.g. Bench Press)" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      {[{ label: 'Sets', field: 'sets', val: ex.sets }, { label: 'Reps', field: 'reps', val: ex.reps }, { label: 'kg', field: 'weight', val: ex.weight }].map((f) => (
                        <div key={f.field}>
                          <label style={{ fontSize: '11px', color: '#666', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                          <input value={f.val} onChange={(e) => updateExercise(i, f.field, e.target.value)} placeholder="0" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '8px', color: 'white', padding: '10px', fontSize: '14px', textAlign: 'center', boxSizing: 'border-box' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '8px' }}>NOTES</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the workout feel?" rows={3} style={{ width: '100%', background: '#13131f', border: '1.5px solid #1e1e30', borderRadius: '12px', color: 'white', padding: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' }} />
            </div>
            <button onClick={handleSave} style={{ width: '100%', background: saved ? '#7c3aed' : 'linear-gradient(135deg, #a855f7, #7c3aed)', border: 'none', borderRadius: '14px', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 20px #a855f740' }}>
              {saved ? '✓ Workout Saved!' : 'Save Workout'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function PersonalRecords({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [prs, setPrs] = useState([
    { exercise: 'Bench Press', weight: '100kg', date: 'Mon 2 Jun', color: '#a855f7' },
    { exercise: 'Squat', weight: '140kg', date: 'Thu 5 Jun', color: '#06b6d4' },
    { exercise: 'Deadlift', weight: '180kg', date: 'Fri 6 Jun', color: '#22c55e' },
    { exercise: 'Overhead Press', weight: '70kg', date: 'Mon 2 Jun', color: '#f59e0b' },
  ])
  const [showAdd, setShowAdd] = useState(false)
  const [newExercise, setNewExercise] = useState('')
  const [newWeight, setNewWeight] = useState('')

  const handleAdd = () => {
    if (newExercise && newWeight) {
      setPrs([...prs, { exercise: newExercise, weight: newWeight, date: 'Today', color: '#a855f7' }])
      setNewExercise(''); setNewWeight('')
      setShowAdd(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', WebkitOverflowScrolling: 'touch', padding: '50px 24px 90px' }}>
        <button onClick={() => setActiveNav('gym-hub')} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 4px' }}>Personal Records</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Your best lifts</p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)} style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '12px', color: 'white', padding: '10px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>+ Add PR</button>
        </div>

        {showAdd && (
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
            <input value={newExercise} onChange={(e) => setNewExercise(e.target.value)} placeholder="Exercise name" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' }} />
            <input value={newWeight} onChange={(e) => setNewWeight(e.target.value)} placeholder="Weight (e.g. 100kg)" style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid #1e1e30', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', marginBottom: '14px', boxSizing: 'border-box' }} />
            <button onClick={handleAdd} style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Save PR</button>
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
function GymHub({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [activeNav, setActiveNavLocal] = useState('track')
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

function RunningHub({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const options = [
    { id: 'log-run', label: 'Log a Run', emoji: '📝', desc: 'Distance, pace, time and route feel', color: '#06b6d4' },
    { id: 'running-plans', label: 'Suggested Sessions', emoji: '💡', desc: '5K, speed, endurance and recovery', color: '#f59e0b' },
    { id: 'running-prs', label: 'Personal Records', emoji: '🏆', desc: 'Fastest 1K, 5K, 10K and longest run', color: '#22c55e' },
    { id: 'running-stats', label: 'My Stats', emoji: '📊', desc: 'Mileage, pace, streaks and progress', color: '#a855f7' },
  ]

  return <SportHubTemplate setActiveNav={setActiveNav} title="Running Hub" emoji="🏃" color="#06b6d4" options={options} />
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { title: 'Log Boxing Session', desc: 'Record bag work, sparring, pads or conditioning', emoji: '✚', nav: 'log-boxing', color: '#ef4444' },
            { title: 'Boxing Stats', desc: 'View rounds, punches and training volume', emoji: '📊', nav: 'boxing-stats', color: '#f97316' },
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
  const [putts, setPutts] = useState('')
  const [fairwaysHit, setFairwaysHit] = useState('')
  const [gir, setGir] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    const newSession = {
      id: Date.now(),
      session_type: sessionType,
      course,
      holes: parseInt(holes) || 18,
      score: parseInt(score) || 0,
      putts: parseInt(putts) || 0,
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
                { label: 'PUTTS', value: putts, setter: setPutts, placeholder: '30' },
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

function GolfStats({ setActiveNav, golfSessions }: any) {
  const rounds = golfSessions.filter((s: any) => s.session_type === 'Round')
  const totalRounds = rounds.length
  const totalSessions = golfSessions.length
  const avgScore = totalRounds > 0 ? (rounds.reduce((sum: number, s: any) => sum + (s.score || 0), 0) / totalRounds).toFixed(1) : 'N/A'
  const bestScore = totalRounds > 0 ? Math.min(...rounds.map((s: any) => s.score || 999)) : 0
  const avgPutts = totalRounds > 0 ? (rounds.reduce((sum: number, s: any) => sum + (s.putts || 0), 0) / totalRounds).toFixed(1) : 'N/A'
  const avgFairways = totalRounds > 0 ? (rounds.reduce((sum: number, s: any) => sum + (s.fairways_hit || 0), 0) / totalRounds).toFixed(1) : 'N/A'
  const avgGir = totalRounds > 0 ? (rounds.reduce((sum: number, s: any) => sum + (s.gir || 0), 0) / totalRounds).toFixed(1) : 'N/A'

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
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '18px', color: '#666' }}>No rounds logged yet.</div>
        ) : (
          rounds.slice(0, 5).map((round: any, i: number) => (
            <div key={i} style={{ background: '#13131f', border: '1px solid #84cc1625', borderLeft: '4px solid #84cc16', borderRadius: '14px', padding: '14px 18px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>{round.course || 'Unknown Course'} · {round.holes || 18} holes</strong>
                <span style={{ color: '#84cc16', fontWeight: '800', fontSize: '18px' }}>{round.score}</span>
              </div>
              <div style={{ color: '#666', fontSize: '12px' }}>{round.putts || 0} putts · {round.fairways_hit || 0} fairways · {round.gir || 0} GIR</div>
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

function RugbyStats({ setActiveNav, rugbySessions }: any) {
  const totalSessions = rugbySessions.length
  const matches = rugbySessions.filter((s: any) => s.session_type === 'Match')
  const totalTries = rugbySessions.reduce((sum: number, s: any) => sum + (s.tries || 0), 0)
  const totalTackles = rugbySessions.reduce((sum: number, s: any) => sum + (s.tackles || 0), 0)
  const totalCarries = rugbySessions.reduce((sum: number, s: any) => sum + (s.carries || 0), 0)
  const totalLineouts = rugbySessions.reduce((sum: number, s: any) => sum + (s.lineouts || 0), 0)

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
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '18px', color: '#666' }}>No sessions logged yet.</div>
        ) : (
          rugbySessions.slice(0, 5).map((s: any, i: number) => (
            <div key={i} style={{ background: '#13131f', border: '1px solid #f59e0b25', borderLeft: '4px solid #f59e0b', borderRadius: '14px', padding: '14px 18px', marginBottom: '10px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{s.session_type} · {s.position || 'No position'}</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{s.duration || 0} mins · {s.tries || 0} tries · {s.tackles || 0} tackles · {s.carries || 0} carries</div>
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
              <label style={{ fontSize: '11px', color: '#aaa', fontWeight: '600', display: 'block', marginBottom: '6px' }}>CATCHES</label>
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

function CricketStats({ setActiveNav, cricketSessions }: any) {
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
          <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '16px', padding: '18px', color: '#666' }}>No sessions logged yet.</div>
        ) : (
          cricketSessions.slice(0, 5).map((s: any, i: number) => (
            <div key={i} style={{ background: '#13131f', border: '1px solid #06b6d425', borderLeft: '4px solid #06b6d4', borderRadius: '14px', padding: '14px 18px', marginBottom: '10px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{s.session_type}</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{s.runs || 0} runs · {s.balls_faced || 0} balls · {s.wickets || 0} wkts · {s.overs_bowled || 0} overs</div>
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
function CyclingStats({ setActiveNav, cyclingSessions }: any) {
  const totalRides = cyclingSessions.length
  const totalDistance = cyclingSessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0)
  const totalElevation = cyclingSessions.reduce((sum: number, s: any) => sum + (s.elevation || 0), 0)
  const longestRide = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.distance || 0)) : 0
  const fastestSpeed = cyclingSessions.length ? Math.max(...cyclingSessions.map((s: any) => s.avgSpeed || 0)) : 0
  const avgDistance = totalRides > 0 ? (totalDistance / totalRides).toFixed(1) : '0.0'

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
            <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px', color: '#666' }}>
              No rides logged yet.
            </div>
          )}

          {cyclingSessions.slice(0, 6).map((ride: any) => (
            <div key={ride.id} style={{ background: '#13131f', border: '1px solid #10b98125', borderLeft: '4px solid #10b981', borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{ride.rideType || 'Ride'}</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                {ride.distance || 0}km · {ride.duration || 0} mins · {ride.avgSpeed || 0}km/h
              </div>
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

    setActiveNav('boxing-hub')
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
function BoxingStats({ setActiveNav, boxingSessions }: any) {
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
            <div style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px', color: '#666' }}>
              No boxing sessions logged yet.
            </div>
          )}

          {boxingSessions.slice(0, 6).map((session: any) => (
            <div key={session.id} style={{ background: '#13131f', border: '1px solid #ef444425', borderLeft: '4px solid #ef4444', borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{session.sessionType}</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                {session.duration || 0} mins · {session.rounds || 0} rounds · {session.punches || 0} punches
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
  const [saved, setSaved] = useState(false)

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

function SportHubTemplate({ setActiveNav, title, emoji, color, options }: any) {
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

function TrackPage({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [activeNav, setActiveNavLocal] = useState('track')

  const recentSessions = [
    { sport: 'Gym', title: 'Pull Day', detail: '52 min | 14 sets | 3,100 kg', date: 'Mon 2 Jun', color: '#a855f7' },
    { sport: 'Running', title: '5K Run', detail: '24:32 | 4:54/km | 312 cal', date: 'Tue 3 Jun', color: '#06b6d4' },
    { sport: 'Football', title: '5-a-side', detail: '60 min | Won 4-2', date: 'Wed 4 Jun', color: '#22c55e' },
    { sport: 'Gym', title: 'Legs', detail: '48 min | 12 sets | 4,200 kg', date: 'Thu 5 Jun', color: '#a855f7' },
    { sport: 'Tennis', title: 'Singles', detail: '75 min | Won 6-3, 7-5', date: 'Fri 6 Jun', color: '#eab308' },
  ]

  const sportCards = [
    { id: 'football-hub', name: 'Football', emoji: '⚽', color: '#22c55e', sessions: 12 },
    { id: 'gym-hub', name: 'Gym', emoji: '🏋️', color: '#a855f7', sessions: 24 },
    { id: 'tennis-hub', name: 'Tennis', emoji: '🎾', color: '#eab308', sessions: 8 },
    { id: 'running-hub', name: 'Running', emoji: '🏃', color: '#06b6d4', sessions: 15 },
    { id: 'swimming-hub', name: 'Swimming', emoji: '🏊', color: '#3b82f6', sessions: 0 },
    { id: 'basketball-hub', name: 'Basketball', emoji: '🏀', color: '#f97316', sessions: 0 },
    { id: 'cycling-hub', name: 'Cycling', emoji: '🚴', color: '#10b981', sessions: 0 },
{ id: 'golf-hub', name: 'Golf', emoji: '⛳', color: '#84cc16', sessions: 0 },
{ id: 'boxing-hub', name: 'Boxing', emoji: '🥊', color: '#ef4444', sessions: 0 },
{ id: 'rugby-hub', name: 'Rugby', emoji: '🏉', color: '#f59e0b', sessions: 0 },
{ id: 'cricket-hub', name: 'Cricket', emoji: '🏏', color: '#06b6d4', sessions: 0 },
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
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=09ee950ba2fbd68e806fb73fbb6ca94d`
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
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 4px' }}>Sports News</h1>
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
export default function Home() {
  const [activeNav, setActiveNav] = useState('home')
  const [weeklyGoalTarget, setWeeklyGoalTarget] = useState(() => {
    if (typeof window === 'undefined') return 5
    return parseInt(localStorage.getItem('weeklyGoalTarget') || '5')
  })
  const [showGoalSetter, setShowGoalSetter] = useState(false)
  useEffect(() => {
    localStorage.setItem('weeklyGoalTarget', weeklyGoalTarget.toString())
  }, [weeklyGoalTarget])
const [activeSport, setActiveSport] = useState<string | null>(null);
const [selectedBasketballCategory, setSelectedBasketballCategory] = useState('')
const [selectedBoxingCategory, setSelectedBoxingCategory] = useState('')
const [selectedCyclingCategory, setSelectedCyclingCategory] = useState('')
const [user, setUser] = useState<any>(null)
const [authLoading, setAuthLoading] = useState(true)
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

useEffect(() => {
  const loadSessions = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const uid = session.user.id

    const [golf, rugby, cricket, basketball, boxing, cycling] = await Promise.all([
      supabase.from('golf_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('rugby_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('cricket_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('basketball_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('boxing_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
      supabase.from('cycling_sessions').select('*').eq('user_id', uid).order('created_at', { ascending: false }),
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
  }
  loadSessions()
}, [user])

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

const addSocialPost = (post: any) => {
  setSocialPosts((prev) => [
    {
      id: Date.now(),
      user: 'Toby Furlong',
      handle: '@tobyfurlong',
      time: 'Just now',
      likes: 0,
      comments: 0,
      hasMedia: false,
      mediaBg: '',
      ...post,
    },
    ...prev,
  ])
}

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null)
    setAuthLoading(false)
  })
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null)
  })
  return () => subscription.unsubscribe()
}, [])

if (authLoading) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#a855f7', fontSize: '18px', fontWeight: '700' }}>Loading...</div>
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
  return <TrackPage setActiveNav={setActiveNav} />
}
if (activeNav === 'football-hub') {
  return <FootballHub setActiveNav={setActiveNav} />
}
if (activeNav === 'gym-hub') {
  return <GymHub setActiveNav={setActiveNav} />
}
if (activeNav === 'tennis-hub') {
  return <TennisHub setActiveNav={setActiveNav} />
}
if (activeNav === 'running-hub') {
  return <RunningHub setActiveNav={setActiveNav} />
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
  return <GolfStats setActiveNav={setActiveNav} golfSessions={golfSessions} />
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
  return <RugbyStats setActiveNav={setActiveNav} rugbySessions={rugbySessions} />
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
  return <CricketStats setActiveNav={setActiveNav} cricketSessions={cricketSessions} />
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
    />
  )
}

if (activeNav === 'swimming-stats') {
  return (
    <SwimmingStats
      setActiveNav={setActiveNav}
      swimmingSessions={swimmingSessions}
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
    />
  )
}

if (activeNav === 'running-stats') {
  return (
    <RunningStats
      setActiveNav={setActiveNav}
      runningSessions={runningSessions}
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
  return <LogSession setActiveNav={setActiveNav} />
}
if (activeNav === 'fixtures') {
  return <FixturesPage setActiveNav={setActiveNav} />
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
  return <TennisStats setActiveNav={setActiveNav} tennisSessions={tennisSessions} tennisResults={tennisResults} />
}
if (activeNav === 'log-workout') {
  return <LogWorkout setActiveNav={setActiveNav} />
}
if (activeNav === 'personal-records') {
  return <PersonalRecords setActiveNav={setActiveNav} />
}

if (activeNav === 'my-stats') {
  return <FootballStats setActiveNav={setActiveNav} />
}
if (activeNav === 'suggested-workouts') {
  return <SuggestedWorkouts setActiveNav={setActiveNav} />
}
if (activeNav === 'gym-stats') {
  return <GymStats setActiveNav={setActiveNav} />
}
if (activeNav === 'social') {
  return <SocialPage setActiveNav={setActiveNav} socialPosts={socialPosts} />
}
if (activeNav === 'profile') {
  return <ProfilePage setActiveNav={setActiveNav} tennisSessions={tennisSessions} runningSessions={runningSessions} swimmingSessions={swimmingSessions} basketballSessions={basketballSessions} boxingSessions={boxingSessions} cyclingSessions={cyclingSessions} golfSessions={golfSessions} rugbySessions={rugbySessions} cricketSessions={cricketSessions} />
}
date: new Date().toISOString().split('T')[0]

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

const weeklyProgress = Math.min(Math.round((totalSessions / weeklyGoalTarget) * 100), 100)




  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0f',
        color: 'white',
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
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              👤
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
  .map((sport) => (
    <div
      key={sport.name}
      onClick={() => setActiveNav(sport.name.toLowerCase() + '-hub')}
      onTouchStart={() => setActiveNav(sport.name.toLowerCase() + '-hub')}
      style={{
        minWidth: '80px',
        background: '#13131f',
        border: `1.5px solid ${sport.color}40`,
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
  ))}
          </div>
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
            onClick={() => setActiveNav(item.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '4px 12px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
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
