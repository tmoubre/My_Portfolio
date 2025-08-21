import React, { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import './resume.css'

export default function Resume() {
  const resumeRef = useRef(null)

  const downloadPdf = async () => {
    const el = resumeRef.current
    if (!el) return
    // Make sure everything is visible on a white canvas
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'pt', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth
    const imgHeight = canvas.height * (imgWidth / canvas.width)

    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add extra pages if needed
    while (heightLeft > 0) {
      position -= pageHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save('Troy-Oubre-Resume.pdf')
  }

  return (
    <div className="resume-page container">
      <div className="resume-toolbar no-print">
        <button className="pill" onClick={downloadPdf}>Download PDF</button>
        <a className="modal-secondary" href="/Troy-Oubre-Resume.pdf" download>Download current PDF</a>
      </div>

      {/* Resume content */}
      <article ref={resumeRef} className="resume-root" aria-label="Resume">
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
            and cross‑functional execution. Partner to operations and project leaders on budgeting, forecasting, and KPI tracking.
            Recently completed a full‑stack engineering program and built several production‑style apps (React, Node/Express,
            serverless PWA, React Native, Angular). Known for clear reporting, process rigor, and hands‑on delivery.
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
            <li>Cross‑Functional Team Leadership</li>
          </ul>
        </section>

        <section>
          <h2>Experience</h2>

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
              <li>Lead job‑cost reviews with project managers and estimators; tighten margin controls and variance tracking.</li>
              <li>Prepare journals, accruals, capex tracking, and intercompany reconciliations to close on schedule.</li>
              <li>Design operational reports and dashboards to surface trends and project health to stakeholders.</li>
              <li>Oversee system rollouts (timekeeping, job tracking) and improve data integrity and reporting accuracy.</li>
              <li>Manage PO workflows, validate vendor invoices, and enforce procurement controls.</li>
              <li>Support bid prep and executive presentations for high‑value opportunities.</li>
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
              <li>Directed divisional financial ops—billing, procurement, and resource allocation—while improving visibility.</li>
              <li>Administered inventory controls for assets valued between $30M–$100M, driving accountability and cost efficiency.</li>
              <li>Supervised a multi‑functional team; standardized processes across departments.</li>
              <li>Negotiated supplier agreements and optimized purchasing terms to reduce operating costs.</li>
            </ul>
          </div>

          <div className="role">
            <div className="role-head">
              <h3>Division Resource Manager</h3>
              <div className="right">
                <div>Brand Energy & Infrastructure Services — LaPlace, LA</div>
                <div>2015 – 2018</div>
              </div>
            </div>
            <ul>
              <li>Led a 10–20 person team to improve operational efficiency, resource planning, and on‑time delivery.</li>
              <li>Conducted job‑cost reviews and analyzed project results to guide profitability and strategy.</li>
              <li>Partnered with billing to ensure accurate, timely invoicing and receivables management.</li>
              <li>Delivered KPI dashboards tracking project financial health for leadership.</li>
            </ul>
          </div>

          <div className="role">
            <div className="role-head">
              <h3>Environmental Health & Safety Specialist</h3>
              <div className="right">
                <div>Brand Energy & Infrastructure Services</div>
                <div>2011 – 2015</div>
              </div>
            </div>
            <ul>
              <li>Implemented safety programs and training; performed incident investigations and OSHA compliance reviews.</li>
              <li>Collaborated with operations to reduce risk and support safe, reliable execution.</li>
            </ul>
          </div>

          <div className="role">
            <div className="role-head">
              <h3>Field Supervisor</h3>
              <div className="right">
                <div>Sci‑Net, LLC — Baton Rouge, LA</div>
                <div>Jun 2007 – Jul 2010</div>
              </div>
            </div>
            <ul>
              <li>Oversaw field operations and technician scheduling, maintaining customer satisfaction and SLAs.</li>
              <li>Monitored infrastructure health, including database and server performance; resolved issues quickly.</li>
            </ul>
          </div>

          <div className="role">
            <div className="role-head">
              <h3>Systems Support Specialist II</h3>
              <div className="right">
                <div>Cox Communications — Baton Rouge, LA</div>
                <div>Jun 2001 – Jul 2007</div>
              </div>
            </div>
            <ul>
              <li>Established help desk operations for VOIP/HSI; defined escalation paths and resolution protocols.</li>
              <li>Performed troubleshooting, ticket analysis, and user training to improve service delivery.</li>
              <li>Contributed end‑user insights to Unisys software initiatives.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Education & Certifications</h2>
          <ul className="flat">
            <li><strong>Associate of Science, Computer Information Systems</strong> — ITI Technical College, Baton Rouge, LA</li>
            <li><strong>Associate of Science, Computer Information Systems</strong> — Remington College, Baton Rouge, LA</li>
          </ul>
          <p className="muted">
            Certifications: CSST, CSS, NCCER Safety Certified, OSHA‑10 & OSHA‑30, First Aid/CPR (Alliance Safety Council)
          </p>
        </section>
      </article>
    </div>
  )
}
