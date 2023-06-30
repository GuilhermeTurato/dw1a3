
        $(document).ready(function() {
            const data = [
                {
                    doctor: 'joao',
                    gem: {
                        day: '1º Segunda-feira',
                        hour: '09:00'
                    },
                    local: {
                        day: '3º Terça-feira',
                        hour: '14:30'
                    }
                },
                {
                    doctor: 'marcos',
                    gem: {
                        day: '2º Terça-feira',
                        hour: '10:30'
                    },
                    local: {
                        day: '4º Quinta-feira',
                        hour: '16:00'
                    }
                }
            ];

            const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
            const currentDate = new Date();
            const diaAtual = currentDate.getDate();
            const mesAtual = currentDate.getMonth();
            const anoAtual = currentDate.getFullYear();

            function calcularProximoDiaAtendimento(medico) {
                let proximoDiaGem = '';
                let proximoDiaLocal = '';

                if (medico.hasOwnProperty('gem')) {
                    const gemDay = medico.gem.day;
                    const gemDayParts = gemDay.split(' ');
                    const ocorrencia = gemDayParts[0];
                    const diaSemana = gemDayParts[1];
                    const hora = gemDayParts[3];

                    const diaSemanaIndex = diasSemana.findIndex(dia => dia.toLowerCase() === diaSemana.toLowerCase());
                    const dataGem = new Date(anoAtual, mesAtual, 1);
                    while (dataGem.getDay() !== diaSemanaIndex) {
                        dataGem.setDate(dataGem.getDate() + 1);
                    }

                    switch (ocorrencia) {
                        case '1º':
                            proximoDiaGem = new Date(dataGem);
                            break;
                        case '2º':
                            proximoDiaGem = new Date(dataGem.setDate(dataGem.getDate() + 7));
                            break;
                        case '3º':
                            proximoDiaGem = new Date(dataGem.setDate(dataGem.getDate() + 14));
                            break;
                        case '4º':
                            proximoDiaGem = new Date(dataGem.setDate(dataGem.getDate() + 21));
                            break;
                        case '5º':
                            proximoDiaGem = new Date(dataGem.setDate(dataGem.getDate() + 28));
                            break;
                        default:
                            proximoDiaGem = '';
                            break;
                    }

                    if (proximoDiaGem !== '') {
                        const diaGem = proximoDiaGem.getDate();
                        const mesGem = proximoDiaGem.getMonth() + 1;
                        const anoGem = proximoDiaGem.getFullYear();
                        medico.gem.next = diaGem + '/' + mesGem + '/' + anoGem + ' ' + hora;
                    }
                }

                if (medico.hasOwnProperty('local')) {
                    const localDay = medico.local.day;
                    const localDayParts = localDay.split(' ');
                    const ocorrencia = localDayParts[0];
                    const diaSemana = localDayParts[1];
                    const hora = localDayParts[3];

                    const diaSemanaIndex = diasSemana.findIndex(dia => dia.toLowerCase() === diaSemana.toLowerCase());
                    const dataLocal = new Date(anoAtual, mesAtual, 1);
                    while (dataLocal.getDay() !== diaSemanaIndex) {
                        dataLocal.setDate(dataLocal.getDate() + 1);
                    }

                    switch (ocorrencia) {
                        case '1º':
                            proximoDiaLocal = new Date(dataLocal);
                            break;
                        case '2º':
                            proximoDiaLocal = new Date(dataLocal.setDate(dataLocal.getDate() + 7));
                            break;
                        case '3º':
                            proximoDiaLocal = new Date(dataLocal.setDate(dataLocal.getDate() + 14));
                            break;
                        case '4º':
                            proximoDiaLocal = new Date(dataLocal.setDate(dataLocal.getDate() + 21));
                            break;
                        case '5º':
                            proximoDiaLocal = new Date(dataLocal.setDate(dataLocal.getDate() + 28));
                            break;
                        default:
                            proximoDiaLocal = '';
                            break;
                    }

                    if (proximoDiaLocal !== '') {
                        const diaLocal = proximoDiaLocal.getDate();
                        const mesLocal = proximoDiaLocal.getMonth() + 1;
                        const anoLocal = proximoDiaLocal.getFullYear();
                        medico.local.next = diaLocal + '/' + mesLocal + '/' + anoLocal + ' ' + hora;
                    }
                }
            }

            function popularTabela() {
                const tableGem = $('#data_gem').DataTable();
                const tableLocal = $('#data_local').DataTable();

                tableGem.clear();
                tableLocal.clear();

                data.forEach(medico => {
                    calcularProximoDiaAtendimento(medico);
                    if (medico.hasOwnProperty('gem')) {
                        tableGem.row.add([medico.doctor, medico.gem.day, medico.gem.next]);
                    }
                    if (medico.hasOwnProperty('local')) {
                        tableLocal.row.add([medico.doctor, medico.local.day, medico.local.next]);
                    }
                });

                tableGem.draw();
                tableLocal.draw();
            }

            popularTabela();
        });