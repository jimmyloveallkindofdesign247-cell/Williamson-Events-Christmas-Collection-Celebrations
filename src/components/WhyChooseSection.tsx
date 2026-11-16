import { motion } from 'motion/react';
import { Award, Calendar, Heart, Sparkles, Star, Tag } from 'lucide-react';
import { WHY_CHOOSE_ITEMS, type WhyChooseItem } from '../data/christmasData';

function renderIcon(name: WhyChooseItem['iconName']) {
  const iconClass = 'h-5 w-5 text-[#D4AF37]';
  switch (name) {
    case 'sparkles':
      return <Sparkles className={iconClass} aria-hidden="true" />;
    case 'calendar':
      return <Calendar className={iconClass} aria-hidden="true" />;
    case 'award':
      return <Award className={iconClass} aria-hidden="true" />;
    case 'heart':
      return <Heart className={iconClass} aria-hidden="true" />;
    case 'tag':
      return <Tag className={iconClass} aria-hidden="true" />;
    case 'star':
      return <Star className={iconClass} aria-hidden="true" />;
  }
}

export function WhyChooseSection() {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="relative bg-[#FFFDF5] py-24 text-[#171717]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-[#171717]/10 pb-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#064E3B] uppercase">
              The Williamson Standard
            </p>
            <h2
              id="why-choose-heading"
              className="font-display text-balance mt-2 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold tracking-tight text-[#171717]"
            >
              WHY CHOOSE WILLIAMSON EVENTS?
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#171717]/75">
            Twelve winters of producing heritage galas, townhouse celebrations, and bespoke holiday
            decor across residences and flagship corporate venues.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex flex-col justify-between rounded-sm border border-[#171717]/10 bg-white p-7 transition-colors duration-200 hover:border-[#D4AF37]/60"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display tabular-nums text-2xl font-semibold text-[#8B0000]">
                    {item.number}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#064E3B]">
                    {renderIcon(item.iconName)}
                  </div>
                </div>

                <h3 className="font-display mt-5 text-2xl leading-snug font-semibold text-[#171717]">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#171717]/75">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
