#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function generatePerformanceReport() {
  const reportsDir = path.join(process.cwd(), "reports");

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    bundleAnalysis: {
      target: "250KB compressed",
      status: "pending",
    },
    testCoverage: {
      target: "80%",
      status: "pending",
    },
    webVitals: {
      fcp: { target: "<1.8s", status: "pending" },
      lcp: { target: "<2.5s", status: "pending" },
      cls: { target: "<0.1", status: "pending" },
      fid: { target: "<100ms", status: "pending" },
    },
    e2eTests: {
      status: "pending",
    },
  };

  // Check if coverage report exists
  const coverageFile = path.join(reportsDir, "unit", "coverage-summary.json");
  if (fs.existsSync(coverageFile)) {
    try {
      const coverage = JSON.parse(fs.readFileSync(coverageFile, "utf8"));
      const totalCoverage = coverage.total;

      report.testCoverage.lines = `${totalCoverage.lines.pct}%`;
      report.testCoverage.functions = `${totalCoverage.functions.pct}%`;
      report.testCoverage.branches = `${totalCoverage.branches.pct}%`;
      report.testCoverage.statements = `${totalCoverage.statements.pct}%`;

      const minCoverage = Math.min(
        totalCoverage.lines.pct,
        totalCoverage.functions.pct,
        totalCoverage.branches.pct,
        totalCoverage.statements.pct
      );

      report.testCoverage.status = minCoverage >= 80 ? "passed" : "failed";
    } catch (error) {
      report.testCoverage.status = "error";
    }
  }

  // Check if E2E report exists
  const e2eFile = path.join(reportsDir, "e2e", "results.json");
  if (fs.existsSync(e2eFile)) {
    try {
      const e2eResults = JSON.parse(fs.readFileSync(e2eFile, "utf8"));
      report.e2eTests.passed = e2eResults.stats?.passed || 0;
      report.e2eTests.failed = e2eResults.stats?.failed || 0;
      report.e2eTests.status =
        e2eResults.stats?.failed === 0 ? "passed" : "failed";
    } catch (error) {
      report.e2eTests.status = "error";
    }
  }

  const reportFile = path.join(reportsDir, "performance-report.json");
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

  console.log("📊 Performance Report Generated");
  console.log("==============================");
  console.log(`Report saved to: ${reportFile}`);
  console.log(`Test Coverage: ${report.testCoverage.status}`);
  console.log(`E2E Tests: ${report.e2eTests.status}`);
  console.log(`Bundle Analysis: ${report.bundleAnalysis.status}`);
}

generatePerformanceReport();
