import { useState } from 'react'
import { X } from 'lucide-react'
import PhotoSlot from './PhotoSlot.jsx'
import Reveal from './Reveal.jsx'

const TEAM = [
  {
    name: 'Aarush T.',
    role: 'Team Captain',
    subteam: 'Chassis',
    photo: '/images/team-1.jpg',
    bio: 'Designs the vehicle\u2019s structural foundation in CAD and builds with carbon fiber, balancing weight, strength, and aerodynamics while keeping the car within safety requirements.',
  },
  {
    name: 'Aman D.',
    role: 'Chassis Lead',
    subteam: 'Chassis',
    photo: '/images/team-2.jpg',
    bio: 'Designs the vehicle\u2019s structural foundation in CAD and builds with carbon fiber, balancing weight, strength, and aerodynamics while keeping the car within safety requirements.',
  },
  {
    name: 'Sushant D.',
    role: 'Electronics Lead',
    subteam: 'Electronics',
    photo: '/images/team-3.jpg',
    bio: 'Manages wiring, sensors, and the data acquisition system that lets the team monitor performance and diagnose issues during testing and competition.',
  },
  {
    name: 'Ishaan A.',
    role: 'Media Lead',
    subteam: 'Internal Affairs',
    photo: '/images/team-4.jpg',
    bio: 'Manages social media accounts to ensure team has a proper presence online',
  },
  {
    name: 'Harini S.',
    role: 'Marketing Lead',
    subteam: 'Internal Affairs',
    photo: '/images/team-5.jpg',
    bio: 'Keeps track of emails and leads outreach iniatives',
  },
  {
    name: 'Sanika K.',
    role: 'Logistics Coordinator',
    subteam: 'Internal Affairs',
    photo: '/images/team-6.jpg',
    bio: 'Plans transportation, lodging, and everything else it takes to get a car and a team 2,200 miles to Indianapolis in one piece.',
  },
  {
    name: 'Natalia L.',
    role: 'Secretary',
    subteam: 'Internal Affairs',
    photo: '/images/team-7.jpg',
    bio: 'Manages relations with school',
  },
  {
    name: 'Isha R.',
    role: 'Treasurer',
    subteam: 'Powertrain',
    photo: '/images/team-8.jpg',
    bio: 'Manages finances of team and works on engine of vehicle.',
  },
  {
    name: 'First L.',
    role: 'Role Title',
    subteam: 'Electronics',
    photo: '/images/team-9.jpg',
    bio: 'One or two sentences about what they do on the team.',
  },
  {
    name: 'First L.',
    role: 'Role Title',
    subteam: 'Documentation',
    photo: '/images/team-10.jpg',
    bio: 'One or two sentences about what they do on the team.',
  },
  {
    name: 'First L.',
    role: 'Role Title',
    subteam: 'Marketing & Logistics',
    photo: '/images/team-11.jpg',
    bio: 'One or two sentences about what they do on the team.',
  },
  {
    name: 'First L.',
    role: 'Role Title',
    subteam: 'Internal Affairs',
    photo: '/images/team-12.jpg',
    bio: 'One or two sentences about what they do on the team.',
  },
]

export default function Team() {
  const [active, setActive] = useState(null)

  return (
    <section id="team" className="relative bg-ink py-24 md:py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="eyebrow text-sky text-xs mb-4">Meet the Team</div>
          <h2 className="font-display font-700 uppercase text-4xl md:text-5xl leading-tight mb-14 max-w-2xl">
            Four departments, one car
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {TEAM.map((member, i) => (
            <Reveal key={member.name + member.subteam} delay={(i % 6) * 70}>
              <button
                onClick={() => setActive(member)}
                className="hud-corners group text-left border border-white/10 bg-navy/40 hover:border-sky/50 transition-colors w-full"
              >
                <PhotoSlot
                  src={member.photo}
                  alt={member.name}
                  label={`${member.subteam} headshot`}
                  className="w-full h-40 md:h-52"
                />
                <div className="p-4">
                  <div className="font-display font-700 text-base leading-tight">
                    {member.name}
                  </div>
                  <div className="eyebrow text-[10px] text-sky mt-1">{member.subteam}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-ink/90 backdrop-blur-sm flex items-center justify-center px-6"
          onClick={() => setActive(null)}
        >
          <div
            className="hud-corners relative bg-navy border border-white/10 max-w-lg w-full grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 text-slate hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <PhotoSlot
              src={active.photo}
              alt={active.name}
              label={`${active.subteam} headshot`}
              className="w-full h-full min-h-[160px]"
            />
            <div className="p-6">
              <div className="eyebrow text-sky text-[10px] mb-1.5">{active.subteam}</div>
              <div className="font-display font-700 text-2xl leading-tight">{active.name}</div>
              <div className="text-slate text-sm mb-4">{active.role}</div>
              <p className="text-sm text-white/80 leading-relaxed">{active.bio}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
