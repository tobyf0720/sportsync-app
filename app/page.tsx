'use client';

import { useState } from 'react';

const sports = [
  { name: 'Football', emoji: '⚽', color: '#22c55e', available: true },
  { name: 'Gym', emoji: '🏋️', color: '#a855f7', available: true },
  { name: 'Tennis', emoji: '🎾', color: '#eab308', available: true },
  { name: 'Running', emoji: '🏃', color: '#06b6d4', available: true },
  { name: 'Swimming', emoji: '🏊', color: '#3b82f6', available: false },
  { name: 'Basketball', emoji: '🏀', color: '#f97316', available: false },
];

const suggestedWorkouts = [
  { title: 'HIIT Cardio', duration: '20min', emoji: '🔥' },
  { title: 'Upper Body Strength', duration: '45min', emoji: '💪' },
  { title: 'Passing Drills', duration: '30min', emoji: '⚽' },
  { title: 'Agility Ladder', duration: '20min', emoji: '⚡' },
];

function LogSession({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const userPosition = 'Forward'
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

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>

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
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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

function ProfilePage({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [activeNav, setActiveNavLocal] = useState('profile')
  const [activeTab, setActiveTab] = useState<'activity' | 'achievements' | 'settings'>('activity')
  const [position, setPosition] = useState('Forward')
  const [editingPosition, setEditingPosition] = useState(false)

  const recentActivity = [
    { sport: 'Football', title: '5-a-side vs FC Rovers', detail: 'Won 4-2 · 2 goals · 1 assist', date: 'Wed 4 Jun', color: '#22c55e', emoji: '⚽' },
    { sport: 'Gym', title: 'Push Day', detail: '52 min · 14 sets · 3,100kg volume', date: 'Mon 2 Jun', color: '#a855f7', emoji: '🏋️' },
    { sport: 'Running', title: '5K Run', detail: '24:32 · 4:54/km · 312 cal', date: 'Tue 3 Jun', color: '#06b6d4', emoji: '🏃' },
    { sport: 'Football', title: 'Training Session', detail: 'Passing drills · Finishing practice', date: 'Sun 1 Jun', color: '#22c55e', emoji: '⚽' },
  ]

  const achievements = [
    { title: 'First Goal', desc: 'Scored your first logged goal', emoji: '⚽', earned: true, color: '#f59e0b' },
    { title: 'Hat Trick', desc: 'Scored 3 goals in one match', emoji: '🎩', earned: true, color: '#f59e0b' },
    { title: 'Iron Will', desc: '7 day training streak', emoji: '🔥', earned: true, color: '#ef4444' },
    { title: 'Century', desc: 'Log 100 sessions total', emoji: '💯', earned: false, color: '#666' },
    { title: 'PR Machine', desc: 'Set 10 personal records', emoji: '🏆', earned: true, color: '#f59e0b' },
    { title: 'Social Star', desc: 'Get 50 likes on a post', emoji: '⭐', earned: false, color: '#666' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>

        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a1a2e, #0a0a0f)', border: '3px solid transparent', backgroundClip: 'padding-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', boxShadow: '0 0 0 3px #a855f7, 0 0 20px #a855f740' }}>👤</div>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 4px' }}>Toby Furlong</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>@tobyfurlong</p>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Workouts', value: '47', color: '#a855f7' },
            { label: 'Sports', value: '4', color: '#06b6d4' },
            { label: 'Followers', value: '128', color: '#22c55e' },
          ].map((stat) => (
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
                <div style={{ color: '#555', fontSize: '11px', lineHeight: '1.4' }}>{ach.desc}</div>
                {ach.earned && <div style={{ marginTop: '8px', fontSize: '10px', color: ach.color, fontWeight: '700' }}>✓ EARNED</div>}
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
            ].map((item) => (
              <div key={item.label} style={{ background: '#13131f', border: '1px solid #1e1e30', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
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
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNav === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SocialPage({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [activeNav, setActiveNavLocal] = useState('social')
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const posts = [
    { id: 1, user: 'Toby Furlong', handle: '@tobyfurlong', sport: 'Football', sportColor: '#22c55e', emoji: '⚽', time: 'Just now', caption: 'Banged in 2 goals tonight! We won 4-2 in 5-a-side. Buzzing.', likes: 24, comments: 8, hasMedia: true, mediaBg: 'linear-gradient(135deg, #1a3a1a, #0a1a0a)' },
    { id: 2, user: 'Marcus R.', handle: '@marcusr', sport: 'Gym', sportColor: '#a855f7', emoji: '🏋️', time: '5 hours ago', caption: 'New PB on deadlift today - 140kg! Feeling strong.', likes: 42, comments: 12, hasMedia: true, mediaBg: 'linear-gradient(135deg, #1a0a2e, #0a0a1a)' },
    { id: 3, user: 'Sarah K.', handle: '@sarahk', sport: 'Running', sportColor: '#06b6d4', emoji: '🏃', time: 'Yesterday', caption: 'Sub-25 min 5K! Training is paying off. Who wants to race next week?', likes: 31, comments: 6, hasMedia: true, mediaBg: 'linear-gradient(135deg, #0a1a2e, #0a0a1a)' },
    { id: 4, user: 'Jake M.', handle: '@jakем', sport: 'Football', sportColor: '#22c55e', emoji: '⚽', time: '2 days ago', caption: 'Sunday league season starts next week. Cannot wait. The lads are looking sharp in training.', likes: 18, comments: 4, hasMedia: false, mediaBg: '' },
  ]

  const toggleLike = (id: number) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
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
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>

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
      <div style={{ overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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
      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh', padding: '50px 24px 90px' }}>
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
      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh' }}>
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
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNav === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
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
      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh' }}>
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
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
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
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: 'system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh' }}>
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
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 12px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: activeNav === item.id ? '#a855f7' : '#555' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
function SportsPage({ setActiveNav }: { setActiveNav: (nav: string) => void }) {
  const [activeNav, setActiveNavLocal] = useState('sports')
  const upcomingFixtures = [
    { sport: 'Football', type: '5-a-side', date: 'Thu 12 Jun', time: '7pm', color: '#22c55e' },
    { sport: 'Tennis', type: 'Singles', date: 'Sat 14 Jun', time: '10am', color: '#eab308' },
  ]

  const recentResults = [
    { sport: 'Football', result: 'win', scoreFor: 4, scoreAgainst: 2, color: '#22c55e' },
    { sport: 'Tennis', result: 'win', scoreFor: '6-3', scoreAgainst: '7-5', color: '#eab308' },
    { sport: 'Gym', result: 'win', scoreFor: 'PR', scoreAgainst: '', color: '#a855f7' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '430px',
      margin: '0 auto',
      position: 'relative',
    }}>
      <div style={{
        position: 'fixed', top: '-100px', right: '-100px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh' }}>

        <div style={{ padding: '50px 24px 24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>Sports</h1>
        </div>

        <div style={{ padding: '0 24px 32px' }}>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
            {sports.map((sport) => (
              <div key={sport.name} style={{
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
                  boxShadow: sport.available ? `0 0 16px ${sport.color}50` : 'none',
                  background: '#13131f',
                }}>
                  {sport.emoji}
                </div>
                <span style={{ fontSize: '11px', color: '#aaa', fontWeight: '600' }}>{sport.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 24px 28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>Upcoming Games</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {upcomingFixtures.map((fixture, i) => (
              <div key={i} style={{
                background: '#13131f',
                border: '1px solid #1e1e30',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  backgroundColor: fixture.color, flexShrink: 0,
                  boxShadow: `0 0 8px ${fixture.color}`,
                }} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>
                  {fixture.type} {fixture.sport}
                </span>
                <span style={{ color: '#555', fontSize: '13px', marginLeft: 'auto' }}>
                  {fixture.date} | {fixture.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>Recent Results</h2>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {recentResults.map((result, i) => (
              <div key={i} style={{
                minWidth: '140px',
                background: '#13131f',
                border: '1px solid #1e1e30',
                borderRadius: '16px',
                padding: '16px',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '600' }}>{result.sport}</span>
                  <span style={{
                    background: result.result === 'win' ? '#22c55e' : result.result === 'loss' ? '#ef4444' : '#f59e0b',
                    color: 'white', fontSize: '10px', fontWeight: '800',
                    padding: '3px 8px', borderRadius: '20px',
                  }}>
                    {result.result.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>
                  {result.scoreFor}{result.scoreAgainst ? `-${result.scoreAgainst}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '430px',
        background: '#0d0d1a', borderTop: '1px solid #1e1e30',
        display: 'flex', justifyContent: 'space-around',
        padding: '12px 0 20px', zIndex: 100,
      }}>
        {[
          { id: 'home', label: 'Home', emoji: '🏠' },
          { id: 'sports', label: 'Sports', emoji: '🏅' },
          { id: 'track', label: 'Track', emoji: '📈' },
          { id: 'social', label: 'Social', emoji: '👥' },
          { id: 'profile', label: 'Profile', emoji: '👤' },
        ].map((item) => (
          <button key={item.id} onClick={() => { setActiveNavLocal(item.id); setActiveNav(item.id); }} style={{
            background: 'none', border: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '4px', cursor: 'pointer', padding: '4px 12px',
          }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <span style={{
              fontSize: '10px', fontWeight: '600',
              color: activeNav === item.id ? '#a855f7' : '#555',
            }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('home')
const [activeSport, setActiveSport] = useState<string | null>(null);
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
if (activeNav === 'log-session') {
  return <LogSession setActiveNav={setActiveNav} />
}
if (activeNav === 'fixtures') {
  return <FixturesPage setActiveNav={setActiveNav} />
}
if (activeNav === 'suggested-drills') {
  return <SuggestedDrills setActiveNav={setActiveNav} />
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
  return <SocialPage setActiveNav={setActiveNav} />
}
if (activeNav === 'profile') {
  return <ProfilePage setActiveNav={setActiveNav} />
}

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
        style={{ paddingBottom: '90px', overflowY: 'auto', height: '100vh' }}
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
            style={{ position: 'relative', width: '180px', height: '180px' }}
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
                strokeDasharray={`${2 * Math.PI * 75 * 0.72} ${
                  2 * Math.PI * 75
                }`}
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
              <div style={{ fontSize: '36px', fontWeight: '800' }}>72%</div>
              <div
                style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}
              >
                Weekly Goal
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
