import React from 'react';
import Layout from '@/components/Layout';
import { colors } from '@/constants/colors';

type Book = {
  title: string;
  author: string;
  description: string;
}

type Category = {
  name: string;
  books: Book[];
}

export const metadata = {
    title: 'Reading List | 道 Dao Study Group',
    description: 'A short list of recommended further reading.',
  };

export default function ReadingList() {
  const categories: Category[] = [
    {
      name: "Dao De Jing Translations",
      books: [
        {
            title: "Te-Tao Ching",
            author: "Robert G. Henricks",
            description: "A scholarly translation and analysis of the Ma-wang-tui manuscripts of the Tao Te Ching, which were discovered in 1973 and predate previously known versions of the text."
          },
        {
          title: "Laws Divine and Human",
          author: "Xu Yuanchong",
          description: "A translation by the prominent Chinese translator Xu Yuanchong."
        },
      ]
    },
    {
      name: "I Ching (Book of Changes)",
      books: [
        {
          title: "The Complete I Ching",
          author: "Taoist Master Alfred Huang",
          description: "A modern translation and interpretation of the I Ching that draws on his personal experience as a Taoist master and native Chinese speaker to provide detailed explanations of each hexagram, along with their changing lines and symbolic meanings."
        },
        {
          title: "I Ching or Book of Changes",
          author: "Richard Wilhelm",
          description: "Widely considered the definitive Western translation of this ancient Chinese divination text, providing detailed explanations of all 64 hexagrams along with their changing lines, accompanied by extensive commentaries drawing from traditional Chinese interpretations."
        },
      ]
    },
    {
      name: "Further Reading",
      books: [
        {
          title: "Qingjing Jing 太上老君说常清静经",
          author: "Lao Tzu",
          description: "A concise Taoist text traditionally attributed to Laozi that teaches the path to spiritual enlightenment through cultivating inner stillness and purity of mind."
        },
      ]
    },
  ];

  return (
    <Layout>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          <header className="space-y-2">
            <h1 className="text-4xl font-bold">Reading List</h1>
            <p className="text-xl" style={{ color: colors.amberWisdom }}>
            A short list of recommended further reading.
            </p>
          </header>

          <div className="space-y-16">
            {categories.map((category, index) => (
              <section key={index} className="space-y-6">
                <h2 className="text-2xl font-semibold pb-2 border-b-2" style={{ borderColor: colors.tealPrimary }}>
                  {category.name}
                </h2>
                <div className="space-y-8">
                  {category.books.map((book, bookIndex) => (
                    <article key={bookIndex} className="group space-y-2">
                      <h3 className="text-xl font-medium group-hover:text-[#2A9D8F] transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {book.author.startsWith('translated') ? book.author : 'by ' + book.author}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {book.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </main>
    </Layout>
  );
}