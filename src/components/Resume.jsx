// src/components/Resume.jsx
import React, { useRef } from 'react'
import './resume.css'

export default function Resume({ inModal = false }) {
  const resumeRef = useRef(null)

  const downloadPdf = async () => {
    // Lazy-load to keep your main bundle light
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default

    const el = resumeRef.current
    if (!el) return

    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'pt', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth
    const imgHeight = canvas.height * (imgWidth / canvas.width)

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position -= pageHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save('Troy-Oubre-Resume.pdf')
  }

  return (
    <div className={`resume-root ${inModal ? 'resume-in-modal' : ''}`} aria-label="Resume">
      {/* Toolbar appears on the resume itself (inside the modal) */}
      <div className="resume-toolbar no-print">
        <button className="pill pill-sm" onClick={downloadPdf}>Download PDF</button>
        {/* Direct file link from /public */}
        <a className="modal-secondary btn-sm" href="/Troy-Oubre-Resume.pdf" download>
          Direct download
        </a>
      </div>

      {/* Content captured for PDF */}
      <article ref={resumeRef}>
        <header className="resume-header">
          <h1 className="name">Troy Oubre</h1>
          <div className="meta">
            <span>Baton Rouge, LA</span>
            <span>•</span>
            <a href="tel:+15047150645">(504) 715-0645</a>
            <span>•</span>
            <a href="mailto:oubre1@att.net">oubre1@att.net</a>
            <span>•</span>
            <a href="https://troys-portfolio.netlify.app" target="_blank" rel="noreferrer">Portfolio</a>
            <span>•</span>
            <a href="https://github.com/tmoubre" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </header>

        <section>
          <h2>Professional Summary</h2>
          <p>
            Operations Controller with 15+ years of experience driving financial control, job costing, inventory accountability,
            and cross-functional execution. Recently completed a full-stack engineering program and built production-style apps
            (React, Node/Express, serverless PWA, React Native, Angular). Known for clear reporting, process rigor, and hands-on delivery.
          </p>
        </section>

        <section>
          <h2>Core Strengths</h2>
          <ul className="cols">
            <li>Operations & Financial Control</li>
            <li>Budgeting & Forecasting</li>
            <li>Project Accounting & Job Costing</li>
            <li>KPI Development & Dashboards</li>
            <li>Inventory & Asset Management</li>
            <li>Intercompany Accounting</li>
            <li>Internal Controls & Compliance</li>
            <li>Systems Implementation</li>
            <li>Vendor & Contract Management</li>
            <li>Cross-Functional Team Leadership</li>
          </ul>
        </section>

        <section>
          <h2>Experience</h2>

        {/* ——— Role blocks abbreviated; keep your current list or edit here ——— */}
          <div className="role">
            <div className="role-head">
              <h3>Operations Controller</h3>
              <div className="right">
                <div>BrandSafway, LLC — Boutte, LA</div>
                <div>Mar 2021 – Present</div>
              </div>
            </div>
            <ul>
              <li>Own divisional budgeting, forecasting, and monthly close; standardize KPI cadence for leadership.</li>
              <li>Lead job-cost reviews with project managers and estimators; tighten margin controls and variance tracking.</li>
              <li>Prepare journals, accruals, capex tracking, and intercompany reconciliations to close on schedule.</li>
              <li>Design reports/dashboards surfacing trends and project health to stakeholders.</li>
              <li>Oversee system rollouts (timekeeping, job tracking) and improve data integrity.</li>
            </ul>
          </div>

          <div className="role">
            <div className="role-head">
              <h3>Division Resource Manager / Office Manager</h3>
              <div className="right">
                <div>BrandSafway, LLC — Boutte, LA</div>
                <div>Aug 2018 – Mar 2021</div>
              </div>
            </div>
            <ul>
              <li>Directed divisional billing, procurement, and resource allocation while improving visibility.</li>
              <li>Administered inventory controls for assets valued between $30M–$100M.</li>
              <li>Supervised a multi-functional team; standardized processes across departments.</li>
            </ul>
          </div>

          {/* Add the rest of your roles here, same structure */}
        </section>

        <section>
          <h2>Education & Certifications</h2>
          <ul className="flat">
            <li><strong>Associate of Science, Computer Information Systems</strong> — ITI Technical College, Baton Rouge, LA</li>
            <li><strong>Associate of Science, Computer Information Systems</strong> — Remington College, Baton Rouge, LA</li>
          </ul>
          <p className="muted">Certs: CSST, CSS, NCCER Safety, OSHA-10 & OSHA-30, First Aid/CPR (Alliance Safety Council)</p>
        </section>
      </article>
    </div>
  )
}
      
