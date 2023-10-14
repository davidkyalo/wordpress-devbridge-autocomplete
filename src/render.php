<?php

/**
 * @var WP_Block $block
 * @var WP_Post $post
 * @var ?string $content
 * @var array $attributes
 */

$src =  'values';
$prefix = "wp-block-devbridge-autocomplete";


$attributes = [
    'id' => wp_unique_id("{$prefix}-"),
    'selector' => "input[name=\"s\"]",
    "lookup" => "ajax",
    "ajax" => [],
    "options" => [],
    ...$attributes,
];



$id =  $attributes['id'];


$selector = empty($attributes['selector']) ? "input[name=\"s\"]" : $attributes['selector'];
$container = "#{$id}.{$prefix}";

$options = $attributes['options'];

if ($attributes['lookup'] == 'ajax' && empty($options['serviceUrl'])) {
    $ajax = $attributes['ajax'];
    $ajaxurl = empty($ajax['url']) ? admin_url('admin-ajax.php') : $ajax['url'];
    $query = isset($ajax['params']) ? $ajax['params'] : "";
    $query .= isset($ajax['action']) ? "&action={$ajax['action']}" : "";
    $ajaxurl .= (strpos($ajaxurl, '?') === false ? '?' : '&') . ltrim($query, '&');
    $options['serviceUrl'] = $ajaxurl;
}


$html_attrs = [
    'id' => $id,
];

$json_options = json_encode((object) $options);

?>

<div <?= get_block_wrapper_attributes($html_attrs); ?>>
</div>

<script>
    (function($) {
        $(() => {

            const icons = {

            };

            const defaultIcon = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0v-6z"/>
                    </svg>`;

            let el = $('<?= $container; ?>').parent().find('<?= $selector; ?>');
            (el.length ? el : $('<?= $selector; ?>')).first().devbridgeAutocomplete({
                width: 'auto',
                dataType: 'json',
                orientation: 'auto',
                appendTo: '<?= $container; ?>',
                transformResult: (res, query) => {
                    return {
                        suggestions: res.map((s) => ({
                            value: query,
                            data: s
                        }))
                    };
                },
                formatResult: (result, query) => {
                    let data = result.data;
                    let title = data.title;
                    let start = title.toLowerCase().indexOf(query.toLowerCase());
                    (start > -1) || (start = title.length);
                    let end = start + query.length;
                    let before = title.slice(0, start);
                    let after = title.slice(end);
                    let strong = title.slice(start, end);
                    let icon = data.icon ?? icons[data.subtype ?? ''] ?? icons[data.type ?? ''] ?? defaultIcon;
                    return `
                        <${data.link ? `a href="${data.link}"` : 'div'} class="autocomplete-suggestion-wrap">
                            ${
                                icon ? `<div class="autocomplete-suggestion-icon">${icon}</div>` : ''
                            }
                            <div class="autocomplete-suggestion-content">
                                <div class="autocomplete-suggestion-title">
                                    ${before}<strong>${strong}</strong>${after}
                                </div>
                                ${
                                    data.label ? 
                                    `<div class="autocomplete-suggestion-label">
                                        ${data.label}
                                    </div>` : ''
                                }
                            </div>
                        </${data.link ? `a` : 'div'}>
                    `;
                },
                ...<?= $json_options; ?>
            });

        });

    })(jQuery);
</script>