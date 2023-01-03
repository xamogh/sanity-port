import Head from 'next/head'
import {Poppins} from '@next/font/google'
import styles from '../styles/Home.module.css'
import {createClient} from 'next-sanity'

const roboto = Poppins({
  weight: '300',
  subsets: ['latin'],
})

export default function Home({contents, assets, skills, projects, sections, socials}: any) {
  const aboutSection = sections.find((s) => s.slug?.current === 'about-section')
  let aboutSectionContent = contents.find((c) => c.section._ref === aboutSection._id)
  let aboutSectionImage = assets.find((a) => a.section._ref === aboutSection._id)

  aboutSectionContent = aboutSectionContent.content || 'No content found'

  const languages = skills[0]?.languages
  const tools = skills[0]?.tools_and_frameworks

  return (
    <>
      <Head>
        <title>I and Me</title>
        <meta name="description" content="Personal Webpage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={[roboto.className, styles.root].join(' ')}>
        <div className="navbar-fixed">
          <nav className="grey lighten-5">
            <div className="nav-wrapper container">
              <ul className="right ">
                <div className="flex">
                  <li
                    onClick={() => {
                      document.getElementById('skills-id')?.scrollIntoView()
                    }}
                  >
                    <a className="grey-text text-darken-4">Skills</a>
                  </li>
                  <li
                    onClick={() => {
                      document.getElementById('projects-id')?.scrollIntoView()
                    }}
                  >
                    <a className="grey-text text-darken-4">Projects</a>
                  </li>
                </div>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container">
          <div className="row" style={{height: 'calc(100vh - 72px)', paddingTop: '32px'}}>
            <div className="col m6 s12">
              <h1>Hi There 👋</h1>
              <p style={{fontSize: '16px'}}>{aboutSectionContent}</p>
            </div>
            <div className="col m6 s12 right-align">
              <img
                src={aboutSectionImage.imageUrl}
                height="400px"
                style={{
                  paddingTop: '32px',
                }}
              />
            </div>
          </div>

          <div id="skills-id"></div>
        </div>
        <div className="teal lighten-3" style={{padding: '16px 0 32px 0'}}>
          <div className="container">
            <h2>Skills</h2>
            <h5>
              Languages: <span>{languages.name.join(', ')}</span>
            </h5>
            <h5>
              Tools and Frameworks: <span>{tools.name.join(', ')}</span>
            </h5>
          </div>

          <div id="projects-id"></div>
        </div>

        <div className="container" style={{paddingBottom: '32px'}}>
          <h2>Projects</h2>
          {projects.map((p, i) => (
            <div className="card" key={i}>
              <div className="card-image">
                <img src={p.imageUrl} />
              </div>
              <div className="card-content">
                <p>{p.description}</p>
              </div>
              <div className="card-action">
                <a href={p.link} target="_blank">
                  Link to the project
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="purple lighten-4" style={{padding: '32px 0'}}>
          <div className="container">
            <h3>Connect With Me</h3>
            {socials.map((s) => (
              <h5>
                {s.label}: {s.value}
              </h5>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

const client = createClient({
  projectId: '6lte4xfj',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false,
})

export async function getStaticProps() {
  const contents = await client.fetch(`*[_type == "content"]`)
  const assets = await client.fetch(
    `*[_type == "assets"]{"imageUrl": image.asset->url, _id, section}`
  )
  const skills = await client.fetch(`*[_type == "skill"]`)
  const projects = await client.fetch(
    `*[_type == "project"]{"imageUrl": image.asset->url, description, link, name}`
  )
  const sections = await client.fetch(`*[_type == "section"]`)
  const socials = await client.fetch(`*[_type == "social"]`)

  return {
    props: {contents, assets, skills, projects, sections, socials},
  }
}
