const API_MAPPING = [
    { path: "/APIS/CYI1", name: "嘉義機場資訊(入境)" },
    { path: "/APIS/CYI2", name: "嘉義機場資訊(出境)" },
    { path: "/APIS/HSZ1", name: "新竹港資訊(入境)" },
    { path: "/APIS/HSZ2", name: "新竹港資訊(出境)" },
    { path: "/APIS/HUN1", name: "花蓮機場資訊(入境)" },
    { path: "/APIS/HUN2", name: "花蓮機場資訊(出境)" },
    { path: "/APIS/HUN3", name: "花蓮港資訊(入境)" },
    { path: "/APIS/HUN4", name: "花蓮港資訊(出境)" },
    { path: "/APIS/KHH11", name: "高雄機場資訊(入境)" },
    { path: "/APIS/KHH12", name: "高雄機場資訊(出境)" },
    { path: "/APIS/KHH21", name: "高雄港資訊(入境)" },
    { path: "/APIS/KHH22", name: "高雄港資訊(出境)" },
    { path: "/APIS/KHH31", name: "高雄港六號碼頭資訊(入境)" },
    { path: "/APIS/KHH32", name: "高雄港六號碼頭資訊(出境)" },
    { path: "/APIS/KIN1", name: "金門機場資訊(入境)" },
    { path: "/APIS/KIN2", name: "金門機場資訊(出境)" },
    { path: "/APIS/KIN3", name: "金門水頭港資訊(入境)" },
    { path: "/APIS/KIN4", name: "金門水頭港資訊(出境)" },
    { path: "/APIS/KLU1", name: "基隆港資訊(入境)" },
    { path: "/APIS/KLU2", name: "基隆港資訊(出境)" },
    { path: "/APIS/KyS1", name: "馬祖南竿機場資訊(入境)" },
    { path: "/APIS/KyS2", name: "馬祖南竿機場資訊(出境)" },
    { path: "/APIS/KyS3", name: "馬祖福澳港資訊(入境)" },
    { path: "/APIS/KyS4", name: "馬祖福澳港資訊(出境)" },
    { path: "/APIS/MZG1", name: "澎湖機場資訊(入境)" },
    { path: "/APIS/MZG2", name: "澎湖機場資訊(出境)" },
    { path: "/APIS/MZG3", name: "馬公港資訊(入境)" },
    { path: "/APIS/MZG4", name: "馬公港資訊(出境)" },
    { path: "/APIS/TNN1", name: "台南機場資訊(入境)" },
    { path: "/APIS/TNN2", name: "台南機場資訊(出境)" },
    { path: "/APIS/TNN3", name: "安平港資訊(入境)" },
    { path: "/APIS/TNN4", name: "安平港資訊(出境)" },
    { path: "/APIS/TPE11", name: "桃園機場資訊(入境第一航廈)" },
    { path: "/APIS/TPE12", name: "桃園機場資訊(出境第一航廈)" },
    { path: "/APIS/TPE21", name: "桃園機場資訊(入境第二航廈)" },
    { path: "/APIS/TPE22", name: "桃園機場資訊(出境第二航廈)" },
    { path: "/APIS/TSA1", name: "台北機場資訊(入境)" },
    { path: "/APIS/TSA2", name: "台北機場資訊(出境)" },
    { path: "/APIS/TTT1", name: "台東機場資訊(入境)" },
    { path: "/APIS/TTT2", name: "台東機場資訊(出境)" },
    { path: "/APIS/TWTXG1", name: "台中機場資訊(入境)" },
    { path: "/APIS/TWTXG2", name: "台中機場資訊(出境)" },
    { path: "/APIS/TWTXG3", name: "台中港資訊(入境)" },
    { path: "/APIS/TWTXG5", name: "台中港資訊(出境)" }
];

// Use local proxy to bypass CORS
const BASE_URL = "/proxy?path=";

// Cache for pre-fetched data
let cachedData = {};

