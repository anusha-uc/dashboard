const mongoose = require('mongoose');

const dashboardDataSchema = mongoose.Schema(
    {
        end_year: { type: String, default: '' },
        intensity: { type: Number, required: false },
        sector: { type: String, required: false },
        topic: { type: String, required: false },
        insight: { type: String, required: false },
        url: { type: String, required: false },
        region: { type: String, required: false },
        start_year: { type: String, default: '' },
        impact: { type: String, default: '' },
        added: { type: Date, required: false },
        published: { type: Date, required: false },
        country: { type: String, required: false },
        relevance: { type: Number, required: false },
        pestle: { type: String, required: false },
        source: { type: String, required: false },
        title: { type: String, required: false },
        likelihood: { type: Number, required: false }
    }
);

const DashboardData = mongoose.model('dashboard_data', dashboardDataSchema);

module.exports = DashboardData;