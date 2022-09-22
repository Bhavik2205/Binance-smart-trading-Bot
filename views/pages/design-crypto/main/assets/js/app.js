document.querySelectorAll('.sidebar-area .wraplist li.open').forEach((menuItem) =>{
  menuItem.addEventListener('click', () =>{
    menuItem.classList.toggle('show');
  });
});

function sidebarToggler(){
  document.querySelector('.logo-area').classList.toggle('folded');
  document.querySelector('.sidebar-area').classList.toggle('folded');
  document.querySelector('.content-area').classList.toggle('expanded');
}

document.querySelector('.notify-toggle-wrapper').addEventListener('click', () =>{
  if (document.querySelector('.notifications').style.display == 'block') {
    document.querySelector('.notifications').style.display = 'none';
  }
  else{
    document.querySelector('.notifications').style.display = 'block';
  }
  document.querySelector('.messages').style.display = 'none';
  document.querySelector('.profile-menu').style.display = 'none';
});
document.querySelector('.message-toggle-wrapper').addEventListener('click', () =>{
  if (document.querySelector('.messages').style.display =='block') {
    document.querySelector('.messages').style.display = 'none';
  }
  else {
    document.querySelector('.messages').style.display = 'block';
  }
  document.querySelector('.notifications').style.display = 'none';
  document.querySelector('.profile-menu').style.display = 'none';
});
document.querySelector('.profile').addEventListener('click', () =>{
  if (document.querySelector('.profile-menu').style.display =='block') {
    document.querySelector('.profile-menu').style.display = 'none';
  }
  else {
    document.querySelector('.profile-menu').style.display = 'block';
  }
  document.querySelector('.messages').style.display = 'none';
  document.querySelector('.notifications').style.display = 'none';
});

// account chart
const accountBalance = document.getElementById('Account-Balance').getContext('2d');
const accountBalanceChart = new Chart(accountBalance, {
  type: 'line',
  data: {
    labels: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
    datasets: [{
      label: '',
      data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
      fill: true,
      drawActiveElementsOnTop: 'false',
      backgroundColor: [
        'rgba(98, 255, 196, .7)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  }
});

// Income chart
const totalIncome = document.getElementById('Total-Income').getContext('2d');
const totalIncomeChart = new Chart(totalIncome, {
  type: 'line',
  data: {
    labels: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
    datasets: [{
      label: '',
      data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
      fill: true,
      drawActiveElementsOnTop: 'false',
      backgroundColor: [
        'rgba(162, 98, 255, .5)'
      ],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  }
});

// Return Rate chart
const returnRate = document.getElementById('Return-Rate-Chart').getContext('2d');
const returnRateChart = new Chart(returnRate, {
  type: 'line',
  data: {
    labels: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
    datasets: [{
      label: '',
      data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
      fill: true,
      drawActiveElementsOnTop: 'false',
      backgroundColor: [
        'rgba(255, 135, 45, .5)'
      ],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  }
});

// Trades Number chart
const tradesNumber = document.getElementById('Trades-Number-Chart').getContext('2d');
const tradesNumberChart = new Chart(tradesNumber, {
  type: 'line',
  data: {
    labels: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
    datasets: [{
      label: '',
      data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
      fill: true,
      drawActiveElementsOnTop: 'false',
      backgroundColor: [
        'rgba(28, 255, 69, .5)'
      ],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  }
});

// Crypto-Balance-Statistics chart
const cryptoBalance = document.getElementById('Crypto-Balance-Statistics').getContext('2d');
const cryptoBalanceChart = new Chart(cryptoBalance, {
  type: 'line',
  data: {
    labels: ['02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45',
    '04:00', '04:15', '04:30', '04:45'],
    datasets: [{
      label: '',
      data: [230, 270, 220, 290, 200, 250, 340, 330, 290, 330, 390, 300],
      fill: true,
      drawActiveElementsOnTop: 'false',
      backgroundColor: [
        'rgba(42, 178, 255, .5)'
      ],
      borderWidth: 5
    }]
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  }
});

// Crypto-Balance-Statistics chart
const transactionsStatus = document.getElementById('Transactions-Status').getContext('2d');
const transactionsStatusChart = new Chart(transactionsStatus, {
  type: 'doughnut',
  data: {
    datasets: [{
      label: 'My First Dataset',
      data: [200, 250, 100, 120],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(41, 254, 135)',
        'rgb(220, 220, 220)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
});

// Crypto-Balance-Statistics chart
const totalFunds = document.getElementById('Total-Funds').getContext('2d');
const ttotalFundsChart = new Chart(totalFunds, {
  type: 'bar',
  data: {
    labels: [5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10, 9, 4, 7],
    datasets: [{
      label: '',
      data: [5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10, 9, 4, 7],
      backgroundColor: [
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)',
        'rgba(35, 200, 229)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      x: {
        display: false
      },
      y: {
        beginAtZero: true,
        display: false
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  }
});
