const rdcjEngine = (() => {
    const axes = [
        { key: 'economicValue', label: 'Valor Econômico', weight: .18 },
        { key: 'recoverability', label: 'Recuperabilidade', weight: .20 },
        { key: 'investigativePotential', label: 'Potencial Investigativo', weight: .14 },
        { key: 'proceduralOpportunity', label: 'Oportunidade Processual', weight: .16 },
        { key: 'prescriptionRisk', label: 'Risco Prescricional', weight: .22 },
        { key: 'operationalUrgency', label: 'Urgência Operacional', weight: .10 }
    ];

    const clamp = (value) => Math.max(0, Math.min(100, Number(value) || 0));
    const scoreFromAxes = (axisValues) => Math.round(axes.reduce((total, axis) => total + (clamp(axisValues[axis.key]) * axis.weight), 0));

    const classify = (axisValues, rules = []) => {
        const score = scoreFromAxes(axisValues);
        const criticalEvent = rules.some((rule) => rule.criticalEvent);
        const criticalPrescription = clamp(axisValues.prescriptionRisk) >= 90;
        let level = 'N4';
        let action = 'Manter monitoramento mínimo e revisar na próxima janela.';
        let sla = 'Revisão em até 90 dias';

        if (criticalEvent || criticalPrescription) {
            level = 'N1';
            action = 'Atuar imediatamente: validar providência, responsável e evidência.';
            sla = 'Atuação em até 24 horas';
        } else if (clamp(axisValues.recoverability) >= 60 && (clamp(axisValues.operationalUrgency) >= 60 || clamp(axisValues.proceduralOpportunity) >= 70)) {
            level = 'N2';
            action = 'Executar ação recomendada e confirmar retorno da diligência.';
            sla = 'Atuação em até 5 dias úteis';
        } else if (score >= 40) {
            level = 'N3';
            action = 'Monitorar ativamente os próximos eventos e revisar a estratégia.';
            sla = 'Revisão em até 30 dias';
        }
        return { score, level, action, sla, criticalPrescription, criticalEvent };
    };

    const explanation = (decision, rules) => ({
        reasons: rules.map((rule) => rule.label),
        audit: `Motor RDCJ v3.0 · score ${decision.score} calculado em ${new Date().toLocaleDateString('pt-BR')}`
    });

    return { axes, clamp, scoreFromAxes, classify, explanation };
})();
