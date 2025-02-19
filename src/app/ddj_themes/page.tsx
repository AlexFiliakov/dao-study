import React from 'react';
import { CircleHelp } from 'lucide-react';
import Layout from '@/components/Layout';
import Image from 'next/image';

export const metadata = {
  title: 'Dao De Jing: Recurring Themes | 道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经).',
};

export default function DDJThemes () {
  return (
    <Layout>
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Image */}
          <div className="relative w-full aspect-[1920/774] rounded-lg overflow-hidden">
            <Image
              src="/images/temple daytime.png"
              alt="Yang Tian Gian Temple (仰天观)"
              layout="fill"
              objectFit="cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="w-full min-h-screen bg-neutral-50 pt-8 font-serif">
          {/* Header Section */}
          <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
              <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing</h1>
              <h1 className="text-3xl font-medium mb-2">Recurring Themes</h1>
              <p className="text-teal-100">道德经</p>
          </header>

          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-red-800">
            <div className="flex items-center mb-4">
              <CircleHelp className="text-red-800 mr-3" />
              <h2 className="text-xl text-neutral-800">About This List</h2>
            </div>
            These are the most frequently occurring words in the Dao De Jing, excluding common terms.<br /><br />
            <Image
              src="/images/char_frequency.png"
              alt="Dao De Jing Character Frequency"
              objectFit="cover"
              width={300}
              height={300}
              className="w-auto h-auto mb-6 md:mb-0" 
              priority
            /><br />
            They are grouped into somewhat arbitrary thematic collections below:
          </div>

          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            {/* <div className="flex items-center mb-4">
                <BookOpen className="text-teal-700 mr-3" />
                <h2 className="text-xl text-neutral-800">Recurring Themes</h2>
            </div> */}
            道 (dào) can be translated from around 300-200 BCE as: "Way," "Path," "Principle," "Teaching," or "Method."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Central to Daoist philosophy.</li>
              <li>Modern meaning has largely remained similar, incorporating additional connotations such as "Tao" in philosophical contexts.</li>
              <li>Dào is the theme of Chapters 1-37 of Dao De Jing.</li>
            </ul><br />
            德 (dé) can be translated from around 300-200 BCE as: "Virtue," "Moral&nbsp;character," "Intrinsic&nbsp;quality," or "Power."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Represents the active expression of the Dao.</li>
              <li>Modern meaning has evolved to include the sense of "Ethics" or "Morality."</li>
              <li>Dé is the theme of Chapters 38-81 of Dao De Jing.</li>
            </ul>
          </div>
          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            无 (wú) can be translated from around 300-200 BCE as: "Nonexistence," "Not&nbsp;having," "Lack," "Negation," or "Without."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Key to the Daoist idea of emptiness and non-attachment.</li>
              <li>Modern meaning has remained similar.</li>
            </ul><br />
            有 (yǒu) can be translated from around 300-200 BCE as: "Exist," "Having," "Possession," or "Being."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Often contrasted with wú to express the interplay of opposites.</li>
              <li>Modern meaning has remained similar.</li>
            </ul><br />
            为 (wéi) can be translated from around 300-200 BCE as: "Act," "Do," "Serve," "Become," or "For."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Central to the idea of wu wei (无为, non-action).</li>
              <li>Modern meaning has remained similar.</li>
            </ul><br />
            无为 (wú wéi) translates roughly to "Non-action" or "Effortless&nbsp;action."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>A foundational Daoist principle.</li>
              <li>See Chapters&nbsp;
                <a href="ddj_ch_2" rel="noopener noreferrer" className="text-red-800 hover:underline">2</a>, 3, 10, 29, 37, 38, 43, 48, 57, and 63.</li>
              <li><a href="ddj_ch_16" rel="noopener noreferrer" className="text-red-800 hover:underline">Also see the notes in Chapter 16.</a></li>
            </ul>
          </div>
          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            大 (dà) can be translated from around 300-200 BCE as: "Great," "Large," "Grand," "Vast," or "Significant."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Frequently used to describe the Dao and the natural order.</li>
              <li>Modern meaning has remained similar.</li>
            </ul><br />
            常 (cháng) can be translated from around 300-200 BCE as: "Always," "Constant," or "Eternal."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>It is a key concept in Daoism, emphasizing the unchanging flow of the Dao in accordance with natural law.</li>
              <li>Modern meaning has evolved to include the sense of "ordinary" or "usual."</li>
            </ul><br />
            下 (xià) can be translated from around 300-200 BCE as: "Below," "Under," "Lower," or "Down."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Often used metaphorically (e.g., rivers flowing downward).</li>
              <li>Modern meaning has remained similar, generally meaning "Below," "Under," or "Next."</li>
            </ul><br />
            知 (zhī) can be translated from around 300-200 BCE as: "Know," "Perceive," or "Awareness."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>It plays a crucial role in Daoist philosophy, often in contrast with deeper understanding or intuitive knowing.</li>
              <li>Modern meaning has remained similar.</li>
            </ul>
          </div>
          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            天 (tiān) can be translated from around 300-200 BCE as: "Heaven," "Sky" or "Nature."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Often represents the cosmic order.</li>
              <li>Modern meaning has remained similar, often meaning "Sky" or "Heaven."</li>
            </ul><br />
            地 (dì) can be translated from around 300-200 BCE as: "Earth," "Ground," "Land," "Soil," or "Territory."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Complements Tiān in describing the natural world.</li>
              <li>Modern meaning has remained similar.</li>
            </ul><br />
            天道 (tiān dào) translates roughly to "The Way of Heaven."
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>A naturalistic concept in Daoism.</li>
              <li>See Chapters 47 and 79.</li>
            </ul>
          </div>
          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            生 (shēng) can be translated from around 300-200 BCE as: "Arise," "Begin," "Give&nbsp;Birth," "Generate," "Live," or "Grow."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Central to Daoist ideas of nature and existence.</li>
              <li>Modern meaning has generally remained similar.</li>
            </ul><br />
            死 (sǐ) can be translated from around 300-200 BCE as: "Death," "Die," or "Perish."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Contrasts with Shēng in discussions of the natural cycle.</li>
              <li>Modern meaning has largely remained similar.</li>
            </ul><br />
            道生 (dào shēng) translates roughly to "The Dao gives birth."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>A recurring phrase about creation.</li>
              <li>See Chapters 42 and 51.</li>
            </ul>
          </div>
          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            自 (zì) can be translated from around 300-200 BCE as: "Self," "From," "By&nbsp;oneself," "Natural," "Inherent," or "Intrinsic."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Related to Ziran (自然), meaning "Naturalness."</li>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1rem' }}>
                <li>See Chapters 17, 23, 25, and 51.</li>
              </ul>
              <li>Modern meaning has evolved to include the sense of "oneself," "autonomously," or "automatically."</li>
            </ul><br />
            圣 (shèng) can be translated from around 300-200 BCE as: "Sage," "Holy," "Sacred," or "Wise."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Describes the ideal or enlightened ruler.</li>
              <li>Modern meaning has remained similar, often emphasizing "Saint" or "Sacred."</li>
            </ul><br />
            王 (wáng) can be translated from around 300-200 BCE as: "King," "Ruler," or "Sovereign" in general.<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Modern meaning has evolved to include the sense of "Monarch" or "Leader."</li>
            </ul><br />
            人 (rén) can be translated from around 300-200 BCE as: "Person," "Human," "Individual," "Man," or "People."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Used in discussions about governance and the sage.</li>
              <li>Modern meaning has largely remained similar.</li>
            </ul><br />
            民 (mín) can be translated from around 300-200 BCE as: "People," "Commoners," "The&nbsp;Masses," "Citizens," or "Subjects."<br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>Often mentioned in governance-related passages.</li>
              <li>Modern meaning has remained similar.</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
};