document.addEventListener('DOMContentLoaded', () => {
    const locationSelect = document.getElementById('location-select');
    const searchBtn = document.getElementById('search-btn');
    const tableBody = document.getElementById('table-body');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('empty-state');
    const resultsMeta = document.getElementById('results-meta');
    const currentQueryText = document.getElementById('current-query');
    const dataCountText = document.getElementById('data-count');
    const initLoading = document.getElementById('init-loading');
    const initProgress = document.getElementById('init-progress');
    const initProgressText = document.getElementById('init-progress-text');

    // Initially disable the search button and show loading
    searchBtn.disabled = true;
    searchBtn.classList.add('opacity-50', 'cursor-not-allowed');
    locationSelect.disabled = true;

    // Pre-fetch all APIs to check which have data
    async function initializeDropdown() {
        const total = API_MAPPING.length;
        let completed = 0;
        const availableAPIs = [];

        // Show initial loading state
        initLoading.classList.remove('hidden');
        emptyState.classList.add('hidden');

        // Create an array of fetch promises
        const fetchPromises = API_MAPPING.map(async (item) => {
            try {
                const response = await fetch(`${BASE_URL}${item.path}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && Array.isArray(data) && data.length > 0) {
                        // Calculate total pax count
                        let totalPax = 0;
                        data.forEach(record => {
                            totalPax += parseInt(record.paxCnt || record.countNum || 0);
                        });
                        availableAPIs.push({
                            ...item,
                            count: data.length,
                            totalPax: totalPax,
                            data: data // Cache the data
                        });
                    }
                }
            } catch (err) {
                // Silently ignore failed requests
                console.log(`Skipped ${item.name}: ${err.message}`);
            } finally {
                completed++;
                const percent = Math.round((completed / total) * 100);
                initProgress.style.width = `${percent}%`;
                initProgressText.textContent = `正在檢查可用資料... (${completed}/${total})`;
            }
        });

        // Wait for all fetches to complete
        await Promise.allSettled(fetchPromises);

        // Sort by total pax count (descending)
        availableAPIs.sort((a, b) => b.totalPax - a.totalPax);

        // Populate dropdown with only available APIs
        locationSelect.innerHTML = '<option value="">-- 請選擇機場或港口 --</option>';

        if (availableAPIs.length === 0) {
            // No data available from any API
            initLoading.classList.add('hidden');
            emptyState.querySelector('p').textContent = '目前所有 API 均無資料，請稍後再試。';
            emptyState.classList.remove('hidden');
            return;
        }

        availableAPIs.forEach(item => {
            const option = document.createElement('option');
            option.value = item.path;
            option.textContent = `${item.name} — ${item.totalPax.toLocaleString()} 人次`;
            locationSelect.appendChild(option);
            // Cache the data for instant display later
            cachedData[item.path] = item.data;
        });

        // Hide loading, enable controls
        initLoading.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.querySelector('p').textContent = `已找到 ${availableAPIs.length} 個有資料的查詢點，請選擇後點擊「執行查詢」`;

        searchBtn.disabled = false;
        searchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        locationSelect.disabled = false;
    }

    // Start initialization
    initializeDropdown();

    searchBtn.addEventListener('click', async () => {
        const selectedPath = locationSelect.value;
        if (!selectedPath) {
            alert('請先選擇一個查詢地點。');
            return;
        }

        const selectedName = locationSelect.options[locationSelect.selectedIndex].text;

        // UI States
        loading.classList.remove('hidden');
        emptyState.classList.add('hidden');
        resultsMeta.classList.add('hidden');
        resultsMeta.classList.remove('flex');
        document.getElementById('dashboard-section').classList.add('hidden');
        document.getElementById('dashboard-section').classList.remove('block');
        tableBody.innerHTML = '';

        try {
            // Use cached data if available, otherwise fetch fresh
            let data;
            if (cachedData[selectedPath]) {
                data = cachedData[selectedPath];
            } else {
                const response = await fetch(`${BASE_URL}${selectedPath}`);
                if (!response.ok) throw new Error('連線伺服器失敗');
                data = await response.json();
            }

            if (data && data.length > 0) {
                renderTable(data);
                updateDashboard(data);
                currentQueryText.textContent = selectedName.split(' — ')[0]; // Remove the count suffix
                dataCountText.textContent = `${data.length.toLocaleString()} 筆資料`;
                resultsMeta.classList.remove('hidden');
                resultsMeta.classList.add('flex');
                document.getElementById('dashboard-section').classList.remove('hidden');
                document.getElementById('dashboard-section').classList.add('block');
            } else {
                emptyState.querySelector('p').textContent = '該地點目前沒有預報資料。';
                emptyState.classList.remove('hidden');
            }
        } catch (error) {
            console.error(error);
            emptyState.querySelector('p').textContent = '查詢出錯，請檢查連線或稍後再試。';
            emptyState.classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    });

    const CHART_PALETTE = [
        '#F59E0B', // Amber
        '#10B981', // Emerald
        '#3B82F6', // Blue
        '#8B5CF6', // Violet
        '#EC4899', // Pink
        '#F43F5E', // Rose
        '#06B6D4'  // Cyan
    ];

    function updateDashboard(data) {
        // 1. Total Pax
        let totalPax = 0;
        const nats = {};
        const terms = {};
        const ages = {};

        data.forEach(item => {
            const count = parseInt(item.paxCnt || item.countNum || 0);
            totalPax += count;

            // Stats for visualizations
            const nat = item.nationality || '未知';
            nats[nat] = (nats[nat] || 0) + count;

            const term = item.terminal || item.port || 'N/A';
            terms[term] = (terms[term] || 0) + count;

            const age = item.age || '未知';
            ages[age] = (ages[age] || 0) + count;
        });

        document.getElementById('kpi-total-pax').textContent = totalPax.toLocaleString();

        // 2. Top Nationality
        const topNat = Object.entries(nats).sort((a, b) => b[1] - a[1])[0];
        document.getElementById('kpi-top-nat').textContent = topNat ? topNat[0] : '-';

        // 3. Top Terminal
        const topTerm = Object.entries(terms).sort((a, b) => b[1] - a[1])[0];
        document.getElementById('kpi-top-term').textContent = topTerm ? topTerm[0] : '-';

        // 4. Render Bars for Top 5 Nationalities
        const natContainer = document.getElementById('nat-distribution');
        natContainer.innerHTML = '';
        Object.entries(nats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .forEach(([name, count], index) => {
                const percent = (count / totalPax * 100).toFixed(1);
                renderBar(natContainer, name, percent, `${count.toLocaleString()} 人`, CHART_PALETTE[index % CHART_PALETTE.length]);
            });

        // 5. Render Bars for Ages
        const ageContainer = document.getElementById('age-distribution');
        ageContainer.innerHTML = '';
        Object.entries(ages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .forEach(([name, count], index) => {
                const percent = (count / totalPax * 100).toFixed(1);
                renderBar(ageContainer, name, percent, `${count.toLocaleString()} 人`, CHART_PALETTE[(index + 2) % CHART_PALETTE.length]);
            });
    }

    function renderBar(container, label, percent, valueText, color) {
        const row = document.createElement('div');
        row.className = 'flex flex-col gap-3 transition-all duration-500 animate-in fade-in slide-in-from-left';
        row.innerHTML = `
            <div class="flex justify-between text-base font-bold">
                <span class="text-slate-900">${label}</span>
                <span class="text-slate-700 font-mono">${valueText} (${percent}%)</span>
            </div>
            <div class="h-4 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300/30">
                <div class="bar-fill h-full transition-all duration-1000 ease-out rounded-full" 
                     style="width: 0%; background-color: ${color}; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"></div>
            </div>
        `;
        container.appendChild(row);

        // Animate bar
        setTimeout(() => {
            row.querySelector('.bar-fill').style.width = `${percent}%`;
        }, 100);
    }

    function renderTable(data) {
        data.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors border-b border-slate-100';

            tr.innerHTML = `
                <td class="px-8 py-5 font-mono text-sm text-orange-600 font-black">${item.terminal || item.port || '-'}</td>
                <td class="px-8 py-5 font-bold text-slate-800">${item.location || '-'}</td>
                <td class="px-8 py-5">
                    <span class="px-3 py-1 rounded-full text-xs font-black tracking-widest ${item.gender === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}">
                        ${item.gender === 'M' ? 'MALE' : 'FEMALE'}
                    </span>
                </td>
                <td class="px-8 py-5 text-slate-700 font-medium">${item.age || '-'}</td>
                <td class="px-8 py-5">
                    <div class="flex items-center gap-3">
                        <span class="w-3 h-3 rounded-full bg-emerald-500 border-2 border-emerald-700"></span>
                        <span class="font-black text-slate-900">${item.nationality || '-'}</span>
                    </div>
                </td>
                <td class="px-8 py-5 font-mono font-black text-orange-600 text-right text-lg">${parseInt(item.paxCnt || item.countNum || 0).toLocaleString()}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
});
